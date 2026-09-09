// Unit tests for the pure logic behind the generator.
//
// Bias: almost every case here corresponds to a bug that actually shipped.
// A regression test for a real defect is worth more than coverage of code
// that has never broken, so this file is deliberately lopsided toward the
// palette maths, the token emitter and the content guards.
//
// Run with `npm test` (no dependencies — node:test is built in).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { relativeLuminance, contrastRatio } from '../src/lib/contrast.js';
import { THEMES, ACTIVE, validateTheme, themeCss } from '../src/data/themes/index.js';
import { GAMES, PLANNED } from '../src/data/index.js';
import { playerLabel, timeLabel, metaDescription } from '../src/templates/game.js';
import { deckLabel, equipmentTier, seededOrder } from '../src/templates/components.js';
import { validate, checkMeta, checkMarkup } from '../build.js';

const throwsWith = (fn, re) => assert.throws(fn, (e) => re.test(e.message), `expected /${re.source}/`);

describe('contrast maths', () => {
  test('luminance hits the known endpoints', () => {
    assert.equal(relativeLuminance('#000000'), 0);
    assert.equal(relativeLuminance('#ffffff'), 1);
  });

  test('black on white is the maximum 21:1, and the ratio is symmetric', () => {
    assert.equal(contrastRatio('#000000', '#ffffff'), 21);
    assert.equal(contrastRatio('#ffffff', '#000000'), 21);
  });

  test('a colour against itself is 1:1', () => {
    assert.equal(contrastRatio('#4a7c59', '#4a7c59'), 1);
  });

  test('matches a known WCAG reference value', () => {
    // #767676 on white is the canonical "exactly passes AA" grey.
    assert.ok(Math.abs(contrastRatio('#767676', '#ffffff') - 4.54) < 0.02);
  });
});

