# Card Table

Clear, printable rules for the card games people actually play. Static site,
no dependencies, no tracking, no build tooling beyond Node itself.

Live games: **Cambio**, **Gin Rummy**, **Palace**, **Hearts**, **President**.

## Running it

```bash
npm run build     # renders dist/
npm run serve     # builds, then serves dist/ on http://localhost:4173
```

There is nothing to install. The generator uses only Node's standard library,
so any Node 16+ works (developed against 18.10).

## How it works

```
build.js                  reads data -> renders templates -> writes dist/
src/data/index.js         the game registry (order = homepage order) + roadmap
src/data/games/*.js       one file per game: all rules content lives here
src/templates/            layout.js, home.js, game.js, blocks.js
src/assets/               styles.css, print.css, theme.js, filter.js,
                          scorer.js, page.js — copied to dist/assets verbatim
dist/                     generated output, safe to delete
```

`build.js` validates every game before writing anything and **fails the build**
on a missing field, a duplicate section id, an unknown block type, an
out-of-range player count, or a tag with no display label. A malformed game
cannot ship a half-rendered page.

## Adding a game

1. Copy `src/data/games/cambio.js` to `src/data/games/<slug>.js` — it is the
   most complete reference and exercises every field.
2. Fill it in. Required: `slug`, `name`, `tagline`, `players`, `time`,
   `difficulty`, `deck`, `objective`, `sections`. Optional but expected:
   `aliases`, `keywords`, `tags`, `variations`, `hints`, `faq`, `cheatSheet`,
   `scoring`, `suit`.
3. Import it in `src/data/index.js` and add it to `GAMES`, then remove its
   entry from `PLANNED`.
4. If you use a new `tags` value, add a label for it to `TAG_LABELS` in
   `src/templates/home.js` — the build will tell you if you forget.
5. `npm run build`.

No CSS or HTML changes are needed. Section anchors, the sticky jump nav, the
homepage card, search keywords, the print cheat sheet and the score tracker
are all derived from the data.

### Rules content conventions

Section bodies are arrays of typed blocks rather than HTML strings:

| Block | Shape |
|---|---|
| `p` | `{ type: 'p', text }` |
| `ul` / `ol` | `{ type: 'ul', items: [] }` |
| `table` | `{ type: 'table', headers: [], rows: [[]] }` — first cell of each row becomes a row header |
| `callout` | `{ type: 'callout', variant: 'tip' \| 'warning' \| 'note', text, label? }` |
| `example` | `{ type: 'example', text, label? }` |
| `diagram` | `{ type: 'diagram', id, caption? }` — see below |

`text` and list items support `**bold**`, `*italic*` and `` `code` ``. Everything
is HTML-escaped first, so rules text can contain `<`, `>` and `&` safely.

- Put genuinely contested rules in `variations`, not in the main sections. If
  two reputable sources disagree, that is a house rule, not a fact.
- `keywords` are search-only. Use them for aliases, misspellings and jargon
  you do not want cluttering the filter chips.
- `scoring: null` means no score tracker is rendered and `scorer.js` is not
  loaded (Palace works this way).

## Diagrams

`src/templates/diagram.js` holds hand-built inline SVG diagrams, referenced from
game data by id:

```js
{ type: 'diagram', id: 'cambio-peek', caption: 'The two cards nearest you…' }
```

Current ids, two or three per game — one for the setup you have to picture, one
for the mechanic people get wrong:

| Game | Setup | Mechanic |
|---|---|---|
| Cambio | `cambio-peek` | `cambio-sticking` |
| Gin Rummy | `gin-melds` | `gin-knock`, `gin-layoff` |
| Palace | `palace-layers` | `palace-burn` |
| Hearts | `hearts-passing` | `hearts-trick` |
| President | `president-exchange` | `president-beating` |

An unknown id fails the build and lists the valid ones.

These are deliberately **not** one-per-section. A diagram earns its place only
where prose makes a reader assemble a picture in their head — a card layout, a
rotation, who-hands-what-to-whom. Everything else is better as text.

Notes for adding one:

- Build from the `cardFace` / `cardBack` / `card` primitives so cards look the
  same everywhere. `card(x, y, '7♠', pid)` is face up; `card(x, y, '?', pid)` is
  face down.
- Card faces stay light in **both** themes. A playing card is white, and
  inverting it in dark mode reads as a rendering bug — so `INK` and `RED` are
  fixed values, not themed ones.
- Cards carry a corner index *and* a centre pip, which is what makes overlapped
  groups (`gin-knock`) still readable.
- Size each group by its longest **caption**, not just by its cards. Centred
  text is usually the widest thing in a diagram; `svg()` adds horizontal
  padding, but that only absorbs a few px of font-rendering variance. Centring
  a 76px label over a 46px card overhangs 15px each side — give it a column.
- Watch for labels that merely sit *close*. Three 28px labels 25px apart do not
  overlap but read as one run of text; collapse them into one.
- Diagrams keep natural size and scroll on narrow screens rather than scaling
  down, since shrinking one makes its labels illegible.
- Print hides them: a game page prints as a one-page cheat sheet.

To check geometry after a change, render each diagram and compare the root
`svg.getBBox()` against its `viewBox` — that call *is* transform-aware, whereas
`getBBox()` on an individual element ignores ancestor transforms and will report
nonsense for anything inside a translated group.

## Score tracker

One implementation (`src/assets/scorer.js`) drives every game from the
`scoring` config:

- `mode: 'low'` — lowest total leads and wins (Cambio, Hearts)
- `mode: 'high'` — highest total leads and wins (Gin Rummy, President)
- `target` — a game ends once any player reaches it; the winner is then decided
  by `mode`, which is why crossing 100 in Cambio *loses* you the game

State persists to `localStorage` per game, so a paused game survives a refresh.

## Browser support and degradation

Everything is progressive enhancement over static HTML:

- **No JS**: all rules readable, all games visible, jump nav works (plain
  anchors). The theme toggle and print button stay hidden rather than becoming
  dead controls; the tracker shows a `<noscript>` note.
- **No `localStorage`** (private browsing): theme and scores work for the
  session and fail silently.
- **Dark mode**: follows `prefers-color-scheme`, overridable by the toggle. An
  inline `<head>` snippet applies the stored theme before first paint.
- **Print**: `print.css` reduces a game page to a one-page cheat sheet and the
  homepage to a plain index.

## Deploying

`dist/` is a plain static directory — drop it on Netlify, Vercel, GitHub Pages,
S3 or any static host. No redirects or server config required.
