import { esc } from './blocks.js';

export const SITE = {
  name: 'Card Table',
  tagline: 'Clear rules for the card games people actually play.',
};

// Set the theme before first paint so a dark-mode user never sees a white flash.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('theme');
if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export function layout({ title, description, body, base = '', scripts = [], bodyClass = '' }) {
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta name="color-scheme" content="light dark">
<link rel="stylesheet" href="${base}assets/theme.css">
<link rel="stylesheet" href="${base}assets/styles.css">
<link rel="stylesheet" href="${base}assets/print.css" media="print">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>&#127183;</text></svg>">
<script>${THEME_BOOT}</script>
</head>
<body${bodyClass ? ` class="${esc(bodyClass)}"` : ''}>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="brand" href="${base}index.html">
      <span class="brand__mark" aria-hidden="true">&#9824;</span>
      <span class="brand__name">${esc(SITE.name)}</span>
    </a>
    <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark theme" hidden>
      <span class="theme-toggle__icon" aria-hidden="true"></span>
      <span class="theme-toggle__text">Theme</span>
    </button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <p>${esc(SITE.name)} — ${esc(SITE.tagline)}</p>
    <p class="site-footer__note">Rules are cross-checked against multiple sources. Where households genuinely differ, we say so under <em>House rules</em> rather than picking a winner.</p>
  </div>
</footer>
<script src="${base}assets/theme.js" defer></script>
${scripts.map((s) => `<script src="${base}assets/${esc(s)}" defer></script>`).join('\n')}
</body>
</html>`;
}
