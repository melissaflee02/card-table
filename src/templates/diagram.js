// Inline SVG diagrams for the rules that text explains badly — card layouts,
// pass rotations, who-gives-what. Not one per section: only where a reader
// would otherwise have to build the picture in their head.
//
// Card faces stay light in both themes (a playing card is white; inverting it
// in dark mode reads as a bug), so the ink colours are fixed rather than
// themed. Everything else uses the site's custom properties.

import { esc } from './escape.js';

const CARD_W = 46;
const CARD_H = 64;
const INK = '#1b1a17';
const RED = '#b3231a';

const isRed = (suit) => suit === '♥' || suit === '♦';

/** A face-up card. Corner index plus centre pip, so it stays readable when overlapped. */
function cardFace(x, y, rank, suit) {
  const ink = isRed(suit) ? RED : INK;
  return `
    <g>
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="5"
            fill="var(--card-face)" stroke="var(--card-border)" stroke-width="1"/>
      <text x="${x + 6}" y="${y + 17}" font-size="14" font-weight="700" fill="${ink}">${esc(rank)}</text>
      <text x="${x + 6}" y="${y + 29}" font-size="11" fill="${ink}">${esc(suit)}</text>
      <text x="${x + CARD_W - 9}" y="${y + CARD_H - 9}" font-size="20" fill="${ink}"
            text-anchor="middle">${esc(suit)}</text>
    </g>`;
}

/** A face-down card. `pid` is the per-diagram pattern id. */
function cardBack(x, y, pid) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="5"
            fill="var(--card-back)" stroke="var(--card-border)" stroke-width="1"/>
      <rect x="${x + 4}" y="${y + 4}" width="${CARD_W - 8}" height="${CARD_H - 8}" rx="3"
            fill="url(#${pid})"/>
    </g>`;
}

/** Parses "K♥" / "10♣" into a face-up card, or "?" into a face-down one. */
function card(x, y, spec, pid) {
  if (spec === '?') return cardBack(x, y, pid);
  const suit = spec.slice(-1);
  return cardFace(x, y, spec.slice(0, -1), suit);
}

const label = (x, y, text, opts = {}) => `
  <text x="${x}" y="${y}" font-size="${opts.size || 11}" font-weight="${opts.weight || 600}"
        fill="var(--diagram-ink)" text-anchor="${opts.anchor || 'middle'}"
        ${opts.spaced ? 'letter-spacing="0.06em"' : ''}>${esc(text)}</text>`;

const muted = (x, y, text, opts = {}) => `
  <text x="${x}" y="${y}" font-size="${opts.size || 10}" fill="var(--diagram-muted)"
        text-anchor="${opts.anchor || 'middle'}">${esc(text)}</text>`;

/** Coloured emphasis text, for verdicts like "beats it" / "no". */
const strong = (x, y, text, color, size = 11) => `
  <text x="${x}" y="${y}" font-size="${size}" font-weight="700" fill="${color}"
        text-anchor="middle">${esc(text)}</text>`;

/** Highlight ring, for the card that wins or the one that changes things. */
const ring = (x, y) => `
  <rect x="${x - 3.5}" y="${y - 3.5}" width="${CARD_W + 7}" height="${CARD_H + 7}" rx="7"
        fill="none" stroke="var(--diagram-good)" stroke-width="2"/>`;

/** An empty card slot — used to show a pile that has been removed. */
const ghost = (x, y) => `
  <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="5"
        fill="none" stroke="var(--diagram-muted)" stroke-width="1.25" stroke-dasharray="4 3"/>`;

function defs(pid, aid) {
  return `
  <defs>
    <pattern id="${pid}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="8" height="8" fill="var(--card-back)"/>
      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--card-back-line)" stroke-width="2.5"/>
    </pattern>
    <marker id="${aid}" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--diagram-arrow)"/>
    </marker>
  </defs>`;
}

const arrow = (x1, y1, x2, y2, aid, dashed = false) => `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--diagram-arrow)"
        stroke-width="1.75" marker-end="url(#${aid})"
        ${dashed ? 'stroke-dasharray="4 3"' : ''}/>`;

/**
 * Wraps a diagram body in an accessible, responsive SVG.
 *
 * `pad` adds horizontal breathing room. Builders size themselves from card
 * geometry, but the widest element is often a centred caption whose real
 * width depends on font rendering — without slack those clip on some
 * platforms and not others.
 */
function svg({ id, w, h, title, desc, body, pad = 12 }) {
  const width = w + pad * 2;
  return `<svg viewBox="0 0 ${width} ${h}" width="${width}" height="${h}" role="img"
       aria-labelledby="${id}-t" aria-describedby="${id}-d"
       xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <title id="${id}-t">${esc(title)}</title>
  <desc id="${id}-d">${esc(desc)}</desc>
  <g transform="translate(${pad} 0)">
  ${body}
  </g>
