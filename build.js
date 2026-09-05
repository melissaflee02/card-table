#!/usr/bin/env node
// Static site generator. Reads game data, renders templates, writes dist/.
// Deliberately dependency-free so it runs on any Node >= 16.

import { mkdir, rm, writeFile, readdir, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { GAMES, PLANNED } from './src/data/index.js';
import { ACTIVE, THEMES, themeCss } from './src/data/themes/index.js';
import { homePage } from './src/templates/home.js';
import { gamePage } from './src/templates/game.js';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

const REQUIRED = ['slug', 'name', 'tagline', 'players', 'time', 'difficulty', 'deck', 'objective', 'sections'];

// Fail loudly on a malformed game rather than shipping a page with holes in it.
function validate(game, index) {
  const where = `games[${index}] (${game.slug || game.name || 'unnamed'})`;
  for (const key of REQUIRED) {
    if (game[key] === undefined || game[key] === null) {
      throw new Error(`${where}: missing required field "${key}"`);
    }
  }
  if (!/^[a-z0-9-]+$/.test(game.slug)) throw new Error(`${where}: slug must be kebab-case`);
  if (!Array.isArray(game.sections) || game.sections.length === 0) {
    throw new Error(`${where}: needs at least one section`);
  }
  const ids = new Set();
  for (const s of game.sections) {
    if (!s.id || !s.title || !Array.isArray(s.body)) {
      throw new Error(`${where}: every section needs id, title and a body array`);
    }
    if (ids.has(s.id)) throw new Error(`${where}: duplicate section id "${s.id}"`);
    ids.add(s.id);
  }
  if (game.players.min > game.players.max) throw new Error(`${where}: players.min > players.max`);
  if (game.time.min > game.time.max) throw new Error(`${where}: time.min > time.max`);
  if (!['easy', 'medium'].includes(game.difficulty)) {
    throw new Error(`${where}: difficulty must be "easy" or "medium"`);
  }
  if (game.scoring && !['low', 'high'].includes(game.scoring.mode)) {
    throw new Error(`${where}: scoring.mode must be "low" or "high"`);
  }
  if (game.cardLibrary) {
    if (!game.cardLibrary.intro || !Array.isArray(game.cardLibrary.entries)) {
      throw new Error(`${where}: cardLibrary needs intro and entries[]`);
    }
    for (const e of game.cardLibrary.entries) {
      if (!e.rank || !e.name || !e.value || !e.effect) {
        throw new Error(`${where}: every cardLibrary entry needs rank, name, value and effect`);
      }
    }
  }
  if (game.drills) {
    const ids = new Set();
    for (const d of game.drills) {
      if (!d.id || !d.title || !d.prompt || !d.correctText || !d.wrongText) {
        throw new Error(`${where}: every drill needs id, title, prompt, correctText and wrongText`);
      }
      if (ids.has(d.id)) throw new Error(`${where}: duplicate drill id "${d.id}"`);
      ids.add(d.id);
      if (!Array.isArray(d.options) || d.options.length < 2) {
        throw new Error(`${where}: drill "${d.id}" needs at least two options`);
      }
      const correct = d.options.filter((o) => o.correct);
      if (correct.length !== 1) {
        throw new Error(`${where}: drill "${d.id}" needs exactly one correct option, found ${correct.length}`);
      }
      for (const o of d.options) {
        if (!Array.isArray(o.faces) || !o.faces.length) {
          throw new Error(`${where}: drill "${d.id}" has an option with no faces[]`);
        }
      }
    }
  }
  if (game.cheatSheet) {
    const cs = game.cheatSheet;
    if (!cs.setup || !Array.isArray(cs.turn) || !Array.isArray(cs.keyRules) || !cs.scoring) {
      throw new Error(`${where}: cheatSheet needs setup, turn[], keyRules[] and scoring`);
    }
  }
}

async function copyAssets() {
  // Recursive: src/assets now contains a fonts/ directory.
  const walk = async (from, to) => {
    await mkdir(to, { recursive: true });
    for (const entry of await readdir(from, { withFileTypes: true })) {
      const src = join(from, entry.name);
      const dst = join(to, entry.name);
      if (entry.isDirectory()) await walk(src, dst);
      else await copyFile(src, dst);
    }
  };
  await walk(join(root, 'src', 'assets'), join(dist, 'assets'));
}

async function build() {
  const slugs = new Set();
  GAMES.forEach((g, i) => {
    validate(g, i);
    if (slugs.has(g.slug)) throw new Error(`Duplicate slug: ${g.slug}`);
    slugs.add(g.slug);
  });

  await rm(dist, { recursive: true, force: true });
  await mkdir(join(dist, 'games'), { recursive: true });

  await writeFile(join(dist, 'index.html'), homePage(GAMES, PLANNED));

  for (const [i, game] of GAMES.entries()) {
    const prev = GAMES[i - 1] ?? GAMES[GAMES.length - 1];
    const next = GAMES[i + 1] ?? GAMES[0];
    const html = gamePage(game, {
      prev: GAMES.length > 1 ? prev : null,
      next: GAMES.length > 1 ? next : null,
    });
    if (html.includes('undefined')) {
      throw new Error(`${game.slug}: rendered HTML contains "undefined" — check the data file`);
    }
    await writeFile(join(dist, 'games', `${game.slug}.html`), html);
  }

  await copyAssets();

  // Throws with every failing contrast pair if the palette is inaccessible.
  await writeFile(join(dist, 'assets', 'theme.css'), themeCss(ACTIVE));

  console.log(`Theme: ${THEMES[ACTIVE].name} (${ACTIVE})`);
  console.log(`Built ${GAMES.length} game page${GAMES.length === 1 ? '' : 's'} + homepage into dist/`);
  for (const g of GAMES) console.log(`  games/${g.slug}.html  ${g.name}`);
}

build().catch((err) => {
  console.error(`\nBuild failed: ${err.message}\n`);
  process.exit(1);
});
