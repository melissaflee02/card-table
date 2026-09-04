import { contrastRatio } from '../../lib/contrast.js';
import defaultTheme from './default.js';
import slate from './slate.js';
import warm from './warm.js';
import radixLime from './radix-lime.js';
import inkBlue from './ink-blue.js';
import inkOrange from './ink-orange.js';
import inkMagenta from './ink-magenta.js';

export const THEMES = { default: defaultTheme, slate, warm, 'radix-lime': radixLime,
  'ink-blue': inkBlue, 'ink-orange': inkOrange, 'ink-magenta': inkMagenta };

// ---------------------------------------------------------------------------
// Change this one line to reskin the whole site, then `npm run build`.
// ---------------------------------------------------------------------------
export const ACTIVE = 'ink-blue';

// Card faces are deliberately near-white in both themes and the ink on them is
// fixed, because a playing card is white — inverting one in dark mode reads as
// a rendering bug. These must match diagram.js.
const CARD_INK = '#1b1a17';
const CARD_RED = '#b3231a';

const HEX_KEYS = [
  'bg', 'surface', 'surface2', 'border', 'borderStrong', 'text', 'textMuted',
  'inputBorder', 'accent', 'accentHover', 'accentSoft', 'accentOnSoft',
  'accentSolid', 'accentSolidHover', 'accentOnSolid', 'suitRed',
  'warningBg', 'warningBorder', 'cardFace', 'cardBorder', 'cardBack',
  'diagramArrow', 'diagramGood', 'diagramWarn', 'diagramGoodBg', 'diagramWarnBg',
];
const RAW_KEYS = ['shadowSm', 'shadowMd'];

// Every pair here is real text on a real background somewhere on the site.
// 4.5:1 is the WCAG AA threshold for body-size text.
const TEXT_PAIRS = [
  ['text', 'bg', 'body text on the page'],
  ['text', 'surface', 'text on a card or panel'],
  ['text', 'surface2', 'text on a diagram frame or table head'],
  ['textMuted', 'bg', 'muted text on the page'],
  ['textMuted', 'surface', 'muted text on a card'],
  ['textMuted', 'surface2', 'diagram labels, table headers'],
  ['accent', 'bg', 'links on the page'],
  ['accent', 'surface', 'links on a card'],
  ['accentOnSoft', 'accentSoft', 'hint numbers, tip label, tracker leader'],
  ['accentOnSoft', 'surface', 'the [EASY] tag on a game card'],
  ['accentOnSoft', 'surface2', 'hovered pager link, hovered game card, details markers'],
  ['text', 'accentSoft', 'objective box and score-tracker banner body text'],
  ['accentOnSolid', 'accentSolid', 'button text, cheat-sheet header, brand mark'],
  ['suitRed', 'warningBg', 'the "watch out" callout label'],
  ['text', 'warningBg', 'warning callout body'],
  ['diagramGood', 'surface2', 'diagram "0 points" / verdict text'],
  ['diagramWarn', 'surface2', 'diagram deadwood / "no" text'],
  ['text', 'diagramGoodBg', 'text in a green diagram box'],
  ['text', 'diagramWarnBg', 'text in an amber diagram box'],
];

// Graphical objects, not text. WCAG SC 1.4.11 sets the bar at 3:1 for these,
// and holding them to the 4.5:1 text threshold fails palettes that are fine.
const GRAPHIC_MIN = 3;
const GRAPHIC_PAIRS = [
  ['diagramArrow', 'surface2', 'diagram arrows and leader lines'],
  ['inputBorder', 'surface', 'search and score-tracker input borders'],
  ['inputBorder', 'bg', 'input borders against the page'],
];

