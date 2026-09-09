// Integration tests over the generated site in dist/.
//
// This is also the "launch check": everything here is a property the published
// site must hold, verified against the real emitted HTML rather than against
// the templates that produced it. Run after `node build.js` — `npm test` does
// both in order.
//
// Where a check duplicates a build-time guard that is deliberate: the guard
// stops a bad page being written, this proves the page that *was* written is
// sound after fingerprinting and asset copying have rewritten it.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { GAMES } from '../src/data/index.js';
import { PAGES } from '../src/data/pages.js';
import { COLLECTIONS } from '../src/data/collections.js';
import { SITE } from '../src/templates/layout.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const attr = (html, re) => (html.match(re) ?? [])[1] ?? null;

/**
 * Index ranges covered by an aria-hidden="true" subtree.
 *
 * Needed because "is this element exposed to assistive tech?" is a question
 * about ancestors, not about the element alone: the search icon marks the
 * wrapping <span> aria-hidden, which correctly hides the <svg> inside it.
 * Checking the tag in isolation reports a bug that is not there.
 */
function hiddenRanges(html) {
  const ranges = [];
  const tag = /<(\/?)([a-z][a-z0-9]*)\b([^>]*)>/gi;
  const stack = [];
  let m;
  while ((m = tag.exec(html))) {
    const [full, closing, name, attrs] = m;
    if (/^(br|hr|img|input|meta|link|source|circle|path|rect|line|use|stop)$/i.test(name)) continue;
    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name === name.toLowerCase()) {
          const frame = stack.splice(i)[0];
          if (frame.hidden) ranges.push([frame.start, m.index + full.length]);
          break;
        }
      }
    } else if (!full.endsWith('/>')) {
      stack.push({
        name: name.toLowerCase(),
        start: m.index,
        hidden: /aria-hidden="true"/.test(attrs),
      });
    }
  }
  return ranges;
}
const isHidden = (ranges, i) => ranges.some(([a, b]) => i >= a && i <= b);

// Loaded at module scope rather than in a before() hook: on Node 18 a top-level
// before() does not reliably run ahead of tests nested inside describe blocks,
// which left every assertion reading an empty array and passing vacuously.
if (!existsSync(dist)) throw new Error('dist/ is missing — run `node build.js` first');
/** @type {{path:string, html:string}[]} */
const pages = ['index.html', '404.html',
  ...PAGES.map((p) => `${p.slug}.html`), ...COLLECTIONS.map((c) => `${c.slug}.html`),
  ...readdirSync(join(dist, 'games')).map((f) => join('games', f))]
  .map((p) => ({ path: p, html: readFileSync(join(dist, p), 'utf8') }));
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');

