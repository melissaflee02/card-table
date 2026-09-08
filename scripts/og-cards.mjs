// Generates one 1200x630 Open Graph card per game, plus the site-wide card.
//
// Why per-game: this site spreads by someone pasting a link into a group chat
// to settle an argument. A single shared preview means every one of those looks
// identical, so the link says nothing about which game is being argued about.
//
// Run with `npm run og` after changing a name, tagline or the palette. Output is
// committed, because the build must not depend on a local Chrome install.
//
// Layout is deliberately hand-tuned rather than responsive: 1200x630 is the only
// size this ever renders at, and social crawlers screenshot it as-is.

import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import { GAMES } from '../src/data/index.js';
import { THEMES, ACTIVE } from '../src/data/themes/index.js';
import { deckLabel } from '../src/templates/components.js';
import { playerLabel, timeLabel } from '../src/templates/game.js';

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src', 'assets', 'og');
const tmpDir = join(root, '.og-tmp');

const CHROME = process.env.CHROME_PATH
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const t = THEMES[ACTIVE].light;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const isRed = (suit) => suit === '♥' || suit === '♦';

// Three cards fanned out, echoing the hero. The centre card carries the game's
// own suit so Hearts and Spades do not arrive looking like the same link.
function fan(suit) {
  const faces = [
    { rank: 'A', suit: '♣', rot: -14, x: 0, y: 26 },
    { rank: 'Q', suit, rot: -3, x: 96, y: 0 },
    { rank: '7', suit: '♠', rot: 9, x: 196, y: 14 },
  ];
  return faces.map(({ rank, suit: s, rot, x, y }) => `
    <div class="card" style="transform:rotate(${rot}deg);left:${x}px;top:${y}px">
      <span class="rank ${isRed(s) ? 'red' : ''}">${rank}<i>${s}</i></span>
      <span class="pip ${isRed(s) ? 'red' : ''}">${s}</span>
    </div>`).join('');
}

function page({ eyebrow, title, sub, meta, suit, titleSize }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Plus Jakarta Sans";
  src:url("file://${root}/src/assets/fonts/plus-jakarta-sans-latin.woff2") format("woff2");
  font-weight:400 800;font-display:block}
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px}
body{background:${t.bg};color:${t.text};
  font-family:"Plus Jakarta Sans",-apple-system,sans-serif;
  display:flex;align-items:center;padding:0 76px;overflow:hidden}
.copy{width:660px;flex:none}
.brand{display:flex;align-items:center;gap:14px;margin-bottom:44px}
.mark{width:44px;height:58px;background:${t.cardFace};border:1px solid ${t.cardBorder};
  border-radius:8px;display:grid;place-items:center;font-size:24px;color:${t.cardInk};
  box-shadow:0 2px 6px rgba(24,54,45,.12)}
.brandname{font-size:28px;font-weight:800;letter-spacing:-.02em}
.eyebrow{font-size:19px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;
  color:${t.accent};margin-bottom:18px}
h1{font-size:${titleSize}px;font-weight:800;line-height:1.02;letter-spacing:-.035em;margin-bottom:20px}
.sub{font-size:25px;line-height:1.4;color:${t.textMuted};margin-bottom:26px}
.meta{font-size:20px;font-weight:600;color:${t.text};opacity:.75}
.fan{position:relative;flex:1;height:400px}
.card{position:absolute;width:190px;height:266px;background:${t.cardFace};
  border:1px solid ${t.cardBorder};border-radius:16px;
  box-shadow:0 18px 40px rgba(24,54,45,.18);
  display:flex;flex-direction:column;justify-content:space-between;padding:16px 18px}
.rank{font-size:34px;font-weight:800;line-height:1;color:${t.cardInk};display:flex;
  flex-direction:column;align-items:flex-start}
.rank i{font-style:normal;font-size:26px;margin-top:2px}
.pip{font-size:96px;line-height:1;color:${t.cardInk};align-self:center;margin-bottom:14px}
.red{color:${t.cardInkRed}}
</style></head><body>
  <div class="copy">
    <div class="brand"><div class="mark">♠</div><div class="brandname">Card Table</div></div>
    <div class="eyebrow">${esc(eyebrow)}</div>
    <h1>${esc(title)}</h1>
    <div class="sub">${esc(sub)}</div>
    ${meta ? `<div class="meta">${esc(meta)}</div>` : ''}
  </div>
  <div class="fan">${fan(suit)}</div>
</body></html>`;
}

// Long game names need to drop a size or they wrap into the card fan.
const titleSizeFor = (name) => (name.length > 12 ? 66 : name.length > 8 ? 76 : 86);

async function shoot(html, out) {
  const src = join(tmpDir, 'card.html');
  await writeFile(src, html);
  await run(CHROME, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    `--screenshot=${out}`,
    `file://${src}`,
  ]);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await mkdir(tmpDir, { recursive: true });

  await shoot(page({
    eyebrow: 'Pick a game. Learn it fast.',
    title: 'Rules on the table in two minutes.',
    sub: 'Setup, scoring, house rules and printable cheat sheets for classic card games.',
    meta: `${GAMES.length} games · No sign-ups · Free`,
    suit: '♥',
    titleSize: 64,
  }), join(root, 'src', 'assets', 'og-card.png'));
  console.log('  og-card.png (site default)');

  for (const g of GAMES) {
    await shoot(page({
      eyebrow: 'How to play',
      title: g.name,
      sub: g.tagline,
      meta: `${playerLabel(g.players)} · ${timeLabel(g.time)} · ${deckLabel(g)}`,
      suit: g.suit,
      titleSize: titleSizeFor(g.name),
    }), join(outDir, `${g.slug}.png`));
    console.log(`  og/${g.slug}.png`);
  }

  await rm(tmpDir, { recursive: true, force: true });
  console.log(`\nWrote ${GAMES.length} game cards to src/assets/og/ plus the site default.`);
}

main().catch((e) => {
  console.error(`\nOG generation failed: ${e.message}\n`);
  process.exit(1);
});
