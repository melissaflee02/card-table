import { layout, SITE } from './layout.js';
import { esc } from './escape.js';
import { playerLabel, timeLabel } from './game.js';
import { progressRing, EQUIPMENT, equipmentTier, decorativeCardFan } from './components.js';
import { COLLECTIONS } from '../data/collections.js';

// Bucket on the *typical* length (midpoint of the range), not the worst case.
// Bucketing on time.max put every game in medium-or-longer and left the
// "under 15" chip permanently empty.
const typicalMinutes = (g) => (g.time.min + g.time.max) / 2;

const DURATION_FILTERS = [
  { id: 'quick', label: 'Under 15 min', test: (g) => typicalMinutes(g) <= 15 },
  { id: 'medium', label: '15–30 min', test: (g) => typicalMinutes(g) > 15 && typicalMinutes(g) <= 30 },
  { id: 'long', label: '30 min+', test: (g) => typicalMinutes(g) > 30 },
];

const PLAYER_FILTERS = [
  { id: 'p2', label: '2', test: (g) => g.players.min <= 2 && g.players.max >= 2 },
  { id: 'p3', label: '3', test: (g) => g.players.min <= 3 && g.players.max >= 3 },
  { id: 'p4', label: '4', test: (g) => g.players.min <= 4 && g.players.max >= 4 },
  { id: 'p5', label: '5+', test: (g) => g.players.max >= 5 },
];

// Tag slugs are terse for the data files; these are what a reader sees.
// Order is deliberate — most-recognisable category first, not alphabetical.
const TAG_LABELS = {
  'trick-taking': 'Trick-taking',
  shedding: 'Shedding',
  melds: 'Melds & runs',
  memory: 'Memory',
  bluffing: 'Bluffing',
  party: 'Party',
};

/** One filter group. Only rendered when more than one option matches a game. */
function filterGroup(name, legend, options) {
  if (options.length < 2) return '';
  return `
  <fieldset class="filters__group">
    <legend>${esc(legend)}</legend>
    <div class="chips">
      ${options.map((o) => `<label class="chip">
        <input type="checkbox" name="${esc(name)}" value="${esc(o.id)}">
        <span>${esc(o.label)}</span>
      </label>`).join('')}
    </div>
  </fieldset>`;
}

function gameCard(game) {
  // Filter state lives in data attributes so filtering is a pure DOM read —
  // no duplicated game list shipped to the client.
  const tier = equipmentTier(game);
  const durations = DURATION_FILTERS.filter((f) => f.test(game)).map((f) => f.id);
  const players = PLAYER_FILTERS.filter((f) => f.test(game)).map((f) => f.id);
  const haystack = [
    game.name, ...(game.aliases || []), ...(game.tags || []),
    ...(game.keywords || []), game.tagline,
  ].join(' ').toLowerCase();

  return `
  <li class="card-item" data-game
      data-search="${esc(haystack)}"
      data-players="${players.join(' ')}"
      data-duration="${durations.join(' ')}"
      data-tags="${esc((game.tags || []).join(' '))}"
      data-kit="${esc(tier.id)}">
    <a class="game-card" href="games/${esc(game.slug)}.html">
      <span class="game-card__suit" data-suit="${'♥♦'.includes(game.suit) ? 'red' : 'black'}" aria-hidden="true">${esc(game.suit || '♠')}</span>
      ${game.drills?.length ? progressRing(game.slug, game.drills.length, { size: 'sm' }) : ''}
      <h3 class="game-card__name">${esc(game.name)}</h3>
      ${game.aliases?.length ? `<p class="game-card__aka">also called ${esc(game.aliases.slice(0, 2).join(', '))}</p>` : ''}
      <p class="game-card__tagline">${esc(game.tagline)}</p>
      <span class="game-card__meta">
        <span class="pill">${esc(playerLabel(game.players))}</span>
        <span class="pill">${esc(timeLabel(game.time))}</span>
        <span class="pill pill--${esc(game.difficulty)}">${game.difficulty === 'easy' ? 'Easy' : 'Strategic'}</span>
        <span class="pill pill--kit">${esc(tier.short)}</span>
      </span>
    </a>
  </li>`;
}

