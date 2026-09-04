import cambio from './games/cambio.js';
import ginRummy from './games/gin-rummy.js';
import palace from './games/palace.js';
import hearts from './games/hearts.js';
import president from './games/president.js';

// Order here is the order on the homepage and the prev/next pager.
export const GAMES = [cambio, ginRummy, palace, hearts, president];

// Roadmap. Adding a game = write src/data/games/<slug>.js, import it above,
// and delete its entry from this list.
export const PLANNED = [
  // Wave 2 — trick-taking + party classics, all standard 52-card deck.
  { name: 'Spades', note: 'partnership trick-taking' },
  { name: 'Crazy Eights', note: 'shedding' },
  { name: 'Golf', note: '6- and 9-card' },
  { name: 'Spoons', note: 'reflex' },
  { name: 'Cheat', note: 'aka BS' },
  { name: 'Euchre', note: 'trick-taking' },
  { name: 'Cribbage', note: '2-player classic' },

  // Wave 3 — branded games. These need a `deck` value that is not
  // "1 standard 52-card deck", plus a note about what you have to buy.
  { name: 'Uno', note: 'own deck' },
  { name: 'Exploding Kittens', note: 'own deck' },
];
