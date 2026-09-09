import { layout, SITE } from './layout.js';
import { renderBlocks, esc } from './blocks.js';
import { cardLibrary, drills, progressRing, deckLabel, equipmentTier } from './components.js';

export const playerLabel = (p) =>
  p.min === p.max ? `${p.min} players` : `${p.min}–${p.max} players`;

export const timeLabel = (t) =>
  t.min === t.max ? `${t.min} min` : `${t.min}–${t.max} min`;

const playerQualifier = (p) =>
  p.note ? ` (${esc(p.note)})` : p.best ? ` (best with ${esc(p.best)})` : '';

// Google truncates around 160 characters, and the old template ran to 169 on
// President while reading identically on all nine pages. Lead with the game's
// own hook instead, then fit as many aliases as the budget allows — someone
// searching "shithead" needs to see the word to know they are in the right
// place. Descriptions are not a ranking factor, so this is purely about whether
// the result is worth clicking.
const META_LIMIT = 158;
export function metaDescription(game) {
  const tail = 'Rules, setup, scoring and a printable cheat sheet.';
  const plain = `${game.tagline} ${tail}`;
  for (let n = game.aliases?.length ?? 0; n > 0; n--) {
    const withAliases = `${game.tagline} Also called ${game.aliases.slice(0, n).join(', ')}. ${tail}`;
    if (withAliases.length <= META_LIMIT) return withAliases;
  }
  return plain;
}

function statsRow(game) {
  const items = [
    // `best` is a recommended *count*; `note` is a format fact (e.g. "two
    // partnerships") for games where the count is fixed and "best with 4" would
    // just restate the 4 already shown. They are mutually exclusive in practice.
    ['Players', playerLabel(game.players) + playerQualifier(game.players)],
    ['Time', timeLabel(game.time)],
    ['What you need', esc(deckLabel(game))],
    ['Difficulty', game.difficulty === 'easy' ? 'Easy to learn' : 'Some strategy'],
  ];
  if (game.extras?.length) {
    items.push(['Also bring', game.extras.map(esc).join(', ')]);
  }
  return `<dl class="stats">${items
    .map(([k, v]) => `<div class="stats__item"><dt>${esc(k)}</dt><dd>${v}</dd></div>`)
    .join('')}</dl>`;
}

function sectionNav(entries) {
  return `
  <nav class="anchor-nav" aria-label="On this page">
    <ul>${entries.map((e) => `<li><a href="#${esc(e.id)}">${esc(e.title)}</a></li>`).join('')}</ul>
  </nav>`;
}

function variationsBlock(game) {
  if (!game.variations?.length) return '';
  return `
  <section class="section" id="house-rules">
    <h2>House rules &amp; variations</h2>
    <p class="section__lede">Every table plays a little differently. These are the common variants — agree on them <em>before</em> you deal.</p>
    <div class="variations">
      ${game.variations
        .map(
          (v) => `<details class="variation">
        <summary><span>${esc(v.name)}</span></summary>
        <div class="variation__body">${renderBlocks([{ type: 'p', text: v.description }])}</div>
      </details>`
        )
        .join('')}
    </div>
  </section>`;
}

function hintsBlock(game) {
  if (!game.hints?.length) return '';
  return `
  <section class="section" id="hints">
    <h2>Strategy hints</h2>
    <!-- Keep the <p>. .hints li is display:grid, and a grid container turns every
         child *and every contiguous run of text* into its own grid item. Strip the
         wrapper and a hint like "There are exactly **four of each rank**." becomes
         three items — the <strong> lands in the 1.9rem badge column and wraps one
         word per line. The <p> keeps each hint as a single item. -->
    <ol class="hints">${game.hints.map((h) => `<li>${renderBlocks([{ type: 'p', text: h }])}</li>`).join('')}</ol>
  </section>`;
}

