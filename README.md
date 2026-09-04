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

`text` and list items support `**bold**`, `*italic*` and `` `code` ``. Everything
is HTML-escaped first, so rules text can contain `<`, `>` and `&` safely.

- Put genuinely contested rules in `variations`, not in the main sections. If
  two reputable sources disagree, that is a house rule, not a fact.
- `keywords` are search-only. Use them for aliases, misspellings and jargon
  you do not want cluttering the filter chips.
- `scoring: null` means no score tracker is rendered and `scorer.js` is not
  loaded (Palace works this way).

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
