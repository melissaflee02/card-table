export default {
  slug: 'rummy-500',
  name: 'Rummy 500',
  suit: '♥',
  aliases: ['500 Rum', 'Pinochle Rummy', 'Michigan Rummy'],
  tagline: 'Rummy where the discard pile is fair game — all the way down, if you can use the card at the bottom.',
  reviewed: '2026-09-09',
  sources: [
    { name: 'Pagat — 500 Rum', url: 'https://www.pagat.com/rummy/500rum.html' },
    { name: 'Bicycle — 500 Rum', url: 'https://bicyclecards.com/how-to-play/500-rum' },
  ],
  players: { min: 2, max: 8, best: '3–4' },
  time: { min: 30, max: 45 },
  difficulty: 'medium',
  deck: 'standard',
  deckNote: 'or two shuffled together with five or more players',
  tags: ['melds'],
  keywords: ['500 rum', 'rummy', 'melds', 'sequences', 'laying off', 'discard pile', 'deadwood'],
  objective:
    'Lay down sets and runs to bank their point value, and be holding as little as possible when the hand ends. First to 500 points across several hands wins.',

  sections: [
    {
      id: 'setup',
      title: 'The deal',
      body: [
        {
          type: 'ol',
          items: [
            'With **three or more players**, deal **seven cards** each. With **two**, deal **thirteen** each.',
            'Place the rest face down as the **stock** and turn one card face up beside it to start the **discard pile**.',
            'Play passes to the left. Each player keeps their own melds face up in front of them.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          label: 'Five or more players',
          text: 'Shuffle **two decks together** — 104 cards. One deck deals too thin above four players and the discard pile never gets deep enough to matter.',
        },
      ],
    },

    {
      id: 'melds',
      title: 'Sets and runs',
      body: [
        {
          type: 'ul',
          items: [
            '**Set** — three or four cards of the same rank. `9♠ 9♥ 9♦`',
            '**Run** — three or more consecutive cards in one suit. `5♣ 6♣ 7♣`',
          ],
        },
        {
          type: 'p',
          text: 'The **Ace can go either end** of a run — `A♠ 2♠ 3♠` or `Q♠ K♠ A♠` — but never round the corner. `K A 2` is not a run.',
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'Melds go on the table, not in your hand',
          text: 'This is the big difference from **Gin Rummy**. You lay melds down as you make them, face up, where everyone can see them and — crucially — add to them.',
        },
      ],
    },

    {
      id: 'your-turn',
      title: 'Your turn',
      body: [
        {
          type: 'p',
          text: 'Three steps, in order: **draw**, then optionally **meld and lay off**, then **discard**.',
        },
        {
          type: 'ol',
          items: [
            '**Draw** one card from the stock, **or** take from the discard pile (see below).',
            '**Meld** any sets or runs you can, face up in front of you.',
            '**Lay off** — add cards to *anyone\'s* melds, including your opponents\'. A card added to their run still scores for **you**.',
            '**Discard** one card face up. Your turn ends.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          label: 'Laying off is where the points hide',
          text: 'You may extend any meld on the table, whoever laid it. Somebody else\'s run of `4♦ 5♦ 6♦` is a home for your `3♦` and `7♦`, and those cards bank at full value for you.',
        },
      ],
    },

    {
      id: 'discard-pile',
      title: 'Taking from the discard pile',
      lede: 'The rule the whole game is built around.',
      body: [
        {
          type: 'p',
          text: 'The discard pile is **spread out so everyone can see every card in it**, not stacked. You may take the top card — or you may reach deeper.',
        },
        {
          type: 'p',
          text: 'To take a card from lower down, both of these must be true:',
        },
        {
          type: 'ol',
          items: [
            'You **immediately use that card** — either in a new meld, or laid off onto a meld already on the table.',
            'You also **take every card above it** into your hand.',
          ],
        },
        {
          type: 'example',
          label: 'Worked example',
          text: 'The pile reads `8♥ K♣ 3♠ Q♦` with the Q♦ on top. You hold `8♠` and `8♦`. You may take the `8♥` from the bottom — melding `8♠ 8♥ 8♦` on the spot — but you must also pick up the `K♣`, `3♠` and `Q♦`, which all land in your hand as potential deadwood.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'That is the trade every turn: one card you need against a fistful you may not. Diving six cards deep for a single 8 can hand you thirty points of dead weight at the end of the hand.',
        },
      ],
    },

    {
      id: 'ending',
      title: 'Ending the hand',
      body: [
        {
          type: 'p',
          text: 'A hand ends the moment either of these happens:',
        },
        {
          type: 'ul',
          items: [
            'A player **gets rid of every card** — melding their last cards, or melding all but one and discarding it.',
            'The **stock runs out** and the player whose turn it is chooses not to take from the discard pile.',
          ],
        },
        {
          type: 'p',
          text: 'There is no bonus for going out first. Going out simply stops everyone else from banking anything more — which is usually reason enough.',
        },
      ],
    },

    {
      id: 'scoring',
      title: 'Scoring',
      body: [
        {
          type: 'table',
          headers: ['Card', 'Points'],
          rows: [
            ['Ace **high** (in `Q K A`, or as a set)', '**15**'],
            ['Ace **low** (in `A 2 3`)', '**1**'],
            ['King, Queen, Jack, 10', '10 each'],
            ['2 – 9', 'Face value'],
            ['Joker, if you play with them', '15'],
          ],
        },
        {
          type: 'p',
          text: 'Each player totals the cards **melded in front of them**, then **subtracts** the value of the cards still in their hand. The difference is their score for the hand, and it can easily be negative.',
        },
        {
          type: 'example',
          text: 'You melded 90 points and are caught holding a King and a 7 — 17 points. You score **73** for the hand. A player who melded nothing and holds 40 points of cards scores **−40**.',
        },
        {
          type: 'p',
          text: 'Keep a running total across hands. The first player to **500 or more** wins. If two players cross 500 in the same hand, the higher total takes it.',
        },
      ],
    },
  ],

  cardLibrary: {
    intro: 'Melded cards pay you; the same cards in your hand cost you. The Ace is worth fifteen at the top of a run and one at the bottom.',
    entries: [
      { rank: 'A', name: 'Ace (high)', value: '15', effect: 'In a set, or at the top of a run. The most valuable card — and the most expensive to be caught with.', tags: ['high'] },
      { rank: 'A', name: 'Ace (low)', value: '1', effect: 'Only when melded in A-2-3. Cheap to hold, cheap to bank.', tags: ['low'] },
      { rank: 'K', name: 'K, Q, J, 10', value: '10', effect: 'Solid melded, painful in hand at the end.', tags: ['high'] },
      { rank: '2–9', name: 'Number cards', value: 'face', effect: 'Worth their pip value either way.', tags: ['low'] },
      { rank: 'JK', name: 'Joker', value: '15', effect: 'Optional. Stands for any card in a meld, and costs 15 if caught in hand.', tags: ['wild'] },
    ],
  },

  drills: [
    {
      id: 'dig-deep',
      title: 'Reach into the pile',
      prompt: 'The pile is 8♥, K♣, 3♠, Q♦ (Q♦ on top). You hold 8♠ and 8♦. Which card can you take from below the top?',
      options: [
        { faces: ['8♥'], correct: true },
        { faces: ['K♣'] },
        { faces: ['3♠'] },
        { faces: ['Q♦'] },
      ],
      correctText: 'You can use the `8♥` right away — `8♠ 8♥ 8♦` is a set. Taking it means also picking up the K♣, 3♠ and Q♦.',
      wrongText: 'You may only reach for a card you can **meld immediately**. You hold two 8s, so the `8♥` qualifies; nothing in your hand uses the King, the 3 or the Queen.',
    },
    {
      id: 'ace-value',
      title: 'Price the Ace',
      prompt: 'You melded Q♠ K♠ A♠. What is the Ace worth in that run?',
      options: [
        { faces: ['A♠'], correct: true },
        { faces: ['2♠'] },
        { faces: ['10♠'] },
        { faces: ['5♠'] },
      ],
      correctText: 'Fifteen. An Ace at the top of a run — or in a set — scores 15. It only drops to 1 when melded low in A-2-3.',
      wrongText: 'The question is the Ace itself: at the top of `Q K A` it is worth **15 points**, the highest single card in the game.',
    },
  ],

  variations: [
    {
      name: 'Aces always 15, or always 1',
      description: 'Some tables fix the Ace at 15 wherever it lands, others at 1. The split value is standard but it is the most commonly house-ruled part of the scoring — agree before dealing.',
    },
    {
      name: 'No digging in the discard pile',
      description: 'Restrict players to the **top card only**, as in Gin Rummy. Much faster and considerably less interesting — the deep draw is the reason to play this rather than Gin.',
    },
    {
      name: 'Going out bonus',
      description: 'Award the player who goes out a flat **25 points**. Adds a race to a game that is otherwise about accumulation, and it discourages sitting on a big hand.',
    },
    {
      name: 'Playing to 200 or 1000',
      description: '500 takes an hour or so. **200** is a good single-sitting target; **1000** is for an evening. Nothing else changes.',
    },
    {
      name: 'Jokers as wild',
      description: 'Add two jokers, each standing for any card in a meld and worth 15 against you in hand. Some groups let a player who holds the natural card swap it in and take the joker.',
    },
  ],

  hints: [
    'Count the cost before you dig. Taking six cards to reach one 8 is only worth it if most of those six have a future — otherwise you have bought 40 points of deadwood.',
    'Lay melds down early rather than hoarding. Points on the table are banked; points in your hand vanish the moment somebody else goes out.',
    'Watch what your opponents lay down — every meld on the table is somewhere **you** can lay off later.',
    'Be careful what you discard next to a meld. Discarding a `7♦` when someone has `4♦ 5♦ 6♦` showing is a gift.',
    'Holding a lone Ace late is a 15-point liability. Either meld it or throw it before the hand ends.',
    'With two players the thirteen-card deal makes for long hands and a deep pile — the discard pile becomes the main source of cards rather than the stock.',
  ],

  faq: [
    {
      q: 'How is this different from Gin Rummy?',
      a: 'Three ways: melds go **face up on the table** as you make them, you may **lay off onto anyone\'s** melds, and you can take **more than one card** from the discard pile. Gin is a tight two-player duel; this is looser and works with a crowd.',
    },
    {
      q: 'Can I really take the bottom card of the pile?',
      a: 'Yes, provided you can use it immediately and you take everything above it. This is the defining rule of the game and it is why the pile is spread out rather than stacked.',
    },
    {
      q: 'Do I have to meld as soon as I can?',
      a: 'No. Holding a meld back can be worth it if you are hoping to extend it. The risk is that someone goes out and you are caught holding all of it.',
    },
    {
      q: 'Can I lay off on an opponent\'s meld?',
      a: 'Yes, and you should. The card scores for **you**, not for the person who laid the original meld.',
    },
    {
      q: 'What if the stock runs out?',
      a: 'Play continues from the discard pile alone. The hand ends when the player to move declines to take from it.',
    },
    {
      q: 'Is a negative score possible?',
      a: 'Yes. If you melded nothing and are caught holding face cards, you go backwards. Two bad hands in a row can put you well below zero, which is entirely normal.',
    },
  ],

  cheatSheet: {
    setup: '**Seven cards** each (**thirteen** with two players). Stock face down, one card up to start the discard pile. Two decks at five or more players.',
    turn: [
      '**Draw** — top of the stock, or from the discard pile.',
      '**Meld** sets and runs face up, and **lay off** onto anyone\'s melds.',
      '**Discard** one card.',
    ],
    keyRules: [
      'To take a card from **deeper** in the pile you must use it immediately **and** take every card above it.',
      'Melds sit **face up on the table**; anyone may extend them, and the card scores for whoever plays it.',
      'Runs may use the Ace at **either end**, never round the corner.',
      'Hand ends when someone sheds every card, or the stock runs out and the pile is declined.',
    ],
    scoring: 'Melded points **minus** the cards left in your hand. Ace **15** high / **1** low, K/Q/J/10 **10**, others face value. First to **500** wins.',
  },

  scoring: { mode: 'high', target: 500, unit: 'points' },
};