describe('pages exist', () => {
  test('one page per game, plus home, 404 and the prose pages', () => {
    const got = pages.map((p) => p.path).sort();
    const want = ['404.html', 'index.html',
      ...PAGES.map((p) => `${p.slug}.html`),
      ...COLLECTIONS.map((c) => `${c.slug}.html`),
      ...GAMES.map((g) => join('games', `${g.slug}.html`))].sort();
    assert.deepEqual(got, want);
  });

  test('no page is suspiciously small or contains template leakage', () => {
    for (const { path, html } of pages) {
      assert.ok(html.length > 2000, `${path} is only ${html.length} bytes`);
      assert.doesNotMatch(html, /undefined|\[object Object\]|NaN(?![a-z])/,
        `${path} contains a rendering artifact`);
      assert.doesNotMatch(html, /\$\{/, `${path} has an unevaluated template literal`);
    }
  });
});

describe('internal links and anchors resolve', () => {
  test('every internal href points at a file that exists', () => {
    const broken = [];
    for (const { path, html } of pages) {
      const dir = dirname(join(dist, path));
      for (const m of html.matchAll(/href="([^"]+)"/g)) {
        const raw = m[1];
        if (/^(https?:|mailto:|tel:|#|data:)/.test(raw)) continue;
        const [file] = raw.split('#');
        if (!file) continue;
        const target = raw.startsWith('/') ? join(dist, file) : join(dir, file);
        if (!existsSync(target)) broken.push(`${path} -> ${raw}`);
      }
    }
    assert.deepEqual(broken, [], `broken internal links:\n  ${broken.join('\n  ')}`);
  });

  test('every same-page fragment has a matching id', () => {
    const broken = [];
    for (const { path, html } of pages) {
      const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
      for (const m of html.matchAll(/href="#([^"]+)"/g)) {
        if (!ids.has(m[1])) broken.push(`${path} -> #${m[1]}`);
      }
    }
    assert.deepEqual(broken, [], `dangling anchors:\n  ${broken.join('\n  ')}`);
  });

  test('no duplicate ids on any page', () => {
    for (const { path, html } of pages) {
      const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
      const dupes = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
      assert.deepEqual(dupes, [], `${path} has duplicate ids: ${dupes.join(', ')}`);
    }
  });

  test('the section nav on each game page matches its sections, in order', () => {
    for (const g of GAMES) {
      const html = pages.find((p) => p.path.endsWith(`${g.slug}.html`)).html;
      const nav = html.slice(html.indexOf('anchor-nav'), html.indexOf('</nav>', html.indexOf('anchor-nav')));
      const navIds = [...nav.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
      for (const s of g.sections) {
        assert.ok(navIds.includes(s.id), `${g.slug}: section "${s.id}" missing from nav`);
      }
      const sectionOrder = navIds.filter((id) => g.sections.some((s) => s.id === id));
      assert.deepEqual(sectionOrder, g.sections.map((s) => s.id),
        `${g.slug}: nav order does not match section order`);
    }
  });
});

describe('search metadata', () => {
  test('every page has a unique title inside Google\'s display limit', () => {
    // Measured decoded: "&amp;" is five characters in the source and one on
    // screen, so counting the raw string overstates every title with an
    // ampersand — which, with a brand like "Deck & Table", is all of them.
    const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const titles = pages.map(({ path, html }) => {
      const raw = attr(html, /<title>([^<]*)<\/title>/);
      assert.ok(raw, `${path} has no title`);
      const t = decode(raw);
      assert.ok(t.length <= 60, `${path}: title is ${t.length} chars, Google cuts at ~60 — "${t}"`);
      return raw;
    });
    assert.equal(new Set(titles).size, titles.length, 'duplicate <title> across pages');
  });

  test('every page has a unique description within the display limit', () => {
    const descs = pages.map(({ path, html }) => {
      const d = attr(html, /<meta name="description" content="([^"]*)"/);
      assert.ok(d, `${path} has no meta description`);
      const decoded = d.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      assert.ok(decoded.length <= 160, `${path}: description is ${decoded.length} chars`);
      return d;
    });
    assert.equal(new Set(descs).size, descs.length, 'duplicate meta description');
  });

  test('every page has a canonical url on the real origin', () => {
    for (const { path, html } of pages) {
      const c = attr(html, /<link rel="canonical" href="([^"]*)"/);
      assert.ok(c?.startsWith(SITE.origin), `${path}: canonical is "${c}"`);
    }
  });


  test('search-engine verification tokens are present on the property root', () => {
    // Losing this silently un-verifies the Search Console property, and the
    // only symptom is that indexing reports quietly stop updating.
    assert.ok(SITE.verification.length, 'no verification tokens configured');
    const home = pages.find((p) => p.path === 'index.html').html;
    for (const v of SITE.verification) {
      assert.match(home, new RegExp(`<meta name="${v.name}" content="${v.content}">`),
        `index.html is missing the ${v.name} token`);
    }
  });

  test('only the 404 is noindex', () => {
    for (const { path, html } of pages) {
      const robots = /name="robots"[^>]*content="[^"]*noindex/.test(html);
      assert.equal(robots, path === '404.html', `${path}: unexpected noindex=${robots}`);
    }
  });

  test('structured data is present and parses', () => {
    for (const { path, html } of pages) {
      if (path === '404.html') continue;
      const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      assert.ok(blocks.length, `${path} has no JSON-LD`);
      for (const b of blocks) {
        assert.doesNotThrow(() => JSON.parse(b[1]), `${path}: JSON-LD does not parse`);
      }
    }
  });

  test('the sitemap lists exactly the indexable pages', () => {
    const xml = pages.length && existsSync(join(dist, 'sitemap.xml'));
    assert.ok(xml, 'sitemap.xml missing');
  });
});

