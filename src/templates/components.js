// Shared UI pieces: playing-card chips, the card library, Try It drills and
// the progress ring. Kept out of game.js so that file stays a page layout.

import { esc } from './escape.js';
import { renderBlocks } from './blocks.js';

const RED = new Set(['♥', '♦']);

/**
 * Equipment tiers. The practical question a reader has is "can I play this
 * right now with what's in the drawer", which splits three ways, not two:
 * a plain deck, a deck plus a physical extra, or a game with its own deck.
 * Jokers are not an extra — they come in the pack.
 */
export const EQUIPMENT = [
  { id: 'just-deck', label: 'Just a deck', short: 'Deck only',
    test: (g) => g.deck === 'standard' && !g.extras?.length },
  { id: 'deck-plus', label: 'Deck + extras', short: 'Deck + extras',
    test: (g) => g.deck === 'standard' && !!g.extras?.length },
  { id: 'own-deck', label: 'Its own deck', short: 'Own deck',
    test: (g) => g.deck === 'own' },
];

export const equipmentTier = (game) =>
  EQUIPMENT.find((e) => e.test(game)) || EQUIPMENT[0];

/** The display string for the at-a-glance "Deck" row. */
export function deckLabel(game) {
  const base = game.deck === 'own' ? 'Its own deck' : 'Standard 52-card deck';
  return game.deckNote ? `${base}, ${game.deckNote}` : base;
}

/**
 * A small playing-card chip. `face` is "K♥" / "10♣", or a bare label like
 * "2–10" for a rule that covers a range rather than one card.
 */
export function miniCard(face, { suit: forcedSuit } = {}) {
  const raw = String(face);
  const trailing = raw.slice(-1);
  const hasSuit = '♠♥♦♣'.includes(trailing);
  const suit = hasSuit ? trailing : forcedSuit || null;
  const rank = hasSuit ? raw.slice(0, -1) : raw;
  const tone = suit && RED.has(suit) ? 'red' : 'black';
  const wide = rank.length > 2 ? ' minicard--wide' : '';
  return `<span class="minicard${wide}" data-tone="${tone}" aria-hidden="true"
    ><b class="minicard__rank">${esc(rank)}</b
    >${suit ? `<i class="minicard__suit">${esc(suit)}</i>` : ''}</span>`;
}

/** Accessible text for a card, since the chip itself is aria-hidden. */
const cardLabel = (face) => {
  const t = String(face).slice(-1);
  if (!'♠♥♦♣'.includes(t)) return String(face);
  const names = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
  return `${String(face).slice(0, -1)} of ${names[t]}`;
};

/** Progress ring. Filled client-side from saved drill completions. */
export function progressRing(slug, total, { size = 'md' } = {}) {
  if (!total) return '';
  // On the homepage the ring sits alone inside a game-card link, where a bare
  // "0/2" says nothing — it could be players, sections or rounds. role="img"
  // plus a name is rendered here rather than left to progress.js so the ring is
  // still explained with JS disabled; title gives sighted users the same on hover.
  const label = `0 of ${total} practice drills completed`;
  return `<span class="ring ring--${size}" data-ring data-ring-game="${esc(slug)}" data-total="${total}"
        role="img" aria-label="${esc(label)}" title="${esc(label)}">
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <circle class="ring__track" cx="18" cy="18" r="15.5"/>
      <circle class="ring__fill" cx="18" cy="18" r="15.5"/>
    </svg>
    <span class="ring__count" data-ring-count aria-hidden="true">0/${total}</span>
    <span class="ring__done" data-ring-done hidden aria-hidden="true">✓</span>
  </span>`;
}