// Deliberately NOT checked, and why:
//
// cardBorder / cardBack against surface2 sit at roughly 1.1:1, so a card's
// outline really is the only thing separating it from the diagram frame. That
// looks like a 1.4.11 failure until you ask what the graphic has to convey:
// which card, and in what group. Rank and suit glyphs carry that at 17:1
// (black) and 6.6:1 (red), and grouping is carried by layout. The outline is
// framing, not information. Forcing it to 3:1 means mid-grey borders on white
// cards, which no real playing card has.
//
// borderStrong is a subtle emphasis border (hover states, the example rule,
// the empty-state dash). Form controls use inputBorder instead, which IS
// checked, because identifying an input is squarely in scope for 1.4.11.

/** Throws with every failing pair listed, rather than only the first. */
export function validateTheme(key) {
  const theme = THEMES[key];
  if (!theme) {
    throw new Error(`Unknown theme "${key}". Available: ${Object.keys(THEMES).join(', ')}`);
  }

  const problems = [];
  for (const mode of ['light', 'dark']) {
    const p = theme[mode];
    if (!p) { problems.push(`${mode}: missing entirely`); continue; }

    for (const k of [...HEX_KEYS, ...RAW_KEYS]) {
      if (p[k] === undefined) problems.push(`${mode}.${k}: missing`);
    }
    for (const k of HEX_KEYS) {
      if (p[k] === undefined) continue;
      try { contrastRatio(p[k], '#ffffff'); }
      catch { problems.push(`${mode}.${k}: "${p[k]}" is not a hex colour`); }
    }
    if (problems.length) continue;

    for (const [fg, bg, where] of TEXT_PAIRS) {
      const r = contrastRatio(p[fg], p[bg]);
      if (r < 4.5) problems.push(`${mode}: ${fg} on ${bg} is ${r}:1 (need 4.5) — ${where}`);
    }
    for (const [fg, bg, where] of GRAPHIC_PAIRS) {
      const r = contrastRatio(p[fg], p[bg]);
      if (r < GRAPHIC_MIN) {
        problems.push(`${mode}: ${fg} on ${bg} is ${r}:1 (need ${GRAPHIC_MIN}) — ${where}`);
      }
    }
    // Card faces carry fixed ink, so a dark cardFace would break every diagram.
    for (const [ink, label] of [[CARD_INK, 'black pips'], [CARD_RED, 'red pips']]) {
      const r = contrastRatio(ink, p.cardFace);
      if (r < 4.5) problems.push(`${mode}: ${label} on cardFace is ${r}:1 (need 4.5) — cardFace must stay light`);
    }
  }

  if (problems.length) {
    throw new Error(
      `Theme "${key}" (${theme.name}) fails accessibility checks:\n` +
        problems.map((p) => `    - ${p}`).join('\n')
    );
  }
  return theme;
}

// surface2 -> --surface-2, not --surface2: the digit needs a hyphen too, or
// the emitted token silently fails to match what the stylesheet asks for.
const kebab = (k) => '--' + k.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();

function tokens(palette, indent) {
  const lines = [...HEX_KEYS, ...RAW_KEYS].map(
    (k) => `${indent}${kebab(k)}: ${palette[k]};`
  );
  // Aliases and derived values, so palettes only ever list real colours.
  lines.push(`${indent}--diagram-ink: var(--text);`);
  lines.push(`${indent}--diagram-muted: var(--text-muted);`);
  lines.push(`${indent}--card-back-line: rgb(255 255 255 / 28%);`);
  return lines.join('\n');
}

/**
 * Emits the three theme blocks. The dark palette appears twice in the output —
 * once for the manual toggle, once for the system preference — but it is
 * authored once here, so the two can never drift apart.
 *
 * Generated rather than using CSS light-dark() so the stylesheet still works
 * in browsers that predate it; people open this site on old tablets.
 */
export function themeCss(key) {
  const theme = validateTheme(key);
  return `/* Generated by build.js from src/data/themes/${key}.js — do not edit.
   ${theme.name}: ${theme.description}
   Change the palette in that file, or switch themes via ACTIVE in
   src/data/themes/index.js, then run \`npm run build\`. */

:root {
${tokens(theme.light, '  ')}
}

:root[data-theme="dark"] {
${tokens(theme.dark, '  ')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${tokens(theme.dark, '    ')}
  }
}
`;
}
