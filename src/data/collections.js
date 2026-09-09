// Collection pages: "what should we play?" rather than "how does X work?".
//
// These exist because the two questions are different searches. Someone with
// three people and twenty minutes cannot be helped by a page about Hearts —
// they do not yet know they want Hearts. No individual game page can rank for
// "card games for 3 players", and a filtered list with no opinion in it is a
// doorway page. So every pick carries a reason written for *this* collection,
// and where a game technically qualifies but plays badly, that is said out
// loud rather than quietly omitted.
//
// `pick.why` must be specific to the collection. If the same sentence would
// work on another page, it is not pulling its weight.

const UPDATED = '2026-09-09';

export const COLLECTIONS = [
  {
    slug: 'card-games-for-two-players',
    title: 'Card Games for Two Players',
    heading: 'The best card games for two players',
    description:
      'Six card games that genuinely work with two people — what each one is good at, how long it takes, and which to learn first.',
    lede: 'Most card games are built for a table. These six are good with exactly two, and two of them are among the best two-player games there are.',
    updated: UPDATED,
    // Every pick is checked against this at build time.
    requires: { players: 2 },
    intro: [
      {
        type: 'p',
        text: 'Two-player card games are their own problem. Games built around a full table lose the thing that makes them work: with two people there is no passing, no alliances, no reading the table, and any card that targets "another player" only has one place to go.',
      },
      {
        type: 'p',
        text: 'So the games that succeed at two tend to be ones where the interest comes from **hidden information and timing** rather than from the crowd. Sorted by how well they hold up.',
      },
    ],
    picks: [
      {
        slug: 'gin-rummy',
        verdict: 'Start here',
        why: 'The only game on this list designed for two rather than merely tolerating it, and it shows. Every card you take from the discard pile tells your opponent what you are collecting, so the whole game is a slow negotiation over information. Nothing is diluted by the player count because the player count *is* two.',
      },
      {
        slug: 'cribbage',
        verdict: 'The one to learn if you will play it often',
        why: 'The deepest game here by a distance, and built for exactly two. Every discard is a real decision because two of your six cards go into a hand your opponent may end up scoring. The only pick on this list that wants a board — though pen and paper, or the tracker on its page, does the job.',
      },
      {
        slug: 'rummy-500',
        verdict: 'The forgiving alternative to Gin',
        why: 'At two players you each get thirteen cards and the discard pile grows deep, which is exactly where this game is interesting — you can reach down into it for a card you can use. Looser and more forgiving than Gin Rummy, and a better first rummy if neither of you has played one.',
      },
      {
        slug: 'golf',
        verdict: 'Best if you want something lighter',
        why: 'Works well at two because the layout in front of you is the entire game — there is nothing another player could have been doing that you are missing. Nine short rounds also means a bad hand never costs you the evening.',
      },
      {
        slug: 'cambio',
        verdict: 'Good, with one caveat',
        why: 'The memory and the sticking still work perfectly with two. The caveat is the power cards: spying and blind-switching only have one possible target, so the guesswork of choosing a victim disappears. Still fun, slightly flatter.',
      },
      {
        slug: 'crazy-eights',
        verdict: 'Fine, and fast',
        why: 'Deal seven each instead of five and it becomes a denial game — you are watching which suit your opponent keeps drawing for and refusing to play it. Shallower than the others here, but it takes ten minutes and needs no explanation.',
      },
    ],
    caveat: {
      title: 'One to avoid at two',
      text: '**Palace** technically allows two players and we would not recommend it. Picking up the pile is the main way the game punishes you, and with one opponent there is nobody to spread that pain around — it turns into two people alternately eating a large pile of cards.',
    },
    outro: [
      {
        type: 'p',
        text: 'Pick by how much you want to invest. **Gin Rummy** you can learn in five minutes and it stays interesting for years. **Cribbage** takes a couple of hands before the scoring clicks, and then outlasts everything else here — it is still played competitively four hundred years on.',
      },
    ],
  },

  {
    slug: 'card-games-for-3-players',
    title: 'Card Games for 3 Players',
    heading: 'Card games that actually work with three',
    description:
      'Three is the awkward number for card games. Eight that genuinely work with three players, including which ones need a card removed from the deck first.',
    lede: 'Three is the awkward number. Partnership games are out, and a lot of classics quietly assume four. These eight are fine with three — one of them needs a card removed first.',
    updated: UPDATED,
    requires: { players: 3 },
    intro: [
      {
        type: 'p',
        text: 'Three players breaks more games than any other number. Anything with partnerships needs four. Anything that deals the whole deck evenly wants a player count that divides 52. And in trick-taking games, three players makes it much easier to track what everyone holds, which drains the tension.',
      },
      {
        type: 'p',
        text: 'These six survive it. Where a game needs an adjustment for three, it is listed here rather than buried in the rules.',
      },
    ],
    picks: [
      {
        slug: 'hearts',
        verdict: 'Start here — but remove the 2♦ first',
        why: 'Hearts is genuinely good at three once you take the **2 of diamonds** out, leaving 51 cards and 17 each. The passing phase still works, the Queen of Spades is still terrifying, and with one fewer player it is easier to track who is collecting hearts — which makes stopping a moon shot a real skill rather than luck.',
      },
      {
        slug: 'cheat',
        verdict: 'Best for talkers',
        why: 'Three is the minimum and it plays sharper than you would expect: with fewer people between turns, the same rank comes back around fast, so you are forced into lies more often. Everyone is watching everyone, and there is nowhere to hide.',
      },
      {
        slug: 'palace',
        verdict: 'Best for chaos',
        why: 'Three is inside the sweet spot. The pile builds fast enough to hurt, there is still someone to dump a pick-up on, and the face-down endgame produces the same disasters it does with five.',
      },
      {
        slug: 'rummy-500',
        verdict: 'Best if you want a longer sit-down',
        why: 'Three is a good number for it: enough players that the discard pile builds up between your turns, few enough that one deck is plenty. It is also the only game here you can lay cards onto other people\'s melds, which keeps you watching the table rather than just your hand.',
      },
      {
        slug: 'cambio',
        verdict: 'Good memory game for three',
        why: 'At three the power cards finally have a real choice of target — the flatness that hurts the two-player game disappears. Rounds stay short, so a bad memory costs you ten minutes rather than an hour.',
      },
      {
        slug: 'golf',
        verdict: 'Quiet and low-conflict',
        why: 'Nothing in Golf depends on the number of opponents; you are mostly playing against your own layout. That makes three exactly as good as four, and it is the calmest game here if you want to talk while you play.',
      },
      {
        slug: 'spoons',
        verdict: 'Works at three, but wants more',
        why: 'Three players and two spoons is a real game and takes about a minute to teach. It is included with a caveat: the scramble is the whole point, and with only one person missing out each round there is much less of one. If a fourth turns up, play this.',
      },
      {
        slug: 'crazy-eights',
        verdict: 'The no-explanation option',
        why: 'Three is enough for the suit-changing to matter — you can strand the player after you in a suit they clearly do not hold. Takes about a minute to teach to someone who has never played a card game.',
      },
    ],
    outro: [
      {
        type: 'p',
        text: 'If nobody has played before, start with Crazy Eights and move to Cheat once the group is warmed up. If everyone knows their way around a deck, Hearts is the one worth the setup.',
      },
    ],
  },

  {
    slug: 'card-games-for-large-groups',
    title: 'Card Games for Large Groups',
    heading: 'Card games for six or more',
    description:
      'Card games that hold up with six, seven or eight players — including which ones need a second deck and which get slow at the top of their range.',
    lede: 'Most card games quietly stop working above five. These seven handle a crowd — two of them all the way to eight.',
    updated: UPDATED,
    requires: { players: 6 },
    intro: [
      {
        type: 'p',
        text: 'Two things break at six players. Hands get short, because one deck only holds 52 cards — and the wait between your turns gets long enough that people stop paying attention.',
      },
      {
        type: 'p',
        text: 'The games below solve one or both: either everyone stays involved between turns, or the turns are so quick that the lap goes by fast. Listed by how high they comfortably go.',
      },
    ],
    picks: [
      {
        slug: 'spoons',
        verdict: 'Start here — up to 10',
        why: 'The only game here with no turns at all: everyone passes cards at the same time, continuously, so nobody is ever sat waiting. It scales further than anything else on this list and gets better the more people are reaching for the same spoon. Bring spoons — one fewer than there are players.',
      },
      {
        slug: 'cheat',
        verdict: 'Also excellent — up to 8',
        why: 'The only game here where you are fully involved on other people’s turns, because anyone may call at any time. A big table makes it better, not worse: more people means more claims to doubt and a bigger pile to inflict on whoever gets caught.',
      },
      {
        slug: 'crazy-eights',
        verdict: 'Up to 8, with a caveat',
        why: 'Handles eight on one deck, though hands get thin — deal five and expect short rounds. Add a second deck if you are at seven or eight regularly. Turns are fast, so even a full table comes back to you quickly.',
      },
      {
        slug: 'president',
        verdict: 'Best at 5–6',
        why: 'Built for a crowd: the whole point is the social ranking, which needs enough people to have a middle. Seven works but hands get short and the card exchange starts to decide too much. This is the one to play if the group is staying for several rounds.',
      },
      {
        slug: 'rummy-500',
        verdict: 'Up to 8, but bring a second deck',
        why: 'Handles a big table better than most, because laying off onto other people\'s melds gives you something to think about while you wait. Above four players you need two decks shuffled together — one deals too thin and the discard pile never gets deep enough to matter.',
      },
      {
        slug: 'palace',
        verdict: 'Up to 6, then add a deck',
        why: 'Six is the ceiling on one deck. It stays fun because the pile grows faster with more players, so pick-ups are genuinely punishing — but above six you will be waiting a while between turns.',
      },
      {
        slug: 'cambio',
        verdict: 'Up to 6, if the group is patient',
        why: 'Sticking keeps everyone watching the discard pile even when it is not their turn, which is what stops a six-player memory game becoming tedious. Best with a group that will slap the table rather than check their phone.',
      },
    ],
    outro: [
      {
        type: 'p',
        text: 'For a party where people drift in and out, Cheat and Crazy Eights are the safest picks — both survive someone leaving mid-game. For a group that will sit down and commit, President is the one that builds a story across the evening.',
      },
    ],
  },

  {
    slug: 'easy-card-games',
    title: 'Easy Card Games for Beginners',
    heading: 'Easy card games anyone can learn in five minutes',
    description:
      'Seven card games with rules simple enough to teach at the table, ranked by how quickly a complete beginner can start playing.',
    lede: 'Seven games you can teach in the time it takes to deal them — ordered by how little explaining they need.',
    updated: UPDATED,
    requires: { difficulty: 'easy' },
    intro: [
      {
        type: 'p',
        text: 'A game is easy to teach when the first turn makes sense before you have explained the whole thing. Games that need the scoring understood up front — or that hinge on a rule that only matters at the end — are harder to start, whatever their rulebook length.',
      },
      {
        type: 'p',
        text: 'These are ordered by how much you have to say before the first card goes down.',
      },
    ],
    picks: [
      {
        slug: 'crazy-eights',
        verdict: 'Easiest to teach',
        why: 'One sentence: match the suit or the number, and eights are wild. Everything else can be explained as it comes up. This is the game to reach for when someone at the table has genuinely never played cards.',
      },
      {
        slug: 'spoons',
        verdict: 'No rules to learn at all',
        why: 'Collect four of the same number, take a spoon. There are no card values, no scoring and no turn order to explain — a child can join halfway through a round and be fine. The only thing worth saying out loud beforehand is that once one spoon goes, everybody grabs.',
      },
      {
        slug: 'cheat',
        verdict: 'Almost as easy, far louder',
        why: 'Play cards face down, say what they are, lie if you want. There is no scoring to learn and no card values to memorise — the only rule that needs stating is what happens when someone calls. Children pick it up immediately.',
      },
      {
        slug: 'golf',
        verdict: 'Easy to play, one rule to remember',
        why: 'Swap cards to get your total down. The only thing a beginner has to hold in their head is that Kings are zero and a matching column cancels — and both are on the table in front of them where they can be pointed at.',
      },
      {
        slug: 'palace',
        verdict: 'Easy once the first pile is played',
        why: 'The three-layer setup looks complicated and stops being confusing the moment someone plays a turn. Beat the top card or pick up the pile — that is the whole game. The magic cards can be introduced one at a time.',
      },
      {
        slug: 'cambio',
        verdict: 'Simple rules, harder to play well',
        why: 'The rules are easy — lowest hand wins, peek at two cards, swap or discard. The difficulty is entirely memory, not comprehension, so beginners can start immediately and simply lose. That is a good property for a teaching game.',
      },
      {
        slug: 'president',
        verdict: 'Easy game, one rule to agree first',
        why: 'Beat the previous play with the same number of cards at a higher rank. The only thing that needs settling before you deal is which variations you are using, because President has more house rules than any other game here.',
      },
    ],
    outro: [
      {
        type: 'p',
        text: 'Teaching tip that applies to all six: deal the first hand face up and play one round openly. It takes two minutes and saves ten minutes of questions.',
      },
    ],
  },
];
