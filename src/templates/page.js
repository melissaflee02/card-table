// Plain prose pages — About, Privacy. These have no game data behind them, so
// they take a simple block list rather than the section/anchor-nav machinery a
// game page needs.

import { esc } from './escape.js';
import { SITE, layout } from './layout.js';
import { renderBlocks } from './blocks.js';

export function staticPage({ slug, title, heading, description, lede, blocks, updated }) {
  const body = `
  <div class="wrap">
    <article class="prose">
      <header class="prose__head">
        <h1>${esc(heading || title)}</h1>
        ${lede ? `<p class="prose__lede">${esc(lede)}</p>` : ''}
      </header>
      ${renderBlocks(blocks)}
      ${updated ? `<p class="prose__updated">Last updated
        <time datetime="${esc(updated)}">${new Date(`${updated}T00:00:00Z`).toLocaleDateString('en-GB',
          { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>.</p>` : ''}
    </article>
  </div>`;

  return layout({
    title,
    description,
    body,
    base: '',
    path: `${slug}.html`,
    bodyClass: 'page-prose',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: `${SITE.origin}/${slug}.html`,
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: `${SITE.origin}/` },
    },
  });
}
