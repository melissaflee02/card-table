export default {
  slug: 'cambio',
  name: 'Cambio',
  suit: '♦',
  aliases: ['Cabo', 'Pablo', 'Cactus'],
  tagline: 'Lowest hand wins — but you only ever saw two of your four cards.',
  players: { min: 2, max: 6, best: '3–6' },
  time: { min: 10, max: 20 },
  difficulty: 'easy',
  deck: '52-card deck + jokers',
  tags: ['memory', 'party'],
  keywords: ['low score', 'grid', 'cabo', 'slap', 'stick', 'easy'],
  objective:
    'End the round with the lowest total point value in your four-card hand — then call "Cambio" before anyone undercuts you.',

  sections: [
    {
      id: 'setup',
      title: 'Setup',
      body: [
        {
          type: 'ol',
          items: [
            'Shuffle a standard 52-card deck **including the jokers**.',
            'Deal **four cards face down** to each player, arranged in a 2×2 grid in front of them.',
            'Put the rest of the deck face down in the middle, leaving room beside it for a discard pile.',
            'Every player peeks at the **two cards closest to them** — once, at the start of the round. That is the only free look you get.',
            'Flip the top card of the deck onto the discard pile to start it.',
          ],
        },
        {
          type: 'diagram',
          id: 'cambio-peek',
          caption:
            'The two cards nearest you are the only ones you ever see for free. Look once, turn them back over, and everything after that is memory.',
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'The one-hand rule',
          text: 'You may only touch the cards with **one hand**, all round. Using two hands is a penalty — you take an extra card. It sounds silly until you watch someone try to peek at two cards at once.',
        },
      ],
    },
    {
      id: 'your-turn',
      title: 'Your turn',
      body: [
        { type: 'p', text: 'On your turn you draw the top card of the deck, then do exactly one of two things:' },
        {
          type: 'ul',
          items: [
            '**Swap it in.** Put the drawn card face down into your grid, replacing one of your four cards. The card you replaced goes face up on the discard pile. You now know that position.',
            '**Discard it.** Put the drawn card straight onto the discard pile. If it is a special card, its power triggers now.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          text: 'A special card only triggers when it is **discarded**. Swap a Jack into your hand and you get a 10-point card and no power. Discard it and you get the power but keep whatever you already had.',
        },
        { type: 'p', text: 'Then play passes to the left.' },
      ],
    },
    {
      id: 'points',
      title: 'Card values',
      lede: 'Everything is scored at face value except the cards worth remembering.',
      body: [
        {
          type: 'table',
          headers: ['Card', 'Points'],
          rows: [
            ['Joker', '0'],
            ['Red King (♥ ♦)', '−1'],
            ['Ace', '1'],
            ['2 – 10', 'Face value'],
            ['Jack', '10'],
            ['Queen', '10'],
            ['Black King (♣ ♠)', '10'],
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'A red King is worth **minus one**. A black King is worth ten. They look nearly identical face down, and that asymmetry is most of the game.',
        },
      ],
    },
    {
      id: 'special-cards',
      title: 'Special cards',
      lede: 'These only fire when you discard them.',
      body: [
        {
          type: 'table',
          headers: ['Card', 'Power', 'What it does'],
          rows: [
            ['7 or 8', 'Peek', 'Secretly look at one of **your own** face-down cards.'],
            ['9 or 10', 'Spy', 'Secretly look at one of **another player’s** face-down cards.'],
            ['Jack or Queen', 'Blind switch', 'Swap one of your cards with another player’s — **without looking** at either.'],
            ['Black King (♣ ♠)', 'Look &amp; switch', 'Look at one of your cards and one of an opponent’s, then choose whether to swap them.'],
          ],
        },
        {
          type: 'p',
          text: 'The black King is the best card in the deck to *discard* and one of the worst to *hold* — ten points if it ends up in your grid.',
        },
      ],
    },
    {
      id: 'sticking',
      title: 'Sticking',
      lede: 'The mechanic that makes Cambio fast, loud and occasionally unfair.',
      body: [
        {
          type: 'p',
          text: 'If you know a card in your grid **matches the rank** of the card on top of the discard pile, you may slap it onto the pile at any moment — even in the middle of someone else’s turn. This is called sticking, and it is how you shrink your hand.',
        },
        {
          type: 'ul',
          items: [
            'First player to stick wins the race. Only **one** stick per discarded card.',
            'A correct stick removes that card from your grid for good. Your hand is now smaller — and a smaller hand is a lower score.',
            'You may also stick **another player’s** card if you know it matches. If you are right, you then hand them one of your own cards to fill the hole. You get rid of a card *and* they gain one.',
            'A wrong stick is a double punishment: the card stays where it was, **and** you take a penalty card face down.',
          ],
        },
        {
          type: 'diagram',
          id: 'cambio-sticking',
          caption:
            'Only the rank matters — suits are irrelevant. Being wrong costs you twice: the card stays where it was and you gain one you are not allowed to look at.',
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'The strongest legal move in the game: draw a card, discard it, then immediately stick a matching card from your own grid before anyone else reacts. You know your grid better than they do — use the head start.',
        },
      ],
    },
    {
      id: 'penalties',
      title: 'Penalties',
      body: [
        {
          type: 'p',
          text: 'A penalty means an opponent deals you an extra card face down, placed beside your grid. You may **not** look at it, and it counts toward your score at the end. Penalties are handed out for:',
        },
        {
          type: 'ul',
          items: [
            'Using **two hands** at any point.',
            'A **wrong stick** — slapping down a card that did not match.',
            'Sticking another player’s card wrongly. They keep their card; you take the penalty.',
          ],
        },
      ],
    },
    {
      id: 'winning',
      title: 'Calling Cambio & winning',
      body: [
        {
          type: 'p',
          text: 'At the **start of your turn, before you touch the deck**, you may call "Cambio". This ends the round:',
        },
        {
          type: 'ol',
          items: [
            'You do not draw or play a card — calling *is* your turn.',
            'Every other player takes exactly one more turn.',
            'All hands are revealed and points are totalled.',
            'The **lowest total wins** the round.',
          ],
        },
        {
          type: 'p',
          text: 'On a tie, the player who did **not** call Cambio wins — calling is a risk and the tie-break punishes it. If two non-callers tie, the one holding the lower-value individual cards wins (a Joker and an Ace beat a red King and a 2).',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Calling Cambio does not protect you. If someone undercuts you on their final turn, you lose the round you just tried to end.',
        },
      ],
    },
  ],

  variations: [
    {
      name: 'Playing to a target score',
      description: 'Rather than one-off rounds, keep a running total across rounds and play until someone crosses **100 points** — that player loses, and the lowest total at that moment wins. This is the most common way to turn Cambio into a full game rather than a ten-minute filler.',
    },
    {
      name: 'Winner’s bonus',
      description: 'Some tables score the round winner as **0** instead of their actual hand value, which rewards calling Cambio aggressively. Others give the caller a penalty of **+5** if they are undercut, which punishes it. Pick one — do not play both.',
    },
    {
      name: 'No sticking other players',
      description: 'Sticking an opponent’s card is the most argued-about rule in Cambio. Some groups ban it entirely and allow sticking only from your own grid. This makes the game calmer and considerably slower.',
    },
    {
      name: 'Jokers as −2',
      description: 'Scoring jokers at **−2** rather than 0 makes them the most valuable card in the deck and sharpens the hunt for negatives. With more than four players this can swing rounds hard.',
    },
    {
      name: 'Two peeks, or none',
      description: 'The standard opening peek is two cards. Some play **one** card for a harsher memory game, or allow a re-peek at your original two cards once per round.',
    },
  ],

  hints: [
    'Track the discard pile, not just your own grid. Every card discarded is a card you can stick against later — and knowing what is *gone* tells you what your opponents are probably sitting on.',
    'Dump high cards early. A Queen sitting in your grid is ten points that will not improve on its own, and you have limited turns to find something better.',
    'Blind switches (Jack, Queen) are best used to *give away* a card you know is terrible. You lose nothing by not looking if you already know your own card is a 10.',
    'Discarding a 9 or 10 to spy on the player to your left is usually better than spying on the leader — you will be blind-switching with your neighbour more often.',
    'Call Cambio when your hand is small and known, not just when it is low. A three-card hand you have memorised is safer than a four-card hand that might contain a black King.',
    'If someone is sticking constantly, they have a memorised grid and a low score. Consider calling Cambio early to cut them off, even at a mediocre total.',
  ],

  faq: [
    {
      q: 'How long does a round take?',
      a: 'Usually **10–20 minutes** with 3–6 players. Two-player rounds are quicker but much less interesting, since the blind-switch and spy cards only have one target.',
    },
    {
      q: 'Is Cambio the same game as Cabo?',
      a: 'Yes. **Cambio, Cabo, Pablo and Cactus** are the same game under different names, with small regional differences in the special cards and the penalty for being undercut.',
    },
    {
      q: 'Do I need a special deck?',
      a: 'No. One standard 52-card deck plus the jokers. Commercial Cabo decks exist, but they change nothing mechanically.',
    },
    {
      q: 'Can I stick a card I just discarded myself?',
      a: 'Yes — and you should. Discard a card, then immediately stick a matching card from your own grid. You are the only person who knows it is there. Some tables ban this; agree beforehand.',
    },
    {
      q: 'Can I look at my penalty card?',
      a: 'No. A penalty card goes face down and stays unknown to you until scoring. That uncertainty is the actual punishment — you can no longer safely call Cambio.',
    },
    {
      q: 'What happens if the deck runs out?',
      a: 'Shuffle the discard pile — except the top card, which stays face up — and use it as the new deck. In practice most rounds end before this happens.',
    },
    {
      q: 'Can two people stick the same card?',
      a: 'No. Only the first stick counts. If two hands land at once, the card belongs to whoever was clearly first; if nobody can agree, the safest table rule is that neither stick counts.',
    },
  ],

  cardLibrary: {
    intro: 'Everything scores at face value except the cards worth memorising. Powers only fire when a card is discarded.',
    entries: [
      { rank: 'JK', name: 'Joker', value: '0', effect: 'Free. The best card you can hold.', tags: ['scoring'] },
      { rank: 'K', suit: '♥', name: 'Red King', value: '−1', effect: 'Worth minus one. Hearts and diamonds only.', tags: ['scoring'] },
      { rank: 'A', name: 'Ace', value: '1', effect: 'Almost free.', tags: ['scoring'] },
      { rank: '2–6', name: 'Low numbers', value: 'face', effect: 'Scored at face value. No power.', tags: ['scoring'] },
      { rank: '7', name: 'Seven', value: '7', effect: 'Peek at one of your own face-down cards.', tags: ['power'] },
      { rank: '8', name: 'Eight', value: '8', effect: 'Peek at one of your own face-down cards.', tags: ['power'] },
      { rank: '9', name: 'Nine', value: '9', effect: 'Spy on one of another player’s cards.', tags: ['power'] },
      { rank: '10', name: 'Ten', value: '10', effect: 'Spy on one of another player’s cards.', tags: ['power'] },
      { rank: 'J', name: 'Jack', value: '10', effect: 'Blind switch: swap a card with an opponent, sight unseen.', tags: ['power'] },
      { rank: 'Q', name: 'Queen', value: '10', effect: 'Blind switch: swap a card with an opponent, sight unseen.', tags: ['power'] },
      { rank: 'K', suit: '♠', name: 'Black King', value: '10', effect: 'Look at one of yours and one of theirs, then choose to swap.', tags: ['power'] },
    ],
  },

  drills: [
    {
      id: 'stick',
      title: 'Stick the right card',
      prompt: 'The discard pile shows 8♦ and you know every card in your grid. Which one can you slap down?',
      options: [
        { faces: ['8♣'], correct: true },
        { faces: ['5♠'] },
        { faces: ['K♥'] },
        { faces: ['3♦'] },
      ],
      correctText: 'Rank is all that matters — 8 on 8. That card leaves your grid for good.',
      wrongText: 'Sticking needs a matching **rank**, not a matching colour or value. Only the 8 matches the 8♦.',
    },
    {
      id: 'spy',
      title: 'Pick the right power',
      prompt: 'You want to see one of your opponent’s face-down cards. Which card do you discard?',
      options: [
        { faces: ['9♦'], correct: true },
        { faces: ['7♣'] },
        { faces: ['J♠'] },
        { faces: ['4♥'] },
      ],
      correctText: '9 and 10 spy on somebody else. 7 and 8 only peek at your own.',
      wrongText: 'Close. 7 and 8 peek at **your own** cards; 9 and 10 are the ones that look at an opponent’s.',
    },
  ],

  cheatSheet: {
    setup: 'Four cards face down each in a 2×2 grid. Peek at your **two nearest cards once**. Flip one card to start the discard pile. One hand only, all round.',
    turn: [
      'Draw the top card of the deck.',
      'Either **swap** it into your grid (discarding the card it replaces), or **discard** it to trigger its power.',
      'Play passes left.',
    ],
    keyRules: [
      'Values: Joker **0**, red King **−1**, Ace **1**, 2–10 face value, J/Q/black K **10**.',
      'Powers fire on discard only — 7/8 peek at your own, 9/10 spy an opponent, J/Q blind switch, black K look-and-switch.',
      '**Stick** a matching card onto the discard pile any time, even out of turn. Wrong stick = keep the card + penalty card.',
      'Penalty = one extra face-down card you may never look at.',
      'Call **Cambio** at the start of your turn, before touching the deck.',
    ],
    scoring: 'Everyone takes one last turn, then reveal. **Lowest total wins.** Ties go to the player who did not call Cambio.',
  },

  scoring: { mode: 'low', target: 100, unit: 'points' },
};
