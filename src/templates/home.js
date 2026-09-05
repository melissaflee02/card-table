import { layout, SITE } from './layout.js';
import { esc } from './blocks.js';
import { playerLabel, timeLabel } from './game.js';
import { progressRing } from './components.js';

// Bucket on the *typical* length (midpoint of the range), not the worst case.
// Bucketing on time.max put every game in medium-or-longer and left the
// "under 15" chip permanently empty.
const typicalMinutes = (g) => (g.time.min + g.time.max) / 2;

const DURATION_FILTERS = [
  { id: 'quick', label: 'Under 15 min', test: (g) => typicalMinutes(g) <= 15 },
  { id: 'medium', label: '15–30 min', test: (g) => typicalMinutes(g) > 15 && typicalMinutes(g) <= 30 },
  { id: 'long', label: '30 min+', test: (g) => typicalMinutes(g) > 30 },
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

const PLAYER_FILTERS = [
  { id: 'p2', label: '2', test: (g) => g.players.min <= 2 && g.players.max >= 2 },
  { id: 'p3', label: '3', test: (g) => g.players.min <= 3 && g.players.max >= 3 },
  { id: 'p4', label: '4', test: (g) => g.players.min <= 4 && g.players.max >= 4 },
  { id: 'p5', label: '5+', test: (g) => g.players.max >= 5 },
];

function chips(name, legend, filters) {
  return `
  <fieldset class="chips">
    <legend>${esc(legend)}</legend>
    ${filters
      .map(
        (f) => `<label class="chip">
      <input type="checkbox" name="${esc(name)}" value="${esc(f.id)}">
      <span>${esc(f.label)}</span>
    </label>`
      )
      .join('')}
  </fieldset>`;
}

function gameCard(game) {
  // Filter state lives in data attributes so filtering is a pure DOM read —
  // no duplicated game list shipped to the client.
  const durations = DURATION_FILTERS.filter((f) => f.test(game)).map((f) => f.id);
  const players = PLAYER_FILTERS.filter((f) => f.test(game)).map((f) => f.id);
  const haystack = [
    game.name,
    ...(game.aliases || []),
    ...(game.tags || []),
    ...(game.keywords || []),
    game.tagline,
  ]
    .join(' ')
    .toLowerCase();

  return `
  <li class="card-item"
      data-game
      data-search="${esc(haystack)}"
      data-players="${players.join(' ')}"
      data-duration="${durations.join(' ')}"
      data-tags="${esc((game.tags || []).join(' '))}">
    <a class="game-card" href="games/${esc(game.slug)}.html">
      <span class="game-card__suit" data-suit="${'♥♦'.includes(game.suit) ? 'red' : 'black'}" aria-hidden="true">${esc(game.suit || '♠')}</span>
      <h3 class="game-card__name">${esc(game.name)}</h3>
      ${game.aliases?.length ? `<p class="game-card__aka">aka ${esc(game.aliases.slice(0, 2).join(', '))}</p>` : ''}
      <p class="game-card__tagline">${esc(game.tagline)}</p>
      ${game.drills?.length ? progressRing(game.slug, game.drills.length, { size: 'sm' }) : ''}
      <span class="game-card__meta">
        <span class="pill">${esc(playerLabel(game.players))}</span>
        <span class="pill">${esc(timeLabel(game.time))}</span>
        <span class="pill pill--${esc(game.difficulty)}">${game.difficulty === 'easy' ? 'Easy' : 'Strategic'}</span>
      </span>
    </a>
  </li>`;
}

export function homePage(games, planned) {
  const present = new Set(games.flatMap((g) => g.tags || []));
  const tags = Object.keys(TAG_LABELS).filter((t) => present.has(t));
  const unlabelled = [...present].filter((t) => !TAG_LABELS[t]);
  if (unlabelled.length) {
    throw new Error(`Tags used in game data but missing from TAG_LABELS: ${unlabelled.join(', ')}`);
  }

  const body = `
<div class="wrap">
  <section class="hero">
    <h1>${esc(SITE.tagline)}</h1>
    <p class="hero__sub">No sign-ups, no pop-ups, no ten paragraphs about the history of playing cards. Pick a game, get the rules, deal.</p>
  </section>

  <form class="finder" data-finder role="search" aria-label="Find a card game">
    <div class="finder__search">
      <label for="q">Search games</label>
      <input type="search" id="q" name="q" placeholder="Try “shithead”, “cabo” or “bluffing”" autocomplete="off" spellcheck="false">
    </div>
    <div class="finder__filters">
      ${chips('players', 'Players', PLAYER_FILTERS)}
      ${chips('duration', 'Length', DURATION_FILTERS)}
      <fieldset class="chips">
        <legend>Type</legend>
        ${tags
          .map(
            (t) => `<label class="chip">
          <input type="checkbox" name="tags" value="${esc(t)}">
          <span>${esc(TAG_LABELS[t])}</span>
        </label>`
          )
          .join('')}
      </fieldset>
    </div>
    <div class="finder__foot">
      <p class="finder__count" data-count role="status" aria-live="polite"></p>
      <button class="btn btn--quiet" type="reset" data-reset hidden>Clear filters</button>
    </div>
  </form>

  <ul class="game-grid" data-grid>
    ${games.map(gameCard).join('\n')}
  </ul>

  <p class="empty" data-empty hidden>
    Nothing matches those filters. <button class="link-btn" type="button" data-reset>Clear them</button> and start over.
  </p>

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

  return layout({
    title: '',
    description:
      'Clear, printable rules for popular card games: Cambio, Gin Rummy, Palace, Hearts and President. Setup, turn order, scoring, house rules and cheat sheets.',
    body,
    base: '',
    bodyClass: 'page-home',
    scripts: ['filter.js', 'progress.js'],
  });
}