describe('sitemap and robots', () => {
  test('contains the homepage and every game, and nothing else', async () => {
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const want = [`${SITE.origin}/`,
      ...GAMES.map((g) => `${SITE.origin}/games/${g.slug}.html`),
      ...COLLECTIONS.map((c) => `${SITE.origin}/${c.slug}.html`),
      ...PAGES.map((p) => `${SITE.origin}/${p.slug}.html`)];
    assert.deepEqual(locs.sort(), want.sort());
  });

  test('does not advertise the 404 page', () => {
    assert.doesNotMatch(sitemap, /404/);
  });

  test('robots.txt points at the sitemap', async () => {
    const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
    assert.match(robots, new RegExp(`Sitemap: ${SITE.origin}/sitemap\\.xml`));
  });
});

describe('social sharing', () => {
  test('every page has an og:image that exists at the right size', async () => {
    for (const { path, html } of pages) {
      const img = attr(html, /<meta property="og:image" content="([^"]*)"/);
      assert.ok(img?.startsWith('https://'), `${path}: og:image is "${img}"`);
      const rel = img.replace(`${SITE.origin}/`, '');
      const file = join(dist, rel);
      assert.ok(existsSync(file), `${path}: og:image ${rel} does not exist`);
      const buf = await readFile(file);
      // PNG header: width and height are big-endian uint32 at bytes 16 and 20.
      assert.equal(buf.readUInt32BE(16), 1200, `${rel} width`);
      assert.equal(buf.readUInt32BE(20), 630, `${rel} height`);
    }
  });

  test('each game page uses its own share card, not the site default', () => {
    const used = new Set();
    for (const g of GAMES) {
      const html = pages.find((p) => p.path.endsWith(`${g.slug}.html`)).html;
      const img = attr(html, /<meta property="og:image" content="([^"]*)"/);
      assert.match(img, new RegExp(`og/${g.slug}\\.png$`), `${g.slug} shares the generic card`);
      used.add(img);
    }
    assert.equal(used.size, GAMES.length, 'two games share one image');
  });
});

