// Shared UI pieces: playing-card chips, the card library, Try It drills and
// the progress ring. Kept out of game.js so that file stays a page layout.

import { esc } from './escape.js';
import { renderBlocks } from './blocks.js';

const RED = new Set(['♥', '♦']);

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
  return `<span class="ring ring--${size}" data-ring data-ring-game="${esc(slug)}" data-total="${total}">
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <circle class="ring__track" cx="18" cy="18" r="15.5"/>
      <circle class="ring__fill" cx="18" cy="18" r="15.5"/>
    </svg>
    <span class="ring__count" data-ring-count>0/${total}</span>
    <span class="ring__done" data-ring-done hidden>✓</span>
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
      <ul class="cardlib__grid">${lib.entries.map(item).join('')}</ul>
      <p class="cardlib__empty" data-cardlib-empty hidden>No cards match that filter.</p>
    </div>
  </section>`;
}

export function drills(game) {
  if (!game.drills?.length) return '';
  const total = game.drills.length;

  const one = (d, i) => `
    <article class="drill" data-drill data-game="${esc(game.slug)}" data-id="${esc(d.id)}">
      <header class="drill__head">
        <p class="drill__step">Drill ${i + 1} of ${total}</p>
        <h3 class="drill__title">${esc(d.title)}</h3>
        <span class="drill__check" data-drill-check hidden aria-label="Completed">✓</span>
      </header>
      <p class="drill__prompt">${esc(d.prompt)}</p>
      <ul class="drill__options">
        ${d.options.map((o, n) => `<li>
          <button class="drill__option" type="button"
                  data-drill-option${o.correct ? ' data-correct' : ''}
                  aria-label="Option ${n + 1}: ${esc(o.faces.map(cardLabel).join(' and '))}">
            ${o.faces.map((f) => miniCard(f)).join('')}
          </button>
        </li>`).join('')}
      </ul>
      <div class="drill__feedback" data-drill-feedback hidden>
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
