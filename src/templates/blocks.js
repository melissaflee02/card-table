// Renders the structured `body` blocks used in game data into HTML.
// Keeping rules content as data (not HTML strings) means every game page
// gets identical markup and styling for free.

import { esc } from './escape.js';
import { renderDiagram } from './diagram.js';

export { esc };

// Minimal inline markup so rules text can emphasise a card or a keyword
// without hand-writing tags: **bold**, *italic*, `code`.
const inline = (s) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

const renderers = {
  p: (b) => `<p>${inline(b.text)}</p>`,

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