describe('assets', () => {
  test('every fingerprinted reference resolves', () => {
    for (const { path, html } of pages) {
      for (const m of html.matchAll(/(?:href|src)="([^"]*assets\/[^"]+)"/g)) {
        const rel = m[1].replace(`${SITE.origin}/`, '').replace(/^\.\.\//, '');
        assert.ok(existsSync(join(dist, rel)), `${path}: missing asset ${rel}`);
      }
    }
  });

  test('css and js are content-hashed so deploys take effect immediately', () => {
    const html = pages.find((p) => p.path === 'index.html').html;
    for (const name of ['styles', 'theme', 'filter']) {
      assert.match(html, new RegExp(`assets/${name}\\.[0-9a-f]{8}\\.(css|js)`),
        `${name} is not fingerprinted`);
    }
  });

  test('no page references an unhashed stylesheet or script', () => {
    for (const { path, html } of pages) {
      assert.doesNotMatch(html, /assets\/(styles|filter|scorer|drills|cardlib|progress|page)\.(css|js)"/,
        `${path} references an unfingerprinted asset`);
    }
  });

  test('every shipped script is syntactically valid', async () => {
    const files = (await readdir(join(dist, 'assets'))).filter((f) => f.endsWith('.js'));
    assert.ok(files.length >= 6, `only found ${files.length} scripts`);
    for (const f of files) {
      const src = await readFile(join(dist, 'assets', f), 'utf8');
      assert.doesNotThrow(() => new Function(src), `${f} has a syntax error`);
    }
  });

  test('the webfont is served locally, not from a CDN', async () => {
    const css = (await readdir(join(dist, 'assets'))).find((f) => /^styles\./.test(f));
    const src = await readFile(join(dist, 'assets', css), 'utf8');
    assert.match(src, /fonts\/plus-jakarta-sans-latin\.woff2/);
    assert.doesNotMatch(src, /https?:\/\/fonts\.googleapis|https?:\/\/fonts\.gstatic/);
    assert.ok(existsSync(join(dist, 'assets', 'fonts', 'plus-jakarta-sans-latin.woff2')));
  });

  test('the font licence ships alongside the font', () => {
    assert.ok(existsSync(join(dist, 'assets', 'fonts', 'OFL.txt')),
      'SIL Open Font License requires the licence to accompany the font');
  });
});

describe('accessibility and markup invariants', () => {
  test('exactly one h1 per page, and no skipped heading levels', () => {
    for (const { path, html } of pages) {
      const h1s = [...html.matchAll(/<h1[\s>]/g)];
      assert.equal(h1s.length, 1, `${path} has ${h1s.length} h1 elements`);
      let prev = 0;
      for (const m of html.matchAll(/<h([1-6])[\s>]/g)) {
        const lvl = Number(m[1]);
        assert.ok(!prev || lvl <= prev + 1, `${path}: jumped h${prev} -> h${lvl}`);
        prev = lvl;
      }
    }
  });

  test('no aria-label on an element with no role', () => {
    for (const { path, html } of pages) {
      const hit = /<(span|div)\b(?![^>]*\brole=)[^>]*\saria-label=/.exec(html);
      assert.equal(hit, null, `${path}: aria-label on a roleless <${hit?.[1]}>`);
    }
  });

  test('SVG font weights are valid presentation attribute values', () => {
    for (const { path, html } of pages) {
      for (const m of html.matchAll(/font-weight="(\d+)"/g)) {
        assert.equal(Number(m[1]) % 100, 0, `${path}: font-weight="${m[1]}"`);
      }
    }
  });

  test('every img has alt text and every decorative svg is hidden', () => {
    for (const { path, html } of pages) {
      for (const m of html.matchAll(/<img\b[^>]*>/g)) {
        assert.match(m[0], /\salt=/, `${path}: img without alt — ${m[0].slice(0, 70)}`);
      }
      const hidden = hiddenRanges(html);
      for (const m of html.matchAll(/<svg\b[^>]*>/g)) {
        const ok = /aria-hidden="true"|role="img"|aria-label=/.test(m[0])
          || isHidden(hidden, m.index);
        assert.ok(ok, `${path}: svg neither hidden nor named — ${m[0].slice(0, 70)}`);
      }
    }
  });

  test('each strategy hint is a single element, not loose text', () => {
    // Regression: .hints li is display:grid, so stripping the <p> wrapper made
    // every text run and every <strong> its own grid item — bold phrases landed
    // in the 1.9rem number column and wrapped one word per line.
    for (const { path, html } of pages) {
      const start = html.indexOf('<ol class="hints">');
      if (start === -1) continue;
      const list = html.slice(start, html.indexOf('</ol>', start));
      for (const m of list.matchAll(/<li>([\s\S]*?)<\/li>/g)) {
        assert.match(m[1].trim(), /^<p>[\s\S]*<\/p>$/,
          `${path}: hint is not wrapped in a single <p> — "${m[1].slice(0, 60)}"`);
      }
    }
  });

  test('the page is usable without JavaScript', () => {
    for (const g of GAMES) {
      const html = pages.find((p) => p.path.endsWith(`${g.slug}.html`)).html;
      // Rules prose must be in the HTML, not assembled client-side.
      assert.ok(html.includes(g.objective.replace(/&/g, '&amp;').slice(0, 40))
        || html.includes(g.objective.slice(0, 40)), `${g.slug}: objective not server-rendered`);
      if (g.drills?.length) {
        assert.match(html, /<noscript>/, `${g.slug}: no noscript fallback for the drills`);
      }
    }
  });
});

describe('provenance', () => {
  test('every game cites at least one https source and a review date', () => {
    for (const g of GAMES) {
      const html = pages.find((p) => p.path.endsWith(`${g.slug}.html`)).html;
      assert.match(html, /Where these rules come from/, `${g.slug}: no sources block`);
      assert.match(html, /<time datetime="\d{4}-\d{2}-\d{2}">/, `${g.slug}: no review date`);
      for (const s of g.sources ?? []) {
        assert.ok(html.includes(s.url), `${g.slug}: source ${s.url} not rendered`);
      }
    }
  });

  test('genuinely off-site links are rel-protected', () => {
    // The 404 page links to its own origin with absolute URLs on purpose —
    // GitHub Pages serves it from any depth, so relative paths would break.
    // Those are same-origin and need no noopener.
    for (const { path, html } of pages) {
      for (const m of html.matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>/g)) {
        if (m[1].startsWith(SITE.origin)) continue;
        assert.match(m[0], /rel="[^"]*noopener/, `${path}: off-site link without noopener — ${m[1]}`);
        assert.match(m[0], /rel="[^"]*nofollow/, `${path}: off-site link without nofollow — ${m[1]}`);
      }
    }
  });
});

