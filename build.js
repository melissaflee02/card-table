#!/usr/bin/env node
// Static site generator. Reads game data, renders templates, writes dist/.
// Deliberately dependency-free so it runs on any Node >= 16.

import { mkdir, rm, writeFile, readFile, readdir, copyFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { GAMES, PLANNED } from './src/data/index.js';
import { ACTIVE, THEMES, themeCss } from './src/data/themes/index.js';
import { SITE, layout } from './src/templates/layout.js';
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
  // `best` restates a count, so on a fixed-count game it renders as the useless
  // "4 players (best with 4)". Such games want `note` ("two partnerships").
  if (game.players.best && game.players.min === game.players.max) {
    throw new Error(`${where}: players.best on a fixed ${game.players.min}-player game — use players.note instead`);
  }
  if (game.players.best && game.players.note) {
    throw new Error(`${where}: players has both best and note — pick one`);
  }
  if (game.time.min > game.time.max) throw new Error(`${where}: time.min > time.max`);
  // A rules site lives on trust; a citation that 404s or points nowhere is worse
  // than none, so the shape is enforced even though the URLs are checked by hand.
  if (game.sources) {
    if (!Array.isArray(game.sources) || !game.sources.length) {
      throw new Error(`${where}: sources must be a non-empty array`);
    }
    for (const s of game.sources) {
      if (!s.name || !/^https:\/\//.test(s.url || '')) {
        throw new Error(`${where}: every source needs a name and an https url`);
      }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(game.reviewed || '')) {
      throw new Error(`${where}: sources require a reviewed date as YYYY-MM-DD`);
    }
  }
  if (!['easy', 'medium'].includes(game.difficulty)) {
    throw new Error(`${where}: difficulty must be "easy" or "medium"`);
  }
  if (game.scoring && !['low', 'high'].includes(game.scoring.mode)) {
    throw new Error(`${where}: scoring.mode must be "low" or "high"`);
  }
  if (!['standard', 'own'].includes(game.deck)) {
    throw new Error(`${where}: deck must be "standard" or "own", got "${game.deck}"`);
  }
  if (game.extras !== undefined && (!Array.isArray(game.extras) || !game.extras.length)) {
    throw new Error(`${where}: extras must be a non-empty array when present`);
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

/**
 * Google cuts meta descriptions around 160 characters. The homepage one lists
 * every game name, so it grows each time a game is added — this turns that into
 * a build failure instead of a snippet that silently trails off mid-sentence.
 */
const META_MAX = 160;
function checkMeta(html, where) {
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  if (!m) throw new Error(`${where}: no meta description`);
  const text = m[1]
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  if (text.length > META_MAX) {
    throw new Error(
      `${where}: meta description is ${text.length} chars, over the ${META_MAX} Google shows.\n  ${text}`
    );
  }
  return html;
}

/**
 * Cheap markup lint over the emitted HTML. Both of these shipped once and were
 * only caught by an external validator, so they are checked on every build.
 */
function checkMarkup(html, where) {
  // SVG presentation attributes take 100-900 in hundreds. font-weight="650" is
  // valid CSS but invalid as an attribute, and the diagrams are hand-written.
  for (const m of html.matchAll(/font-weight="(\d+)"/g)) {
    const w = Number(m[1]);
    if (w % 100 !== 0 || w < 100 || w > 900) {
      throw new Error(
        `${where}: font-weight="${m[1]}" is not valid as an SVG attribute — use a multiple of 100`
      );
    }
  }
  // aria-label only names elements whose role supports naming. On a bare span or
  // div it is dropped by screen readers, so the label silently does nothing.
  const generic = /<(span|div)\b(?![^>]*\brole=)[^>]*\saria-label=/g;
  const hit = generic.exec(html);
  if (hit) {
    throw new Error(
      `${where}: aria-label on a <${hit[1]}> with no role — it names nothing.\n` +
      `  Use aria-hidden on the glyph plus a .sr-only span, or give it a role.`
    );
  }
  return html;
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

/**
 * Content-hash the CSS and JS, then rewrite the HTML to match.
 *
 * GitHub Pages serves assets with `cache-control: max-age=600` and offers no
 * way to change that. Without hashed names, for ten minutes after every deploy
 * a returning visitor gets new HTML with a stale stylesheet — which renders
 * worse than either version alone. A hash in the filename makes every build a
 * distinct URL, so there is no stale window.
 *
 * Fonts and images are deliberately left unhashed: fonts are referenced from
 * inside the CSS by relative path, and the icons and OG card are fetched by
 * external link-preview services that should keep hitting a stable URL.
 */
async function fingerprintAssets() {
  const hashable = ['styles.css', 'theme.css', 'print.css', 'theme.js', 'page.js',
    'filter.js', 'scorer.js', 'drills.js', 'cardlib.js', 'progress.js'];
  const dir = join(dist, 'assets');
  const present = new Set(await readdir(dir));
  const map = new Map();

  for (const name of hashable) {
    if (!present.has(name)) continue;
    const body = await readFile(join(dir, name));
    const hash = createHash('sha256').update(body).digest('hex').slice(0, 8);
    const dot = name.lastIndexOf('.');
    const hashed = `${name.slice(0, dot)}.${hash}${name.slice(dot)}`;
    await rename(join(dir, name), join(dir, hashed));
    map.set(name, hashed);
  }

  const pages = ['index.html', '404.html',
    ...(await readdir(join(dist, 'games'))).map((f) => join('games', f))];
  for (const page of pages) {
    const file = join(dist, page);
    let html = await readFile(file, 'utf8');
    for (const [from, to] of map) html = html.split(`assets/${from}`).join(`assets/${to}`);
    await writeFile(file, html);
  }
  return map;
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

  await writeFile(join(dist, 'index.html'), checkMarkup(checkMeta(homePage(GAMES, PLANNED), 'index.html'), 'index.html'));

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
    await writeFile(join(dist, 'games', `${game.slug}.html`), checkMarkup(checkMeta(html, `games/${game.slug}.html`), `games/${game.slug}.html`));
  }

  // --- Crawler files -------------------------------------------------------
  // Generated from GAMES so a new game is discoverable without a manual edit.
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE.origin}/`, priority: '1.0' },
    ...GAMES.map((g) => ({ loc: `${SITE.origin}/games/${g.slug}.html`, priority: '0.8' })),
  ];
  await writeFile(join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    ).join('\n') + `\n</urlset>\n`);

  await writeFile(join(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`);

  // GitHub Pages serves 404.html for unknown paths.
  await writeFile(join(dist, '404.html'), layout({
    title: 'Page not found',
    description: 'That page does not exist. Browse all the card games instead.',
    path: '404.html',
    // GitHub Pages serves this file for unknown paths with a 404 status, but the
    // literal /404.html URL is a real file and answers 200 — so without this it
    // can be crawled and indexed as an ordinary page.
    noindex: true,
    base: `${SITE.origin}/`,
    bodyClass: 'page-home',
    body: `<div class="wrap"><section class="hero"><div class="hero__copy">
      <p class="hero__eyebrow">404</p>
      <h1>That page isn’t here.</h1>
      <p class="hero__sub">The rules you were after may have moved. Everything is one click away.</p>
      <p><a class="btn btn--primary" href="${SITE.origin}/">Browse all games</a></p>
    </div></section></div>`,
  }));

  await copyAssets();

  // Throws with every failing contrast pair if the palette is inaccessible.
  await writeFile(join(dist, 'assets', 'theme.css'), themeCss(ACTIVE));

  const fingerprinted = await fingerprintAssets();

  console.log(`Theme: ${THEMES[ACTIVE].name} (${ACTIVE})`);
  console.log(`Fingerprinted ${fingerprinted.size} assets`);
  console.log(`Built ${GAMES.length} game page${GAMES.length === 1 ? '' : 's'} + homepage into dist/`);
  for (const g of GAMES) console.log(`  games/${g.slug}.html  ${g.name}`);
}

build().catch((err) => {
  console.error(`\nBuild failed: ${err.message}\n`);
  process.exit(1);
});