export function homePage(games, planned) {
  const present = new Set(games.flatMap((g) => g.tags || []));
  const unlabelled = [...present].filter((t) => !TAG_LABELS[t]);
  if (unlabelled.length) {
    throw new Error(`Tags used in game data but missing from TAG_LABELS: ${unlabelled.join(', ')}`);
  }

  const body = `
<div class="wrap">
  <!-- One form spans the hero search and the filter bar so a single reset
       clears everything and filter.js keeps one root. -->
  <form class="finder" data-finder role="search" aria-label="Find a card game">
    <section class="hero">
      <div class="hero__copy">
        <p class="hero__eyebrow">Pick a game. Learn it fast.</p>
        <h1>Rules on the table in two minutes.</h1>
        <p class="hero__sub">No sign-ups, no pop-ups, no ten-paragraph history lesson. Find the setup, settle the argument, and get back to the game.</p>
        <div class="hero__search">
          <label class="sr-only" for="q">Search games</label>
          <span class="hero__search-icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="9" r="6"/><path d="M13.5 13.5 L18 18" stroke-linecap="round"/>
            </svg>
          </span>
          <input type="search" id="q" name="q"
                 placeholder="Search “hearts”, “bluffing” or “2 players”"
                 autocomplete="off" spellcheck="false">
        </div>
      </div>
      ${decorativeCardFan()}
    </section>

    <div class="filters">
      ${filterGroup('players', 'Players', PLAYER_FILTERS)}
      ${filterGroup('duration', 'Length', DURATION_FILTERS)}
      ${filterGroup('kit', 'What you need', EQUIPMENT.filter((e) => games.some((g) => e.test(g))))}
      ${filterGroup('tags', 'Type', Object.keys(TAG_LABELS).filter((t) => present.has(t)).map((t) => ({ id: t, label: TAG_LABELS[t] })))}
      <button class="btn btn--quiet filters__clear" type="reset" data-reset hidden>Clear filters</button>
    </div>
  </form>

  <div class="results">
    <h2 class="results__title" data-results-label>All games</h2>
    <p class="results__count" data-count role="status" aria-live="polite"></p>
  </div>

  <ul class="game-grid" data-grid>
    ${games.map(gameCard).join('\n')}
  </ul>

  <p class="empty" data-empty hidden>
    Nothing matches those filters. <button class="link-btn" type="button" data-reset>Clear them</button> and start over.
  </p>

  <section class="collections">
    <h2>Not sure what to play?</h2>
    <ul class="collections__list">
      ${COLLECTIONS.map((c) => `<li>
        <a href="${esc(c.slug)}.html">
          <span class="collections__name">${esc(c.heading)}</span>
          <span class="collections__count">${esc(String(c.picks.length))} games, picked and explained</span>
        </a>
      </li>`).join('')}
    </ul>
  </section>

  ${planned?.length
      ? `<section class="coming-soon">
    <h2>Coming soon</h2>
    <p>Next up, in this order. ${esc(String(planned.length))} more on the way.</p>
    <ul class="coming-soon__list">
      ${planned.map((p) => `<li><strong>${esc(p.name)}</strong>${p.note ? ` <span>${esc(p.note)}</span>` : ''}</li>`).join('')}
    </ul>
  </section>`
      : ''}
</div>`;

  // Generated from the game list so it can never drift out of date the way a
  // hardcoded "five games" string did.
  const names = games.map((g) => g.name);
  const shown = names.slice(0, 6).join(', ');
  const rest = names.length > 6 ? ` and ${names.length - 6} more` : '';

  return layout({
    title: `How to Play ${names.length} Classic Card Games`,
    // Kept under ~158 characters so Google shows it whole rather than cutting
    // mid-list. The game names earn their place: they are what people search for.
    description:
      `Clear, printable rules for ${names.length} classic card games: ${shown}${rest}. ` +
      'Setup, scoring, house rules and cheat sheets.',
    body,
    base: '',
    path: '',
    bodyClass: 'page-home',
    page: 'home',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: `${SITE.origin}/`,
      description: SITE.tagline,
    },
    scripts: ['filter.js', 'progress.js'],
  });
}
