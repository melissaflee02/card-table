// Renders a collection page: an opinionated shortlist answering "what should
// we play?" rather than "how does X work?".
//
// The per-pick verdict and reason are the whole point. Without them this is a
// filtered list, which is a doorway page — useless to a reader and a liability
// in search. build.js refuses to emit a collection whose picks do not actually
// satisfy its own stated criterion.

import { esc } from './escape.js';
import { SITE, layout } from './layout.js';
import { renderBlocks } from './blocks.js';
import { playerLabel, timeLabel } from './game.js';
import { deckLabel } from './components.js';

const longDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/**
 * Which games satisfy a collection's own criterion. The template uses this to
 * list qualifying games that did not make the curated cut.
 *
 * Without it the coverage test forces every qualifying game into the ranked
 * list, and at fifteen games that turns an opinionated shortlist back into the
 * undifferentiated filtered list these pages exist to avoid. Naming the rest
 * in a line underneath keeps the page complete and honest while leaving the
 * ranking short enough to be worth reading — and it is derived, so a new game
 * can never be silently missing.
 */
export function qualifyingGames(collection, games) {
  const req = collection.requires ?? {};
  return games.filter((g) => {
    if (req.players !== undefined
        && !(g.players.min <= req.players && g.players.max >= req.players)) return false;
    if (req.difficulty !== undefined && g.difficulty !== req.difficulty) return false;
    if (req.maxMinutes !== undefined && (g.time.min + g.time.max) / 2 > req.maxMinutes) return false;
    return true;
  });
}

export function collectionPage(collection, games) {
  const byslug = new Map(games.map((g) => [g.slug, g]));
  const picks = collection.picks.map((p) => ({ ...p, game: byslug.get(p.slug) }));

  const card = ({ game, verdict, why }, i) => `
    <li class="pick">
      <div class="pick__rank" aria-hidden="true">${i + 1}</div>
      <div class="pick__body">
        <h2 class="pick__name">
          <a href="games/${esc(game.slug)}.html">${esc(game.name)}</a>
          <span class="pick__suit" aria-hidden="true">${esc(game.suit)}</span>
        </h2>
        <p class="pick__verdict">${esc(verdict)}</p>
        <p class="pick__why">${esc(why)}</p>
        <dl class="pick__facts">
          <div><dt>Players</dt><dd>${esc(playerLabel(game.players))}</dd></div>
          <div><dt>Time</dt><dd>${esc(timeLabel(game.time))}</dd></div>
          <div><dt>You need</dt><dd>${esc(deckLabel(game))}</dd></div>
        </dl>
        <p class="pick__link"><a href="games/${esc(game.slug)}.html">Full ${esc(game.name)} rules →</a></p>
      </div>
    </li>`;

  // Qualifying games that are not in the ranked list. Named rather than hidden.
  const listed = new Set(collection.picks.map((p) => p.slug));
  const alsoWorks = qualifyingGames(collection, games)
    .filter((g) => !listed.has(g.slug))
    // A game excluded on purpose is argued in the caveat; do not contradict it.
    .filter((g) => !collection.caveat?.text.includes(g.name));

  const body = `
  <div class="wrap">
    <nav class="crumb" aria-label="Breadcrumb"><a href="index.html">← All games</a></nav>
    <article class="collection">
      <header class="collection__head">
        <h1>${esc(collection.heading)}</h1>
        <p class="collection__lede">${esc(collection.lede)}</p>
      </header>

      ${renderBlocks(collection.intro)}

      <ol class="picks">${picks.map(card).join('')}</ol>

      ${alsoWorks.length ? `
      <section class="also">
        <h2>Also works, but did not make the list</h2>
        <p>These fit ${esc(collection.alsoNote ?? 'the same criteria')} — they are just not where we would start.</p>
        <ul class="also__list">${alsoWorks.map((g) => `
          <li><a href="games/${esc(g.slug)}.html">${esc(g.name)}</a>
            <span>${esc(playerLabel(g.players))} · ${esc(timeLabel(g.time))}</span></li>`).join('')}
        </ul>
      </section>` : ''}

      ${collection.caveat ? `
      <aside class="callout callout--warning">
        <p class="callout__label">${esc(collection.caveat.title)}</p>
        ${renderBlocks([{ type: 'p', text: collection.caveat.text }])}
      </aside>` : ''}

      ${renderBlocks(collection.outro ?? [])}

      <p class="collection__updated">Last reviewed
        <time datetime="${esc(collection.updated)}">${longDate(collection.updated)}</time>.
        Every game here has full rules, a printable cheat sheet and a scorekeeper.</p>
    </article>
  </div>`;

  return layout({
    title: collection.title,
    description: collection.description,
    body,
    base: '',
    path: `${collection.slug}.html`,
    bodyClass: 'page-collection',
    ogImage: 'assets/og-card.png',
    ogImageAlt: `${collection.heading} — ${SITE.name}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ItemList',
          name: collection.heading,
          description: collection.description,
          numberOfItems: picks.length,
          itemListElement: picks.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.game.name,
            url: `${SITE.origin}/games/${p.game.slug}.html`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'All games', item: `${SITE.origin}/` },
            { '@type': 'ListItem', position: 2, name: collection.title },
          ],
        },
      ],
    },
  });
}