describe('theme tokens', () => {
  test('every theme passes its own contrast gate', () => {
    for (const key of Object.keys(THEMES)) {
      assert.doesNotThrow(() => validateTheme(key), `theme "${key}" failed the gate`);
    }
  });

  test('the gate actually rejects an inaccessible palette', () => {
    // Guard against the gate silently passing everything, which would make the
    // whole build-time check worthless.
    const broken = structuredClone(THEMES[ACTIVE]);
    broken.light.text = broken.light.bg;
    const saved = THEMES.__probe;
    THEMES.__probe = broken;
    try {
      throwsWith(() => validateTheme('__probe'), /contrast|1\.00|fail/i);
    } finally {
      if (saved === undefined) delete THEMES.__probe; else THEMES.__probe = saved;
    }
  });

  test('digits get their own hyphen in emitted custom properties', () => {
    // Regression: kebab() only split on capitals, so `surface2` emitted as
    // `--surface2` while the stylesheet asked for `--surface-2`. Sixteen
    // backgrounds silently fell back to transparent.
    const css = themeCss(ACTIVE);
    assert.match(css, /--surface-2:/, 'expected --surface-2');
    assert.doesNotMatch(css, /--surface2:/, 'must not emit --surface2');
  });

  test('emits all three theme blocks from one source', () => {
    const css = themeCss(ACTIVE);
    assert.match(css, /^:root\s*\{/m);
    assert.match(css, /:root\[data-theme="dark"\]/);
    assert.match(css, /prefers-color-scheme:\s*dark/);
  });

  test('card ink is a token, not inherited text colour', () => {
    // Card faces stay light in both themes, so ink on them cannot follow --text.
    for (const key of Object.keys(THEMES)) {
      for (const mode of ['light', 'dark']) {
        const t = THEMES[key][mode];
        assert.ok(t.cardInk, `${key}.${mode} missing cardInk`);
        assert.ok(contrastRatio(t.cardInk, t.cardFace) >= 4.5,
          `${key}.${mode}: card ink on card face is only ${contrastRatio(t.cardInk, t.cardFace)}`);
        assert.ok(contrastRatio(t.cardInkRed, t.cardFace) >= 4.5,
          `${key}.${mode}: red card ink on card face is only ${contrastRatio(t.cardInkRed, t.cardFace)}`);
      }
    }
  });
});

describe('labels', () => {
  test('a fixed player count reads as one number, not a range', () => {
    assert.equal(playerLabel({ min: 2, max: 2 }), '2 players');
    assert.equal(playerLabel({ min: 3, max: 5 }), '3–5 players');
  });

  test('time labels collapse when min equals max', () => {
    assert.equal(timeLabel({ min: 20, max: 20 }), '20 min');
    assert.equal(timeLabel({ min: 10, max: 20 }), '10–20 min');
  });

  test('deck label appends a deck note when present', () => {
    assert.equal(deckLabel({ deck: 'standard' }), 'Standard 52-card deck');
    assert.match(deckLabel({ deck: 'standard', deckNote: 'plus jokers' }), /plus jokers$/);
    assert.equal(deckLabel({ deck: 'own' }), 'Its own deck');
  });

  test('equipment tiers split on deck and extras', () => {
    assert.equal(equipmentTier({ deck: 'standard' }).id, 'just-deck');
    assert.equal(equipmentTier({ deck: 'standard', extras: ['pen'] }).id, 'deck-plus');
    assert.equal(equipmentTier({ deck: 'own' }).id, 'own-deck');
  });
});

describe('drill option shuffling', () => {
  test('is deterministic for a given seed', () => {
    // The build must be byte-stable: asset fingerprinting hashes this output,
    // so a fresh random order each build would churn every filename.
    assert.deepEqual(seededOrder('cambio:stick', 4), seededOrder('cambio:stick', 4));
  });

  test('is a real permutation', () => {
    for (const seed of ['a', 'hearts:trick', 'golf:column']) {
      const order = seededOrder(seed, 4);
      assert.deepEqual([...order].sort((a, b) => a - b), [0, 1, 2, 3]);
    }
  });

  test('different drills get different orders', () => {
    const orders = new Set(GAMES.flatMap((g) =>
      (g.drills ?? []).map((d) => seededOrder(`${g.slug}:${d.id}`, d.options.length).join(''))));
    assert.ok(orders.size > 1, 'every drill shuffled identically');
  });

  test('the correct answer is not always in the same position', () => {
    // Regression: all 18 drills were authored correct-answer-first, so you
    // could score full marks by always clicking the left-hand card.
    const positions = GAMES.flatMap((g) => (g.drills ?? []).map((d) => {
      const order = seededOrder(`${g.slug}:${d.id}`, d.options.length);
      return order.findIndex((i) => d.options[i].correct);
    }));
    assert.ok(positions.length >= 10, 'expected a meaningful number of drills');
    assert.ok(new Set(positions).size >= 3,
      `correct answers only landed in ${new Set(positions).size} distinct positions`);
  });
});

describe('meta descriptions', () => {
  test('every game fits inside what Google will display', () => {
    for (const g of GAMES) {
      const d = metaDescription(g);
      assert.ok(d.length <= 160, `${g.slug}: ${d.length} chars — "${d}"`);
      assert.ok(d.length >= 70, `${g.slug}: only ${d.length} chars, too thin`);
    }
  });

  test('descriptions are unique across games', () => {
    const all = GAMES.map(metaDescription);
    assert.equal(new Set(all).size, all.length, 'duplicate meta descriptions');
  });

  test('leads with the game hook rather than boilerplate', () => {
    for (const g of GAMES) assert.ok(metaDescription(g).startsWith(g.tagline), g.slug);
  });
});

describe('game data integrity', () => {
  test('every shipped game validates', () => {
    GAMES.forEach((g, i) => assert.doesNotThrow(() => validate(g, i), g.slug));
  });

  test('slugs are unique and url-safe', () => {
    const slugs = GAMES.map((g) => g.slug);
    assert.equal(new Set(slugs).size, slugs.length, 'duplicate slug');
    for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  test('no planned game duplicates a shipped one', () => {
    const shipped = new Set(GAMES.map((g) => g.name.toLowerCase()));
    for (const p of PLANNED) {
      assert.ok(!shipped.has((p.name ?? p).toLowerCase?.() ?? ''), `${p.name} is already built`);
    }
  });

  test('section ids are unique within a game', () => {
    for (const g of GAMES) {
      const ids = g.sections.map((s) => s.id);
      assert.equal(new Set(ids).size, ids.length, `${g.slug} has duplicate section ids`);
    }
  });

  test('every game covers setup, play and an ending', () => {
    for (const g of GAMES) {
      const ids = g.sections.map((s) => s.id).join(' ');
      assert.match(ids, /setup|deal/, `${g.slug}: no setup section`);
      assert.match(ids, /turn|play|bidding/, `${g.slug}: no play section`);
      assert.match(ids, /win|scor|end|knock/, `${g.slug}: no ending section`);
    }
  });

  test('each drill has exactly one correct option', () => {
    for (const g of GAMES) {
      for (const d of g.drills ?? []) {
        const n = d.options.filter((o) => o.correct).length;
        assert.equal(n, 1, `${g.slug}/${d.id} has ${n} correct options`);
      }
    }
  });

  test('cited sources are https and carry a review date', () => {
    for (const g of GAMES) {
      if (!g.sources) continue;
      assert.match(g.reviewed, /^\d{4}-\d{2}-\d{2}$/, `${g.slug}: bad reviewed date`);
      for (const s of g.sources) {
        assert.ok(s.name, `${g.slug}: source without a name`);
        assert.match(s.url, /^https:\/\//, `${g.slug}: non-https source`);
      }
    }
  });
});

describe('build guards reject what they are meant to', () => {
  const base = () => structuredClone(GAMES[0]);

  test('players.best on a fixed-count game', () => {
    const g = base();
    g.players = { min: 4, max: 4, best: '4' };
    throwsWith(() => validate(g, 0), /players\.note/);
  });

  test('both best and note', () => {
    const g = base();
    g.players = { min: 2, max: 6, best: '4', note: 'partnerships' };
    throwsWith(() => validate(g, 0), /pick one/);
  });

  test('inverted player and time ranges', () => {
    const a = base(); a.players = { min: 6, max: 2 };
    throwsWith(() => validate(a, 0), /players\.min > players\.max/);
    const b = base(); b.time = { min: 40, max: 10 };
    throwsWith(() => validate(b, 0), /time\.min > time\.max/);
  });

  test('a source without an https url', () => {
    const g = base();
    g.sources = [{ name: 'Somewhere', url: 'http://insecure.example' }];
    throwsWith(() => validate(g, 0), /https url/);
  });

  test('an over-long meta description', () => {
    const html = `<meta name="description" content="${'x'.repeat(200)}">`;
    throwsWith(() => checkMeta(html, 'probe'), /over the 160/);
  });

  test('an invalid SVG font weight', () => {
    throwsWith(() => checkMarkup('<text font-weight="650">hi</text>', 'probe'), /multiple of 100/);
    assert.doesNotThrow(() => checkMarkup('<text font-weight="600">hi</text>', 'probe'));
  });

  test('aria-label on an element with no role', () => {
    throwsWith(() => checkMarkup('<span aria-label="Done">x</span>', 'probe'), /names nothing/);
    // Legitimate uses must still pass.
    assert.doesNotThrow(() => checkMarkup('<span role="img" aria-label="Done">x</span>', 'probe'));
    assert.doesNotThrow(() => checkMarkup('<button aria-label="Close">x</button>', 'probe'));
  });
});
