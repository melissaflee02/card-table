// Renders the structured `body` blocks used in game data into HTML.
// Keeping rules content as data (not HTML strings) means every game page
// gets identical markup and styling for free.

import { esc } from './escape.js';

// Duplicated from SITE.origin rather than imported: layout.js imports the
// components that import this file, so importing back would be circular.
// Kept honest by a unit test that asserts the two stay equal.
const SITE_ORIGIN = 'https://melissaflee02.github.io/card-table';
import { renderDiagram } from './diagram.js';

export { esc };

// Minimal inline markup so rules text can emphasise a card or a keyword
// without hand-writing tags: **bold**, *italic*, `code`.
const inline = (s) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // [text](href). Off-site links get noopener/noreferrer and open in a new
    // tab; same-site ones stay in place. esc() has already run, so the href is
    // safe to interpolate, and the scheme is restricted to avoid javascript:.
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:|\/|#)[^)\s]+)\)/g, (_, text, href) =>
      /^https?:\/\//.test(href) && !href.startsWith(SITE_ORIGIN)
        ? `<a href="${href}" rel="nofollow noopener noreferrer" target="_blank">${text}</a>`
        : `<a href="${href}">${text}</a>`);

const renderers = {
  p: (b) => `<p>${inline(b.text)}</p>`,

  h2: (b) => `<h2${b.id ? ` id="${esc(b.id)}"` : ''}>${inline(b.text)}</h2>`,

  ul: (b) => `<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`,

  ol: (b) => `<ol>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ol>`,

  table: (b) => `
    <div class="table-wrap">
      <table${b.variant ? ` class="${esc(b.variant)}"` : ''}>
        <thead><tr>${b.headers.map((h) => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead>
        <tbody>${b.rows
          .map(
            (r) =>
              `<tr>${r
                .map((c, i) =>
                  i === 0
                    ? `<th scope="row">${inline(c)}</th>`
                    : `<td>${inline(c)}</td>`
                )
                .join('')}</tr>`
          )
          .join('')}</tbody>
      </table>
    </div>`,

  callout: (b) => {
    const variant = b.variant || 'tip';
    const label = { tip: 'Tip', warning: 'Watch out', note: 'Note' }[variant] || 'Note';
    return `
      <aside class="callout callout--${esc(variant)}">
        <p class="callout__label">${esc(b.label || label)}</p>
        <p>${inline(b.text)}</p>
      </aside>`;
  },

  diagram: (b) => renderDiagram(b.id, b.caption),

  example: (b) => `
    <figure class="example">
      <figcaption>${esc(b.label || 'Example')}</figcaption>
      <p>${inline(b.text)}</p>
    </figure>`,
};

export function renderBlocks(blocks = []) {
  return blocks
    .map((b) => {
      const fn = renderers[b.type];
      if (!fn) throw new Error(`Unknown block type: "${b.type}"`);
      return fn(b);
    })
    .join('\n');
}