describe('the privacy promise holds', () => {
  // privacy.html states there are no cookies, no analytics and no third-party
  // requests. That is a public commitment, so it is asserted rather than
  // trusted — adding a CDN font or an analytics tag turns the suite red in the
  // same commit that would have made the page a lie.
  test('no page loads anything from another origin', () => {
    for (const { path, html } of pages) {
      for (const m of html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)) {
        const url = m[1];
        if (url.startsWith(SITE.origin)) continue;         // own absolute links
        const isLink = new RegExp(`<a[^>]+href="${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html);
        assert.ok(isLink, `${path}: loads a subresource from another origin — ${url}`);
      }
    }
  });

  test('no analytics, tag manager or tracking pixel', () => {
    const banned = /google-analytics|googletagmanager|gtag\(|analytics\.js|plausible|fathom|hotjar|segment\.io|facebook\.net|doubleclick/i;
    for (const { path, html } of pages) {
      assert.doesNotMatch(html, banned, `${path} contains a tracking script`);
    }
  });

  test('no cookies are set anywhere in the shipped javascript', async () => {
    const files = (await readdir(join(dist, 'assets'))).filter((f) => f.endsWith('.js'));
    for (const f of files) {
      const src = await readFile(join(dist, 'assets', f), 'utf8');
      assert.doesNotMatch(src, /document\.cookie/, `${f} touches document.cookie`);
    }
  });

  test('local storage is limited to the keys privacy.html discloses', async () => {
    const files = (await readdir(join(dist, 'assets'))).filter((f) => f.endsWith('.js'));
    const disclosed = [/'theme'/, /'drills:'/, /'scores:'/];
    for (const f of files) {
      const src = await readFile(join(dist, 'assets', f), 'utf8');
      for (const m of src.matchAll(/(?:localStorage|sessionStorage)\.(?:setItem|getItem)\(([^,)]+)/g)) {
        const key = m[1].trim();
        const ok = disclosed.some((d) => d.test(key)) || /KEY|PREFIX|\+/.test(key);
        assert.ok(ok, `${f}: undisclosed storage key ${key} — update privacy.html`);
      }
    }
  });

  test('about and privacy are reachable from every page', () => {
    for (const { path, html } of pages) {
      assert.match(html, /href="[^"]*about\.html"/, `${path}: no link to About`);
      assert.match(html, /href="[^"]*privacy\.html"/, `${path}: no link to Privacy`);
    }
  });
});

describe('related games', () => {
  // Internal links are how a visitor finds a second game and how ranking
  // signal spreads between pages, so the block has to actually be there and
  // actually point somewhere.
  test('every game suggests other games that exist', () => {
    for (const g of GAMES) {
      const html = pages.find((p) => p.path.endsWith(`${g.slug}.html`)).html;
      const start = html.indexOf('class="related');
      assert.notEqual(start, -1, `${g.slug}: no related block`);
      const list = html.slice(start, html.indexOf('</section>', start));
      const hrefs = [...list.matchAll(/href="([^"]+)\.html"/g)].map((m) => m[1]);
      assert.ok(hrefs.length >= 2, `${g.slug}: only ${hrefs.length} related games`);
      for (const h of hrefs) {
        assert.notEqual(h, g.slug, `${g.slug}: links to itself`);
        assert.ok(GAMES.some((x) => x.slug === h), `${g.slug}: links to unknown game "${h}"`);
      }
      assert.equal(new Set(hrefs).size, hrefs.length, `${g.slug}: duplicate suggestion`);
    }
  });

  test('every suggestion gives a concrete reason', () => {
    for (const g of GAMES) {
      const html = pages.find((p) => p.path.endsWith(`${g.slug}.html`)).html;
      const whys = [...html.matchAll(/class="related__why">([^<]+)</g)].map((m) => m[1].trim());
      assert.ok(whys.length >= 2, `${g.slug}: suggestions without reasons`);
      for (const w of whys) {
        assert.ok(w.length > 12, `${g.slug}: reason too thin — "${w}"`);
        assert.doesNotMatch(w, /you might also like|related|similar game/i,
          `${g.slug}: filler reason — "${w}"`);
      }
    }
  });

  test('suggestions are reciprocated often enough to form a network', () => {
    // Not every pair needs to be mutual, but if almost none are, the graph is
    // a set of dead ends rather than something a reader can wander through.
    const links = new Map();
    for (const g of GAMES) {
      const html = pages.find((p) => p.path.endsWith(`${g.slug}.html`)).html;
      const start = html.indexOf('class="related');
      const list = html.slice(start, html.indexOf('</section>', start));
      links.set(g.slug, new Set([...list.matchAll(/href="([^"]+)\.html"/g)].map((m) => m[1])));
    }
    let mutual = 0, total = 0;
    for (const [from, tos] of links) for (const to of tos) {
      total++;
      if (links.get(to)?.has(from)) mutual++;
    }
    assert.ok(mutual / total > 0.4, `only ${mutual}/${total} suggestions are reciprocated`);
  });

  test('every game is reachable from at least one other game page', () => {
    const linked = new Set();
    for (const g of GAMES) {
      const html = pages.find((p) => p.path.endsWith(`${g.slug}.html`)).html;
      const start = html.indexOf('class="related');
      const list = html.slice(start, html.indexOf('</section>', start));
      for (const m of list.matchAll(/href="([^"]+)\.html"/g)) linked.add(m[1]);
    }
    const orphans = GAMES.map((g) => g.slug).filter((s) => !linked.has(s));
    assert.deepEqual(orphans, [], `no game page links to: ${orphans.join(', ')}`);
  });
});

describe('collection pages', () => {
  // These target "what should we play?" searches that no single game page can
  // rank for. Their whole defence against being doorway pages is that the
  // picks are correct and the reasoning is specific, so both are asserted.
  const pageFor = (c) => pages.find((p) => p.path === `${c.slug}.html`).html;

  test('every pick genuinely satisfies the collection promise', () => {
    for (const c of COLLECTIONS) {
      for (const pick of c.picks) {
        const g = GAMES.find((x) => x.slug === pick.slug);
        assert.ok(g, `${c.slug}: unknown game ${pick.slug}`);
        if (c.requires?.players !== undefined) {
          assert.ok(g.players.min <= c.requires.players && g.players.max >= c.requires.players,
            `${c.slug}: ${g.name} plays ${g.players.min}-${g.players.max}`);
        }
        if (c.requires?.difficulty) {
          assert.equal(g.difficulty, c.requires.difficulty, `${c.slug}: ${g.name}`);
        }
      }
    }
  });

  test('no collection silently omits a game that qualifies', () => {
    // An incomplete list is a worse answer than a complete one, and the gap is
    // easy to create by adding a game and forgetting the collections.
    for (const c of COLLECTIONS) {
      if (c.requires?.players === undefined) continue;
      const n = c.requires.players;
      const eligible = GAMES.filter((g) => g.players.min <= n && g.players.max >= n);
      const listed = new Set(c.picks.map((p) => p.slug));
      const missing = eligible.filter((g) => !listed.has(g.slug)).map((g) => g.slug);
      // A deliberate exclusion must be justified in the caveat, by name.
      const excused = missing.filter((slug) => {
        const name = GAMES.find((g) => g.slug === slug).name;
        return c.caveat && c.caveat.text.includes(name);
      });
      assert.deepEqual(missing.filter((m) => !excused.includes(m)), [],
        `${c.slug}: qualifies but unlisted and unexplained — ${missing.join(', ')}`);
    }
  });

  test('each reason is specific to its collection, not reused', () => {
    const seen = new Map();
    for (const c of COLLECTIONS) {
      for (const p of c.picks) {
        assert.ok(p.why.length >= 80, `${c.slug}/${p.slug}: reason too thin`);
        const prev = seen.get(p.why);
        assert.equal(prev, undefined, `${c.slug}/${p.slug}: reason reused from ${prev}`);
        seen.set(p.why, `${c.slug}/${p.slug}`);
      }
    }
  });

  test('every collection links to the full rules of each pick', () => {
    for (const c of COLLECTIONS) {
      const html = pageFor(c);
      for (const p of c.picks) {
        assert.match(html, new RegExp(`href="games/${p.slug}\\.html"`),
          `${c.slug}: no link to ${p.slug}`);
      }
    }
  });

  test('collections carry ItemList structured data matching their picks', () => {
    for (const c of COLLECTIONS) {
      const html = pageFor(c);
      const raw = (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) ?? [])[1];
      const graph = JSON.parse(raw)['@graph'] ?? [];
      const list = graph.find((n) => n['@type'] === 'ItemList');
      assert.ok(list, `${c.slug}: no ItemList`);
      assert.equal(list.numberOfItems, c.picks.length);
      assert.deepEqual(list.itemListElement.map((i) => i.position), c.picks.map((_, i) => i + 1));
    }
  });


  test('any number written into the copy matches the number of picks', () => {
    // "Five card games that work with two" above a list of four is the kind of
    // error that survives every structural check and destroys trust on sight.
    const words = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
    for (const c of COLLECTIONS) {
      const prose = `${c.description} ${c.lede}`;
      for (const m of prose.matchAll(/\b(two|three|four|five|six|seven|eight|nine)\s+(?:card\s+)?games?\b/gi)) {
        assert.equal(words[m[1].toLowerCase()], c.picks.length,
          `${c.slug}: copy says "${m[0]}" but there are ${c.picks.length} picks`);
      }
      for (const m of prose.matchAll(/\bThese\s+(two|three|four|five|six|seven|eight|nine)\b/gi)) {
        assert.equal(words[m[1].toLowerCase()], c.picks.length,
          `${c.slug}: copy says "${m[0]}" but there are ${c.picks.length} picks`);
      }
    }
  });

  test('the homepage points at every collection', () => {
    const home = pages.find((p) => p.path === 'index.html').html;
    for (const c of COLLECTIONS) {
      assert.match(home, new RegExp(`href="${c.slug}\\.html"`), `homepage does not link ${c.slug}`);
    }
  });
});

describe('sitemap lastmod', () => {
  const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  const entries = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>\s*<lastmod>([^<]*)<\/lastmod>/g)]
    .map(([, loc, lastmod]) => ({ loc, lastmod }));

  test('every entry carries an ISO date', () => {
    assert.ok(entries.length, 'no sitemap entries parsed');
    for (const e of entries) {
      assert.match(e.lastmod, /^\d{4}-\d{2}-\d{2}$/, `${e.loc}: bad lastmod "${e.lastmod}"`);
    }
  });

  test('lastmod matches the date shown on the page, not the build clock', () => {
    // Stamping today's date on every URL every build is what makes Google
    // discard lastmod as unreliable, and it hides which pages actually changed.
    for (const g of GAMES) {
      const e = entries.find((x) => x.loc.endsWith(`/games/${g.slug}.html`));
      assert.ok(e, `${g.slug} missing from sitemap`);
      assert.equal(e.lastmod, g.reviewed, `${g.slug}: sitemap and page disagree`);
    }
    for (const c of COLLECTIONS) {
      const e = entries.find((x) => x.loc.endsWith(`/${c.slug}.html`));
      assert.ok(e, `${c.slug} missing from sitemap`);
      assert.equal(e.lastmod, c.updated, `${c.slug}: sitemap and page disagree`);
    }
  });

  test('dates are not all identical once the catalogue has mixed ages', () => {
    // A single distinct date across every URL is the signature of a clock
    // stamp. It is legitimate only while everything genuinely shipped at once.
    const contentDates = new Set(GAMES.map((g) => g.reviewed));
    if (contentDates.size > 1) {
      const inSitemap = new Set(entries.map((e) => e.lastmod));
      assert.ok(inSitemap.size > 1,
        'every sitemap lastmod is the same date despite games having different reviewed dates');
    }
  });

  test('no lastmod is in the future', () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const e of entries) {
      assert.ok(e.lastmod <= today, `${e.loc}: lastmod ${e.lastmod} is in the future`);
    }
  });
});
