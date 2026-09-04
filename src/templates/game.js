import { layout } from './layout.js';
import { renderBlocks, esc } from './blocks.js';

export const playerLabel = (p) =>
  p.min === p.max ? `${p.min} players` : `${p.min}–${p.max} players`;

export const timeLabel = (t) =>
  t.min === t.max ? `${t.min} min` : `${t.min}–${t.max} min`;

function statsRow(game) {
  const items = [
    ['Players', playerLabel(game.players) + (game.players.best ? ` (best with ${esc(game.players.best)})` : '')],
    ['Time', timeLabel(game.time)],
    ['Deck', game.deck],
    ['Difficulty', game.difficulty === 'easy' ? 'Easy to learn' : 'Some strategy'],
  ];
  return `<dl class="stats">${items
    .map(([k, v]) => `<div class="stats__item"><dt>${esc(k)}</dt><dd>${v}</dd></div>`)
    .join('')}</dl>`;
}

function sectionNav(entries) {
  return `
  <nav class="anchor-nav" aria-label="Jump to section">
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
    <ol class="hints">${game.hints.map((h) => `<li>${renderBlocks([{ type: 'p', text: h }]).replace(/^<p>|<\/p>$/g, '')}</li>`).join('')}</ol>
  </section>`;
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
        <p>${playerLabel(game.players)} &middot; ${timeLabel(game.time)} &middot; ${esc(game.deck)}</p>
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
      ${statsRow(game)}
    </header>
  </div>

  ${sectionNav(navEntries)}

  <div class="wrap game__body">
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

    ${variationsBlock(game)}
    ${hintsBlock(game)}
    ${faqBlock(game)}
    ${cheatSheetBlock(game)}
    ${trackerBlock(game)}

    <nav class="pager" aria-label="More games">
      ${prev ? `<a class="pager__link" href="${esc(prev.slug)}.html"><span>Previous</span><strong>${esc(prev.name)}</strong></a>` : '<span></span>'}
      ${next ? `<a class="pager__link pager__link--next" href="${esc(next.slug)}.html"><span>Next</span><strong>${esc(next.name)}</strong></a>` : '<span></span>'}
    </nav>
  </div>
</article>`;

  return layout({
    title: `${game.name} rules`,
    description: `How to play ${game.name}${game.aliases?.length ? ` (also called ${game.aliases.join(', ')})` : ''}: setup, turn order, scoring, house rules and a printable cheat sheet. ${playerLabel(game.players)}, ${timeLabel(game.time)}.`,
    body,
    base: '../',
    bodyClass: 'page-game',
    scripts: game.scoring ? ['page.js', 'scorer.js'] : ['page.js'],
  });
}
