import cambio from './games/cambio.js';
import ginRummy from './games/gin-rummy.js';
import palace from './games/palace.js';
import hearts from './games/hearts.js';
import president from './games/president.js';
import spades from './games/spades.js';
import crazyEights from './games/crazy-eights.js';
import golf from './games/golf.js';
import cheat from './games/cheat.js';
import euchre from './games/euchre.js';
import cribbage from './games/cribbage.js';
import rummy500 from './games/rummy-500.js';
import spoons from './games/spoons.js';
import egyptianRatscrew from './games/egyptian-ratscrew.js';
import kingsInTheCorner from './games/kings-in-the-corner.js';

// Order here is the order on the homepage and the prev/next pager.
export const GAMES = [
  cambio, ginRummy, palace, hearts, president,
  spades, crazyEights, golf, cheat, euchre, cribbage, rummy500, spoons, egyptianRatscrew, kingsInTheCorner,
];

// Roadmap. Adding a game = write src/data/games/<slug>.js, import it above,
// and delete its entry from this list.
export const PLANNED = [
  // Wave 2 remainder — standard 52-card deck.
  { name: 'Go Fish', note: 'matching' },
  { name: 'War', note: 'pure luck' },

  // Wave 3 — gambling games, standard deck.
  { name: 'Blackjack', note: 'casino classic' },
  { name: "Texas Hold'em", note: 'poker' },

  // Wave 4 — branded games. These need a `deck` value that is not
  // "1 standard 52-card deck", plus a note about what you have to buy.
  { name: 'Uno', note: 'own deck' },
  { name: 'Exploding Kittens', note: 'own deck' },
];