export function cardLibrary(game) {
  const lib = game.cardLibrary;
  if (!lib?.entries?.length) return '';
  const tags = [...new Set(lib.entries.flatMap((e) => e.tags || []))];

  const item = (e) => {
    const hay = [e.rank, e.suit, e.name, e.value, e.effect, ...(e.tags || [])]
      .filter(Boolean).join(' ').toLowerCase();
    return `<li class="cardlib__item" data-card
        data-search="${esc(hay)}" data-tags="${esc((e.tags || []).join(' '))}">
      ${miniCard(e.suit ? `${e.rank}${e.suit}` : e.rank)}
      <div class="cardlib__body">
        <p class="cardlib__name">
          <span class="sr-only">${esc(cardLabel(e.suit ? `${e.rank}${e.suit}` : e.rank))}. </span>
          ${esc(e.name)}<span class="cardlib__value">${esc(e.value)}</span>
        </p>
        <p class="cardlib__effect">${esc(e.effect)}</p>
      </div>
    </li>`;
  };

  return `
  <section class="section" id="card-library">
    <h2>Card library</h2>
    <p class="section__lede">${esc(lib.intro)}</p>
    <div class="cardlib" data-cardlib>
      <div class="cardlib__controls">
        <label class="cardlib__search">
          <span class="sr-only">Filter cards</span>
          <input type="search" placeholder="Filter cards…" autocomplete="off" spellcheck="false" data-cardlib-q>
        </label>
        ${tags.length > 1 ? `<div class="cardlib__tags" role="group" aria-label="Filter by type">
          ${tags.map((t) => `<button class="tagchip" type="button" data-cardlib-tag="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join('')}
        </div>` : ''}
      </div>
      <p class="cardlib__count" data-cardlib-count role="status" aria-live="polite"></p>
      <ul class="cardlib__grid">${lib.entries.map(item).join('')}</ul>
      <p class="cardlib__empty" data-cardlib-empty hidden>No cards match that filter.</p>
    </div>
  </section>`;
}

// Every drill is authored with the correct answer first, which is easy to read
// in the data file and useless in the browser — you could score 18/18 by always
// clicking the left-hand card. Shuffle at build time rather than at runtime so
// the order survives with JS disabled and the emitted HTML stays byte-stable
// (asset fingerprinting hashes this output, so a fresh random order every build
// would churn the hashes). The seed is the game slug + drill id, so a given
// drill always lands the same way but different drills land differently.
export function seededOrder(seed, length) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const next = () => {
    h ^= h << 13; h >>>= 0;
    h ^= h >>> 17;
    h ^= h << 5;  h >>>= 0;
    return h / 4294967296;
  };
  const idx = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

export function drills(game) {
  if (!game.drills?.length) return '';
  const total = game.drills.length;

  const one = (d, i) => `
    <article class="drill" data-drill data-game="${esc(game.slug)}" data-id="${esc(d.id)}">
      <header class="drill__head">
        <p class="drill__step">Drill ${i + 1} of ${total}</p>
        <h3 class="drill__title">${esc(d.title)}</h3>
        <!-- aria-label needs a role that supports naming; a bare span has none,
             so the label was silently dropped by screen readers and flagged by
             the validator. Hide the glyph and carry the word in real text. -->
        <span class="drill__check" data-drill-check hidden><span aria-hidden="true">✓</span><span class="sr-only">Completed</span></span>
      </header>
      <p class="drill__prompt">${esc(d.prompt)}</p>
      <ul class="drill__options">
        ${seededOrder(`${game.slug}:${d.id}`, d.options.length).map((oi) => d.options[oi]).map((o, n) => `<li>
          <button class="drill__option" type="button"
                  data-drill-option${o.correct ? ' data-correct' : ''}
                  aria-label="Option ${n + 1}: ${esc(o.faces.map(cardLabel).join(' and '))}">
            ${o.faces.map((f) => miniCard(f)).join('')}
          </button>
        </li>`).join('')}
      </ul>
      <div class="drill__feedback" data-drill-feedback hidden tabindex="-1">
        <p data-drill-feedback-text></p>
        <button class="btn btn--quiet drill__again" type="button" data-drill-again>Try again</button>
      </div>
      <template data-correct-text>${renderBlocks([{ type: 'p', text: d.correctText }])}</template>
      <template data-wrong-text>${renderBlocks([{ type: 'p', text: d.wrongText }])}</template>
    </article>`;

  return `
  <section class="section" id="try-it">
    <div class="section__headrow">
      <h2>Try it</h2>
      ${progressRing(game.slug, total)}
    </div>
    <p class="section__lede">Short drills on the rules people get wrong. Nothing is saved anywhere but this browser.</p>
    <div class="drills">${game.drills.map(one).join('')}</div>
    <noscript><p class="callout callout--note">The drills need JavaScript. The rules above cover the same ground.</p></noscript>
  </section>`;
}

/**
 * Brand mark: a small playing card with a spade, drawn in CSS. No image
 * dependency, and it scales with the header.
 */
export function brandMark() {
  return `<span class="brandmark" aria-hidden="true"><span class="brandmark__pip">&#9824;</span></span>`;
}

/**
 * Decorative fan of three cards for the hero. Purely ornamental, so it is
 * hidden from assistive technology and carries no information.
 */
export function decorativeCardFan() {
  const cards = [
    { rank: 'A', suit: '\u2663', tone: 'black' },
    { rank: 'Q', suit: '\u2665', tone: 'red' },
    { rank: '7', suit: '\u2660', tone: 'black' },
  ];
  return `<div class="fan" aria-hidden="true">
    ${cards.map((c, i) => `<span class="fan__card fan__card--${i + 1}" data-tone="${c.tone}">
      <span class="fan__corner fan__corner--tl"><b>${c.rank}</b><i>${c.suit}</i></span>
      <span class="fan__pip">${c.suit}</span>
      <span class="fan__corner fan__corner--br"><b>${c.rank}</b><i>${c.suit}</i></span>
    </span>`).join('')}
  </div>`;
}