</svg>`;
}

// ---------------------------------------------------------------------------
// Diagrams
// ---------------------------------------------------------------------------

const BUILDERS = {
  /** Cambio: the 2x2 grid and the single peek at your two nearest cards. */
  'cambio-peek': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const panelW = 136;
    const gap = 60;
    const gridW = CARD_W * 2 + 8;
    const gridX = (panelW - gridW) / 2;
    const gridY = 30;
    const rowY = [gridY, gridY + CARD_H + 8];
    const bottom = rowY[1] + CARD_H;

    const panel = (ox, title, bottomSpecs) => `
      <g transform="translate(${ox} 0)">
        ${label(panelW / 2, 16, title)}
        ${card(gridX, rowY[0], '?', pid)}
        ${card(gridX + CARD_W + 8, rowY[0], '?', pid)}
        ${card(gridX, rowY[1], bottomSpecs[0], pid)}
        ${card(gridX + CARD_W + 8, rowY[1], bottomSpecs[1], pid)}
        <path d="M ${gridX} ${bottom + 9} L ${gridX} ${bottom + 14} L ${gridX + gridW} ${bottom + 14} L ${gridX + gridW} ${bottom + 9}"
              fill="none" stroke="var(--diagram-muted)" stroke-width="1"/>
        ${muted(panelW / 2, bottom + 28, 'closest to you')}
      </g>`;

    const w = panelW * 2 + gap;
    const h = bottom + 40;
    return svg({
      id,
      w,
      h,
      title: 'Cambio setup and the one peek',
      desc:
        'Four cards are dealt face down in a two-by-two grid. At the start of the round you look once at the two cards nearest you, then turn them face down again and play from memory.',
      body: `
        ${defs(pid, aid)}
        ${panel(0, '1. Peek once', ['K♥', '8♠'])}
        ${arrow(panelW + 14, gridY + CARD_H, panelW + gap - 14, gridY + CARD_H, aid)}
        ${muted(panelW + gap / 2, gridY + CARD_H - 12, 'then')}
        ${panel(panelW + gap, '2. Face down again', ['?', '?'])}`,
    });
  },

  /** Palace: the three-layer table plus hand, and the order you play them in. */
  'palace-layers': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const OFF_X = 8;
    const OFF_Y = 13;
    const stackW = CARD_W + OFF_X;
    const stackH = CARD_H + OFF_Y;
    const stackGap = 16;
    const handOverlap = 26;
    const top = 30;

    // Each group gets a column at least as wide as its longest caption, not
    // just as wide as its cards, so centred text cannot spill into its
    // neighbour or off the edge.
    const tableCards = stackW * 3 + stackGap * 2;
    const handCards = CARD_W + handOverlap * 2;
    const colTable = Math.max(tableCards, 180);
    const colHand = Math.max(handCards, 148);
    const groupGap = 40;

    const stacks = [0, 1, 2]
      .map((i) => {
        const x = (colTable - tableCards) / 2 + i * (stackW + stackGap);
        return `${cardBack(x, top, pid)}${cardFace(x + OFF_X, top + OFF_Y, ['9', 'Q', '4'][i], ['♠', '♦', '♣'][i])}`;
      })
      .join('');

    const hand = [0, 1, 2]
      .map((i) => card((colHand - handCards) / 2 + i * handOverlap, top + 6, ['2♥', '7♣', 'A♠'][i], pid))
      .join('');

    const w = colTable + groupGap + colHand;
    const h = top + stackH + 40;
    return svg({
      id,
      w,
      h,
      title: 'Palace: your nine cards',
      desc:
        'Each player gets three cards face down in a row, three cards face up covering them, and three cards in hand. You play your hand first, then the face-up cards, then the face-down cards one blind flip at a time.',
      body: `
        ${defs(pid, aid)}
        ${label(colTable / 2, 16, 'On the table — 6 cards')}
        ${stacks}
        ${muted(colTable / 2, top + stackH + 22, '3 face down, 3 face up on top')}
        <g transform="translate(${colTable + groupGap} 0)">
          ${label(colHand / 2, 16, 'In your hand')}
          ${hand}
          ${muted(colHand / 2, top + stackH + 22, 'refill to three')}
        </g>`,
    });
  },

  /** Gin Rummy: what counts as a meld. */
  'gin-melds': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const step = CARD_W + 6;
    const groupW = step * 2 + CARD_W;
    const gap = 48;
    const top = 30;

    const group = (ox, title, specs, note) => `
      <g transform="translate(${ox} 0)">
        ${label(groupW / 2, 16, title)}
        ${specs.map((s, i) => card(i * step, top, s, pid)).join('')}
        ${muted(groupW / 2, top + CARD_H + 20, note)}
      </g>`;

    const w = groupW * 2 + gap;
    const h = top + CARD_H + 34;
    return svg({
      id,
      w,
      h,
      title: 'Gin Rummy melds: sets and runs',
      desc:
        'A set is three or four cards of the same rank in any suits. A run is three or more consecutive cards all in one suit. Those are the only two combinations that count.',
      body: `
        ${defs(pid, aid)}
        ${group(0, 'Set — same rank', ['7♠', '7♥', '7♦'], '3 or 4, any suits')}
        ${group(groupW + gap, 'Run — same suit', ['4♣', '5♣', '6♣'], '3 or more, in order')}`,
    });
  },

  /** Gin Rummy: melds versus deadwood, and the 10-point knock threshold. */
  'gin-knock': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const OV = 25;
    const top = 32;
    const gap = 26;
    const gw = (n) => CARD_W + OV * (n - 1);
    const g1 = gw(3);
    const g2 = gw(3);
    const g3 = gw(4);

    const group = (ox, title, specs, note, noteColor) => `
      <g transform="translate(${ox} 0)">
        ${label(gw(specs.length) / 2, 16, title)}
        ${specs.map((s, i) => card(i * OV, top, s, pid)).join('')}
        <text x="${gw(specs.length) / 2}" y="${top + CARD_H + 20}" font-size="10"
              fill="${noteColor}" text-anchor="middle">${esc(note)}</text>
      </g>`;

    const w = g1 + gap + g2 + gap + g3;
    const h = top + CARD_H + 48;
    return svg({
      id,
      w,
      h,
      title: 'Gin Rummy: deadwood and knocking',
      desc:
        'A ten-card hand holding a run of clubs and a set of nines, leaving four unmatched cards worth one, two, three and four points. That is ten points of deadwood, which is exactly the most you may knock with.',
      body: `
        ${defs(pid, aid)}
        ${group(0, 'Run', ['4♣', '5♣', '6♣'], '0 points', 'var(--diagram-good)')}
        ${group(g1 + gap, 'Set', ['9♥', '9♠', '9♦'], '0 points', 'var(--diagram-good)')}
        ${group(g1 + gap + g2 + gap, 'Deadwood', ['A♠', '2♦', '3♥', '4♦'], '1+2+3+4 = 10 points', 'var(--diagram-warn)')}
        ${muted(w / 2, h - 8, '10 or less — you may knock', { size: 11 })}`,
    });
  },

  /** Hearts: the four-hand pass rotation. */
  'hearts-passing': (id) => {
    const aid = `${id}-arw`;
    const P = 92;
    const gap = 22;
    const R = 10;
    const seats = { n: [P / 2, 20], e: [P - 18, P / 2], s: [P / 2, P - 20], w: [18, P / 2] };
    const top = 22;

    // Shorten each arrow so its head stops short of the destination seat.
    const between = (a, b) => {
      const [x1, y1] = seats[a];
      const [x2, y2] = seats[b];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      const t = (R + 5) / len;
      return arrow(x1 + dx * t, y1 + dy * t, x2 - dx * t, y2 - dy * t, aid);
    };

    const panel = (i, title, arrows) => `
      <g transform="translate(${i * (P + gap)} 0)">
        ${label(P / 2, 12, title, { size: 10.5 })}
        <g transform="translate(0 ${top})">
          ${Object.entries(seats)
            .map(
              ([k, [x, y]]) => `
            <circle cx="${x}" cy="${y}" r="${R}" fill="var(--card-face)"
                    stroke="var(--card-border)" stroke-width="1"/>
            <text x="${x}" y="${y + 3.5}" font-size="9" font-weight="700" fill="${INK}"
                  text-anchor="middle">${k.toUpperCase()}</text>`
            )
            .join('')}
          ${arrows}
        </g>
      </g>`;

    const cw = ['n', 'e', 's', 'w'].map((k, i, a) => between(k, a[(i + 1) % 4])).join('');
    const ccw = ['n', 'w', 's', 'e'].map((k, i, a) => between(k, a[(i + 1) % 4])).join('');
    const across = between('n', 's') + between('s', 'n') + between('e', 'w') + between('w', 'e');
    const hold = `${muted(P / 2, P / 2 + 4, 'keep', { size: 10 })}`;

    const w = P * 4 + gap * 3;
    const h = top + P + 6;
    return svg({
      id,
      w,
      h,
      title: 'Hearts: the pass rotation',
      desc:
        'Over four hands the pass direction cycles: pass three cards to the left, then to the right, then to the player across from you, then a hand where nobody passes. Then it repeats.',
      body: `
        ${defs(`${id}-back`, aid)}
        ${panel(0, 'Hand 1 — left', cw)}
        ${panel(1, 'Hand 2 — right', ccw)}
        ${panel(2, 'Hand 3 — across', across)}
        ${panel(3, 'Hand 4 — hold', hold)}`,
    });
  },

  /** President: the two card exchanges, and their asymmetry. */
  'president-exchange': (id) => {
    const aid = `${id}-arw`;
    // Narrower panels and no dead space up top: at 218 wide this needed 160px
    // of horizontal scrolling on a phone, and nothing sits above the boxes.
    const P = 170;
    const gap = 30;
    const boxH = 32;
    const topY = 8;
    const botY = 126;

    const box = (y, text, tone) => `
      <rect x="0" y="${y}" width="${P}" height="${boxH}" rx="7"
            fill="${tone}" stroke="var(--card-border)" stroke-width="1"/>
      <text x="${P / 2}" y="${y + 21}" font-size="12.5" font-weight="650"
            fill="var(--diagram-ink)" text-anchor="middle">${esc(text)}</text>`;

    const panel = (ox, high, low, give, back) => `
      <g transform="translate(${ox} 0)">
        ${box(topY, high, 'var(--diagram-good-bg)')}
        ${box(botY, low, 'var(--diagram-warn-bg)')}
        ${arrow(40, botY - 8, 40, topY + boxH + 8, aid)}
        <text x="50" y="${(topY + boxH + botY) / 2 - 8}" font-size="10.5" font-weight="650"
              fill="var(--diagram-ink)">${esc(give)}</text>
        <text x="50" y="${(topY + boxH + botY) / 2 + 5}" font-size="9.5"
              fill="var(--diagram-muted)">forced</text>
        ${arrow(P - 40, topY + boxH + 8, P - 40, botY - 8, aid, true)}
        <text x="${P - 50}" y="${(topY + boxH + botY) / 2 + 24}" font-size="10.5" font-weight="650"
              fill="var(--diagram-ink)" text-anchor="end">${esc(back)}</text>
        <text x="${P - 50}" y="${(topY + boxH + botY) / 2 + 37}" font-size="9.5"
              fill="var(--diagram-muted)" text-anchor="end">their choice</text>
      </g>`;

    const w = P * 2 + gap;
    const h = botY + boxH + 12;
    return svg({
      id,
      w,
      h,
      title: 'President: the card exchange',
      desc:
        'Before each hand after the first, the Scum hands their two best cards up to the President and receives any two cards back. The Vice Scum and Vice President trade one card the same way. The loser has no choice about what they give; the winner does.',
      body: `
        ${defs(`${id}-back`, aid)}
        ${panel(0, 'President', 'Scum', '2 best cards', 'any 2 back')}
        ${panel(P + gap, 'Vice President', 'Vice Scum', '1 best card', 'any 1 back')}`,
    });
  },

  /**
   * Hearts: how a trick is won. The single hardest idea for anyone who has
   * never played a trick-taking game — that a higher card of the wrong suit
   * loses to a lower card of the led suit.
   */
  'hearts-trick': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const step = CARD_W + 16;
    const rowW = step * 3 + CARD_W;
    const col = Math.max(rowW, 264);
    const ox = (col - rowW) / 2;
    const top = 26;
    const plays = [
      { seat: 'N', spec: '7♣', tag: 'leads ♣' },
      { seat: 'E', spec: 'K♣', tag: 'takes it', win: true },
      { seat: 'S', spec: '2♣', tag: '' },
      { seat: 'W', spec: 'A♥', tag: 'no clubs left' },
    ];
    const h = top + CARD_H + 52;
    return svg({
      id,
      w: col,
      h,
      title: 'Hearts: how a trick is won',
      desc:
        'North leads the seven of clubs. East plays the king of clubs, South the two of clubs, and West, holding no clubs, discards the ace of hearts. East wins with the king because it is the highest club. The ace of hearts is a higher card but cannot win, since hearts were not led.',
      body: `
        ${defs(pid, aid)}
        ${plays
          .map((pl, i) => {
            const x = ox + i * step;
            return `
          ${muted(x + CARD_W / 2, 14, pl.seat, { size: 10.5 })}
          ${pl.win ? ring(x, top) : ''}
          ${card(x, top, pl.spec, pid)}
          ${
            pl.win
              ? strong(x + CARD_W / 2, top + CARD_H + 18, pl.tag, 'var(--diagram-good)', 10.5)
              : muted(x + CARD_W / 2, top + CARD_H + 18, pl.tag)
          }`;
          })
          .join('')}
        ${muted(col / 2, h - 10, 'led suit wins — no trump', { size: 10.5 })}`,
    });
  },

  /** President: you must match the number of cards, not just outrank them. */
  'president-beating': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const col = 86;
    const gap = 16;
    const top = 32;
    const groups = [
      { head: 'On the pile', tone: 'var(--diagram-ink)', specs: ['6♥', '6♠'], note: 'a pair of 6s' },
      { head: 'Beats it', tone: 'var(--diagram-good)', specs: ['7♣', '7♦'], note: 'higher pair' },
      { head: 'No', tone: 'var(--diagram-warn)', specs: ['K♠'], note: 'only one card' },
      { head: 'No', tone: 'var(--diagram-warn)', specs: ['4♣', '4♦'], note: 'pair is lower' },
    ];
    const OV = 26;
    const h = top + CARD_H + 34;
    return svg({
      id,
      w: col * 4 + gap * 3,
      h,
      title: 'President: matching the number of cards',
      desc:
        'A pair of sixes on the pile can be beaten by a pair of sevens, but not by a single king however high it is, and not by a lower pair. You must play the same number of cards at a higher rank.',
      body: `
        ${defs(pid, aid)}
        ${groups
          .map((g, i) => {
            const w = CARD_W + OV * (g.specs.length - 1);
            const x = i * (col + gap);
            return `<g transform="translate(${x} 0)">
          ${strong(col / 2, 16, g.head, g.tone)}
          ${g.specs.map((sp, j) => card((col - w) / 2 + j * OV, top, sp, pid)).join('')}
          ${muted(col / 2, top + CARD_H + 20, g.note)}
        </g>`;
          })
          .join('')}`,
    });
  },

  /** Gin Rummy: laying off, where their deadwood joins your melds. */
  'gin-layoff': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const step = CARD_W + 6;
    const runW = step * 2 + CARD_W;
    const gapArrow = 46;
    const top = 30;
    // Column sized for the "their deadwood" label, not for the single card —
    // centring a 76px label over a 46px card overhangs both edges.
    const colLeft = 84;
    const cardX = (colLeft - CARD_W) / 2;
    const runX = colLeft + gapArrow;
    const w = runX + runW;
    const h = top + CARD_H + 40;
    return svg({
      id,
      w,
      h,
      title: 'Gin Rummy: laying off after a knock',
      desc:
        'You knocked with a run of ten, jack and queen of clubs. Your opponent holds the nine of clubs as deadwood. They may lay it onto the low end of your run, so those nine points stop counting against them.',
      body: `
        ${defs(pid, aid)}
        ${muted(colLeft / 2, 14, 'their deadwood')}
        ${card(cardX, top, '9♣', pid)}
        ${arrow(colLeft + 10, top + CARD_H / 2, runX - 10, top + CARD_H / 2, aid)}
        ${muted(colLeft + gapArrow / 2, top + CARD_H / 2 - 10, 'lays off')}
        <g transform="translate(${runX} 0)">
          ${muted(runW / 2, 14, 'your run')}
          ${['10♣', 'J♣', 'Q♣'].map((sp, i) => card(i * step, top, sp, pid)).join('')}
        </g>
        ${muted(w / 2, h - 10, '9 points off their score', { size: 10.5 })}`,
    });
  },

  /** Cambio: sticking, and the cost of getting it wrong. */
  'cambio-sticking': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const col = 178;
    const gap = 32;
    const top = 30;
    const gapArrow = 34;
    const rowW = CARD_W * 2 + gapArrow;
    const ox = (col - rowW) / 2;

    const panel = (i, head, tone, yours, note, dashed) => `
      <g transform="translate(${i * (col + gap)} 0)">
        ${strong(col / 2, 16, head, tone)}
        ${card(ox, top, yours, pid)}
        ${arrow(ox + CARD_W + 8, top + CARD_H / 2, ox + CARD_W + gapArrow - 8, top + CARD_H / 2, aid, dashed)}
        ${card(ox + CARD_W + gapArrow, top, '8♦', pid)}
        ${muted(ox + CARD_W / 2, top + CARD_H + 18, 'your card')}
        ${muted(ox + CARD_W + gapArrow + CARD_W / 2, top + CARD_H + 18, 'discard pile')}
        ${muted(col / 2, top + CARD_H + 36, note, { size: 10.5 })}
      </g>`;

    const h = top + CARD_H + 48;
    return svg({
      id,
      w: col * 2 + gap,
      h,
      title: 'Cambio: sticking a card',
      desc:
        'If a card in your grid matches the rank on top of the discard pile you may slap it down at any moment, even out of turn, and it leaves your grid for good. Slap down a card that does not match and it stays put and you take a penalty card as well.',
      body: `
        ${defs(pid, aid)}
        ${panel(0, 'Right — 8 on 8', 'var(--diagram-good)', '8♣', 'gone for good', false)}
        ${panel(1, 'Wrong — 5 on 8', 'var(--diagram-warn)', '5♠', 'stays + penalty card', true)}`,
    });
  },

  /** Palace: burning the pile, including off other players' cards. */
  'palace-burn': (id) => {
    const pid = `${id}-back`;
    const aid = `${id}-arw`;
    const OV = 25;
    const pileW = CARD_W + OV * 3;
    const gapArrow = 46;
    const top = 30;
    const ghostX = pileW + gapArrow;
    const w = ghostX + CARD_W;
    const h = top + CARD_H + 46;
    return svg({
      id,
      w: Math.max(w, 286),
      h,
      title: 'Palace: burning the pile',
      desc:
        'Three players have each played a nine onto the pile in turn. You play the fourth nine, which completes four of a kind and removes the whole pile from the game, and then you play again. A ten does the same thing on its own.',
      body: `
        ${defs(pid, aid)}
        ${muted(OV * 3 / 2 - 6, 14, 'others', { size: 9.5 })}
        ${muted(OV * 3 + CARD_W / 2, 14, 'you', { size: 9.5 })}
        ${['9♠', '9♥', '9♦', '9♣']
          .map((sp, i) => {
            const x = i * OV;
            return `${i === 3 ? ring(x, top) : ''}${card(x, top, sp, pid)}`;
          })
          .join('')}
        ${arrow(pileW + 10, top + CARD_H / 2, ghostX - 10, top + CARD_H / 2, aid)}
        ${muted(pileW + gapArrow / 2, top + CARD_H / 2 - 10, 'burn')}
        ${ghost(ghostX, top)}
        ${muted(ghostX + CARD_W / 2, top + CARD_H + 18, 'pile gone')}
        ${muted(pileW / 2, top + CARD_H + 18, 'four of a kind')}
        ${muted(Math.max(w, 286) / 2, h - 8, 'you play again', { size: 10.5 })}`,
    });
  },
};

export const DIAGRAM_IDS = Object.keys(BUILDERS);

/** Renders a `{ type: 'diagram', id, caption }` block. */
export function renderDiagram(diagramId, caption) {
  const build = BUILDERS[diagramId];
  if (!build) {
    throw new Error(
      `Unknown diagram id "${diagramId}". Known ids: ${DIAGRAM_IDS.join(', ')}`
    );
  }
  return `
    <figure class="diagram">
      <div class="diagram__frame">${build(diagramId)}</div>
      ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
    </figure>`;
}