// The footer claims rules are cross-checked against multiple sources; without
// naming them that is just an assertion. Only sources verified to cover this
// specific game are listed — Cheat and the Palace/Cambio family are not on
// Bicycle, so they cite Pagat alone rather than padding the list.
function sourcesBlock(game) {
  if (!game.sources?.length) return '';
  const reviewed = new Date(`${game.reviewed}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
  return `
  <aside class="sources" aria-labelledby="sources-heading">
    <h2 id="sources-heading">Where these rules come from</h2>
    <p>Cross-checked against the references below. Where they genuinely disagree,
       the difference is listed under <a href="#house-rules">House rules</a>
       rather than settled here.</p>
    <ul>${game.sources.map((src) => `
      <li><a href="${esc(src.url)}" rel="nofollow noopener" target="_blank">${esc(src.name)}</a></li>`).join('')}
    </ul>
    <p class="sources__reviewed">Last reviewed <time datetime="${esc(game.reviewed)}">${esc(reviewed)}</time>.</p>
  </aside>`;
}

function faqBlock(game) {
  if (!game.faq?.length) return '';
  return `
  <section class="section" id="faq">
    <h2>Frequently asked</h2>
    <div class="faq">
      ${game.faq
        .map(
          (f) => `<details class="faq__item">
        <summary><span>${esc(f.q)}</span></summary>
        <div class="faq__answer">${renderBlocks([{ type: 'p', text: f.a }])}</div>
      </details>`
        )
        .join('')}
    </div>
  </section>`;
}

function cheatSheetBlock(game) {
  const cs = game.cheatSheet;
  if (!cs) return '';
  return `
  <section class="section cheatsheet" id="cheat-sheet">
    <div class="cheatsheet__head">
      <h2>Cheat sheet</h2>
      <!-- Revealed by page.js: without JS it would be a button that does nothing. -->
      <button class="btn btn--primary" type="button" data-print hidden>Print this page</button>
    </div>
    <div class="cheatsheet__card">
      <header class="cheatsheet__title">
        <h3>${esc(game.name)}</h3>
        <p>${playerLabel(game.players)} &middot; ${timeLabel(game.time)} &middot; ${esc(deckLabel(game))}${game.extras?.length ? ` &middot; ${game.extras.map(esc).join(', ')}` : ''}</p>
      </header>
      <div class="cheatsheet__grid">
        <div class="cheatsheet__cell">
          <h4>Setup</h4>
          ${renderBlocks([{ type: 'p', text: cs.setup }])}
        </div>
        <div class="cheatsheet__cell">
          <h4>Your turn</h4>
          <ol>${cs.turn.map((t) => `<li>${renderBlocks([{ type: 'p', text: t }]).replace(/^<p>|<\/p>$/g, '')}</li>`).join('')}</ol>
        </div>
        <div class="cheatsheet__cell">
          <h4>Key rules</h4>
          <ul>${cs.keyRules.map((r) => `<li>${renderBlocks([{ type: 'p', text: r }]).replace(/^<p>|<\/p>$/g, '')}</li>`).join('')}</ul>
        </div>
        <div class="cheatsheet__cell">
          <h4>Scoring</h4>
          ${renderBlocks([{ type: 'p', text: cs.scoring }])}
        </div>
      </div>
    </div>
  </section>`;
}

function trackerBlock(game) {
  const s = game.scoring;
  if (!s) return '';
  const goal =
    s.mode === 'low'
      ? `Lowest ${esc(s.unit)} wins.`
      : `Highest ${esc(s.unit)} wins.`;
  const target = s.target
    ? s.mode === 'low'
      ? ` A game ends when someone passes ${s.target} — the lowest score at that moment wins.`
      : ` First to ${s.target} wins.`
    : '';
  return `
  <section class="section tracker" id="score-tracker"
           data-tracker
           data-game="${esc(game.slug)}"
           data-mode="${esc(s.mode)}"
           data-target="${s.target ?? ''}"
           data-unit="${esc(s.unit)}">
    <h2>Score tracker</h2>
    <p class="section__lede">${goal}${target}</p>
    <noscript><p class="callout callout--note">The score tracker needs JavaScript. Pen and paper works too.</p></noscript>
  </section>`;
}

export function gamePage(game, { prev, next }) {
  const navEntries = [
    { id: 'objective', title: 'Objective' },
    ...game.sections.map((s) => ({ id: s.id, title: s.navTitle || s.title })),
  ];
  if (game.cardLibrary?.entries?.length) navEntries.push({ id: 'card-library', title: 'Card library' });
  if (game.drills?.length) navEntries.push({ id: 'try-it', title: 'Try it' });
  if (game.variations?.length) navEntries.push({ id: 'house-rules', title: 'House rules' });
  if (game.hints?.length) navEntries.push({ id: 'hints', title: 'Hints' });
  if (game.faq?.length) navEntries.push({ id: 'faq', title: 'FAQ' });
  if (game.cheatSheet) navEntries.push({ id: 'cheat-sheet', title: 'Cheat sheet' });
  if (game.scoring) navEntries.push({ id: 'score-tracker', title: 'Score tracker' });

  const body = `
<article class="game">
  <div class="wrap">
    <p class="crumb"><a href="../index.html">&larr; All games</a></p>
    <header class="game__header">
      <h1>${esc(game.name)}</h1>
      ${game.aliases?.length
        ? `<p class="aliases">Also called ${game.aliases.map((a) => `<span>${esc(a)}</span>`).join(', ')}</p>`
        : ''}
      <p class="game__tagline">${esc(game.tagline)}</p>
      ${game.drills?.length ? `<p class="game__progress">${progressRing(game.slug, game.drills.length, { size: 'sm' })}<span>drills completed</span></p>` : ''}
      ${statsRow(game)}
    </header>
  </div>

  <div class="wrap game__layout">
  ${sectionNav(navEntries)}

  <div class="game__body">
    <section class="section" id="objective">
      <h2>Objective</h2>
      <p class="objective">${esc(game.objective)}</p>
    </section>

    ${game.sections
      .map(
        (s) => `<section class="section" id="${esc(s.id)}">
      <h2>${esc(s.title)}</h2>
      ${s.lede ? `<p class="section__lede">${esc(s.lede)}</p>` : ''}
      ${renderBlocks(s.body)}
    </section>`
      )
      .join('\n')}

    ${cardLibrary(game)}
    ${drills(game)}
    ${variationsBlock(game)}
    ${hintsBlock(game)}
    ${faqBlock(game)}
    ${cheatSheetBlock(game)}
    ${trackerBlock(game)}
    ${sourcesBlock(game)}

    <nav class="pager" aria-label="More games">
      ${prev ? `<a class="pager__link" href="${esc(prev.slug)}.html"><span>Previous</span><strong>${esc(prev.name)}</strong></a>` : '<span></span>'}
      ${next ? `<a class="pager__link pager__link--next" href="${esc(next.slug)}.html"><span>Next</span><strong>${esc(next.name)}</strong></a>` : '<span></span>'}
    </nav>
  </div>
  </div>
</article>`;

  // Title mirrors how people actually search: "how to play <game>". Kept
  // short so the useful half survives Google's ~60-character truncation.
  const facets = game.scoring ? 'Rules, Setup & Scoring' : 'Rules & Setup';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Game',
        name: game.name,
        alternateName: game.aliases?.length ? game.aliases : undefined,
        description: game.objective,
        url: `${SITE.origin}/games/${game.slug}.html`,
        numberOfPlayers: {
          '@type': 'QuantitativeValue',
          minValue: game.players.min,
          maxValue: game.players.max,
        },
        gameItem: { '@type': 'Thing', name: deckLabel(game) },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'All games', item: `${SITE.origin}/` },
          { '@type': 'ListItem', position: 2, name: game.name },
        ],
      },
    ],
  };

  return layout({
    title: `How to Play ${game.name}: ${facets}`,
    description: metaDescription(game),
    body,
    base: '../',
    ogImage: `assets/og/${game.slug}.png`,
    ogImageAlt: `How to play ${game.name} — ${game.tagline}`,
    path: `games/${game.slug}.html`,
    jsonLd,
    bodyClass: 'page-game',
    scripts: [
      'page.js',
      ...(game.cardLibrary?.entries?.length ? ['cardlib.js'] : []),
      // progress.js first: drills.js reads the store it defines.
      ...(game.drills?.length ? ['progress.js', 'drills.js'] : []),
      ...(game.scoring ? ['scorer.js'] : []),
    ],
  });
}
