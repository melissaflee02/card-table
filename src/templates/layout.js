import { esc } from './escape.js';
import { brandMark } from './components.js';

export const SITE = {
  name: 'Deck & Table',
  tagline: 'Clear rules for the card games people actually play.',
  // Canonical origin. Update if the site moves to its own domain — sitemap,
  // canonical tags, Open Graph and JSON-LD all derive from this.
  origin: 'https://deckandtable.com',
  locale: 'en_GB',

  // Contact. Set contactEmail once a domain exists (e.g. 'hello@cardtable.xyz')
  // and every "report a rules problem" link switches to it automatically.
  // Until then the issue tracker is the working route — better a real one than
  // a published address that bounces.
  contactEmail: 'hello@deckandtable.com',
  repo: 'https://github.com/melissaflee02/card-table',

  // Search-engine ownership tokens. A list rather than one value because a
  // domain move needs both properties verified at once: the old github.io
  // prefix keeps reporting history while the new domain warms up, and removing
  // the old token too early un-verifies it.
  verification: [
    { name: 'google-site-verification', content: 'mpw6xEbdUtjOcs0-K2mKdM9s_lyFF9mvX1fqPOdgt2g' },
  ],
};

SITE.issues = `${SITE.repo}/issues/new`;
SITE.contactHref = SITE.contactEmail ? `mailto:${SITE.contactEmail}` : SITE.issues;
SITE.contactLabel = SITE.contactEmail || 'open an issue on GitHub';

// Set the theme before first paint so a dark-mode user never sees a white flash.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('theme');
if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export function layout({
  title, description, body, base = '', scripts = [], bodyClass = '', page = '',
  path = '', jsonLd = null, ogImage: ogImagePath = 'assets/og-card.png', ogImageAlt = '',
  noindex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const canonical = `${SITE.origin}/${path}`.replace(/\/+$/, '/').replace(/([^:])\/\//g, '$1/');
  // Social crawlers do not resolve relative URLs, so this is always absolute.
  // Game pages pass their own card: a link dropped in a group chat should say
  // which game it is, not show the same generic image every time.
  const ogImage = `${SITE.origin}/${ogImagePath}`;
  const ogAlt = ogImageAlt || `${SITE.name} — ${SITE.tagline}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
${SITE.verification.map((v) => `<meta name="${esc(v.name)}" content="${esc(v.content)}">`).join('\n')}
${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${page === 'home' ? 'website' : 'article'}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<meta name="twitter:image:alt" content="${esc(ogAlt)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#18362d" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#f3eedf" media="(prefers-color-scheme: light)">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}assets/apple-touch-icon.png">
<link rel="preload" href="${base}assets/fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/theme.css">
<link rel="stylesheet" href="${base}assets/styles.css">
<link rel="stylesheet" href="${base}assets/print.css" media="print">
<script>${THEME_BOOT}</script>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body${bodyClass ? ` class="${esc(bodyClass)}"` : ''}>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="brand" href="${base}index.html">
      ${brandMark()}
      <span class="brand__name">${esc(SITE.name)}</span>
    </a>
    <nav class="site-nav" aria-label="Main">
      <a href="${base}index.html"${page === 'home' ? ' aria-current="page"' : ''}>All games</a>
    </nav>
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
    <p class="site-footer__note">Rules are cross-checked against sources named on every game page. Where households genuinely differ, we say so under <em>House rules</em> rather than picking a winner.</p>
    <nav class="site-footer__links" aria-label="Site information">
      <a href="${base}about.html">About &amp; editorial policy</a>
      <a href="${base}privacy.html">Privacy</a>
      <a href="${esc(SITE.contactHref)}"${SITE.contactEmail ? '' : ' rel="nofollow noopener noreferrer" target="_blank"'}>Report a rules problem</a>
    </nav>
  </div>
</footer>
<script src="${base}assets/theme.js" defer></script>
${scripts.map((s) => `<script src="${base}assets/${esc(s)}" defer></script>`).join('\n')}
</body>
</html>`;
}
