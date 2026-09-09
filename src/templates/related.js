// "If you like this, try these" — computed, not hand-authored.
//
// Hand-written pairings read better but rot: nineteen games means fifty-odd
// relationships to revisit every time one is added. These are derived from the
// data instead, and — importantly — the reason shown is generated from the
// specific facts that made the pair match, so it says "another shedding game,
// and it takes up to eight" rather than a vague "you might also like".
//
// `party` is deliberately not treated as a mechanic. It describes a mood, not
// how the game works, and five of nine games carry it — matching on it would
// relate everything to everything.

import { esc } from './escape.js';
import { playerLabel, timeLabel } from './game.js';

const MECHANICS = {
  shedding: 'shedding game',
  'trick-taking': 'trick-taking game',
  melds: 'melding game',
  memory: 'memory game',
  bluffing: 'bluffing game',
};

const mechanicsOf = (g) => g.tags.filter((t) => t in MECHANICS);
const overlap = (a, b) =>
  Math.max(0, Math.min(a.players.max, b.players.max) - Math.max(a.players.min, b.players.min) + 1);
const midpoint = (t) => (t.min + t.max) / 2;
const rank = { easy: 0, medium: 1 };

function score(a, b) {
  const shared = mechanicsOf(a).filter((m) => mechanicsOf(b).includes(m));
  let s = shared.length * 10;
  if (overlap(a, b) > 0) s += 3;
  // A game that seats the whole room is a useful suggestion for one that cannot.
  if (b.players.max > a.players.max) s += 1;
  if (Math.abs(midpoint(a.time) - midpoint(b.time)) <= 10) s += 1;
  if (rank[b.difficulty] < rank[a.difficulty]) s += 1;
  return s;
}

/**
 * One sentence explaining the pairing, built only from facts true of this pair.
 * Never returns filler: if nothing specific can be said, the caller drops the
 * suggestion rather than printing "you might also like".
 */
function reason(a, b) {
  const shared = mechanicsOf(a).filter((m) => mechanicsOf(b).includes(m));
  const extras = [];

  if (rank[b.difficulty] < rank[a.difficulty]) extras.push('simpler to teach');
  if (midpoint(b.time) <= midpoint(a.time) - 8) extras.push('quicker');
  if (b.players.max > a.players.max) extras.push(`takes up to ${b.players.max}`);
  else if (b.players.min < a.players.min) extras.push(`works with as few as ${b.players.min}`);

  if (shared.length) {
    // Where two games share more than one mechanic, name the more distinctive
    // of the pair — "bluffing" says more about Cheat than "shedding" does.
    const m = shared.includes('bluffing') && shared.length > 1 ? 'bluffing' : shared[0];
    // A mechanic the other game adds is the sharpest distinguisher, and stops
    // three shedding games from all being described as "another shedding game".
    const adds = mechanicsOf(b).find((x) => !mechanicsOf(a).includes(x));
    if (adds) extras.unshift(`with ${adds.replace('-', ' ')} on top`);
    const head = `Another ${MECHANICS[m]}`;
    return extras.length ? `${head} — ${extras.slice(0, 2).join(' and ')}.` : `${head}.`;
  }

  // No shared mechanic. The honest link is usually the table: someone reading
  // a strictly two-player game most wants to know what else that pair can
  // play, and "takes up to 8" is a much weaker thing to lead with.
  const fixed = a.players.min === a.players.max;
  const kind = MECHANICS[mechanicsOf(b)[0]];
  if (fixed && b.players.min <= a.players.min && b.players.max >= a.players.min) {
    const word = { 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six' }[a.players.min] ?? a.players.min;
    // Naming what the other game *is* keeps three suggestions for the same
    // fixed-count game from reading as three copies of one sentence.
    if (kind) return `Also works with ${word} — a ${kind} instead.`;
    const tail = extras.filter((e) => !/^(takes up to|works with)/.test(e));
    return `Also works with ${word}${tail.length ? `, and is ${tail[0]}` : ''}.`;
  }
  if (a.tags.includes('party') && b.tags.includes('party')) {
    const bigger = b.players.max > a.players.max ? ` — seats up to ${b.players.max}` : '';
    return `Another one that works with a crowd${bigger}.`;
  }
  if (kind) {
    const head = `A ${kind} instead`;
    return extras.length ? `${head} — ${extras.slice(0, 2).join(' and ')}.` : `${head}.`;
  }
  if (extras.length) {
    const head = extras[0][0].toUpperCase() + extras[0].slice(1);
    return `${head}${extras[1] ? ` and ${extras[1]}` : ''}.`;
  }
  return null;
}

export function relatedGames(game, all, limit = 3) {
  return all
    .filter((g) => g.slug !== game.slug)
    .map((g) => ({ game: g, s: score(game, g), why: reason(game, g) }))
    .filter((r) => r.why && r.s > 0)
    .sort((a, b) => b.s - a.s || a.game.name.localeCompare(b.game.name))
    .slice(0, limit);
}

/**
 * Suggestions for the whole catalogue, with every game guaranteed to appear on
 * at least one other page.
 *
 * Picking each page's top three independently leaves dead ends: Gin Rummy is
 * the only melding game and the only strictly two-player one, so it never
 * placed in anyone's top three and no page linked to it. A reader could not
 * reach it by browsing. This adds a second pass that seats each orphan on the
 * page where it scores highest, displacing that page's weakest pick.
 */
export function relatedMap(all, limit = 3) {
  const map = new Map(all.map((g) => [g.slug, relatedGames(g, all, limit)]));
  const linkedFrom = (slug) => [...map.values()].some((rs) => rs.some((r) => r.game.slug === slug));

  for (const orphan of all) {
    if (linkedFrom(orphan.slug)) continue;
    const host = all
      .filter((h) => h.slug !== orphan.slug && reason(h, orphan))
      .sort((a, b) => score(b, orphan) - score(a, orphan) || a.name.localeCompare(b.name))[0];
    if (!host) continue;
    const list = map.get(host.slug);
    list.pop();
    list.push({ game: orphan, s: score(host, orphan), why: reason(host, orphan) });
  }
  return map;
}

export function relatedBlock(game, all, picks = relatedGames(game, all)) {
  if (!picks.length) return '';
  return `
  <section class="section related" id="related">
    <h2>If you like ${esc(game.name)}</h2>
    <ul class="related__list">${picks.map(({ game: g, why }) => `
      <li>
        <a class="related__card" href="${esc(g.slug)}.html">
          <span class="related__suit" aria-hidden="true">${esc(g.suit)}</span>
          <span class="related__body">
            <strong class="related__name">${esc(g.name)}</strong>
            <span class="related__why">${esc(why)}</span>
            <span class="related__meta">${esc(playerLabel(g.players))} · ${esc(timeLabel(g.time))}</span>
          </span>
        </a>
      </li>`).join('')}
    </ul>
  </section>`;
}
