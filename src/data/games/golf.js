export default {
  slug: 'golf',
  name: 'Golf',
  suit: '♣',
  aliases: ['Six-Card Golf', 'Polish Polka'],
  tagline: 'Nine rounds, lowest score wins. Kings are free and twos are better than free.',
  reviewed: '2026-09-08',
  sources: [
    { name: 'Pagat — Golf', url: 'https://www.pagat.com/draw/golf.html' },
    { name: 'Bicycle — Six-Card Golf', url: 'https://bicyclecards.com/how-to-play/six-card-golf' },
  ],
  players: { min: 2, max: 4, best: '3–4' },
  time: { min: 20, max: 30 },
  difficulty: 'easy',
  deck: 'standard',
  tags: ['memory'],
  keywords: ['low score', 'six card golf', 'nine card golf', 'holes', 'layout', 'easy'],
  objective:
    'Keep the lowest total across nine rounds, swapping cards into a face-down grid you can only partly see.',

  sections: [
    {
      id: 'setup',
      title: 'Setup',
      body: [
        {
          type: 'ol',
          items: [
            'Deal **six cards face down** to each player, in **three columns of two**.',
            'Put the rest face down as the **stock** and turn one card up beside it as the **discard pile**.',
            'Each player turns **any two** of their six cards face up. The other four stay hidden.',
          ],
        },
        {
          type: 'diagram',
          id: 'golf-layout',
          caption:
            'You choose which two to expose, and you never get to look at the other four until you swap them or the round ends.',
        },
      ],
    },
    {
      id: 'your-turn',
      title: 'Your turn',
      body: [
        { type: 'p', text: 'Draw one card — from the top of the **stock** or the top of the **discard pile** — then do one of two things:' },
        {
          type: 'ul',
          items: [
            '**Swap it in.** Put it face up over any card in your layout, and discard the card it replaces. If you replace a face-down card, you do not get to look first.',
            '**Discard it.** Throw the drawn card straight onto the discard pile and change nothing. You may only do this with a card drawn from the **stock**.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          text: 'Taking the top of the discard pile commits you — you must put it into your layout. Only a card drawn blind from the stock can be thrown away again.',
        },
      ],
    },
    {
      id: 'values',
      title: 'Card values',
      lede: 'This is the whole game. Two ranks break the normal pattern.',
      body: [
        {
          type: 'table',
          headers: ['Card', 'Points'],
          rows: [
            ['**King**', '**0**'],
            ['**2**', '**−2**'],
            ['Ace', '1'],
            ['3 – 10', 'Face value'],
            ['Jack, Queen', '10 each'],
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'A King is worth nothing and a 2 is worth **minus two**. Those are the two cards worth chasing, and the reason a good round can finish below zero.',
        },
      ],
    },
    {
      id: 'columns',
      title: 'Matching columns',
      body: [
        {
          type: 'p',
          text: 'If the **two cards in a column are the same rank**, that column scores **0** — whatever the cards are. A pair of Queens that would cost you 20 costs you nothing instead.',
        },
        {
          type: 'p',
          text: 'They must be in the same column, one above the other. Two Queens sitting in different columns are just 20 points.',
        },
      ],
    },
    {
      id: 'ending',
      title: 'Ending the round',
      body: [
        {
          type: 'p',
          text: 'The round ends the moment **any player has all six cards face up**. Everyone else gets no further turns — whatever is still face down is turned over and counted as it lies.',
        },
        {
          type: 'p',
          text: 'Add up all six cards using the values above, applying the column rule. Play **nine rounds** — nine holes — and the **lowest total wins**.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Going out fast does not win the round, it just ends it. Do it while you are behind and you lock in your own bad score.',
        },
      ],
    },
  ],

  cardLibrary: {
    intro: 'Low is good, and two ranks are worth more than their pip value suggests.',
    entries: [
      { rank: '2', name: 'Two', value: '−2', effect: 'The best card in the deck. Actively lowers your score.', tags: ['good'] },
      { rank: 'K', name: 'King', value: '0', effect: 'Free. Swap one in over anything expensive.', tags: ['good'] },
      { rank: 'A', name: 'Ace', value: '1', effect: 'Almost free.', tags: ['good'] },
      { rank: '3–10', name: 'Number cards', value: 'face', effect: 'Worth their pip value. A 3 is fine, a 10 is not.', tags: ['scoring'] },
      { rank: 'J', name: 'Jack', value: '10', effect: 'Expensive unless you can pair it in a column.', tags: ['bad'] },
      { rank: 'Q', name: 'Queen', value: '10', effect: 'Expensive unless you can pair it in a column.', tags: ['bad'] },
      { rank: '=', name: 'Matching column', value: '0', effect: 'Two of the same rank stacked in one column cancel to zero.', tags: ['good'] },
    ],
  },

  drills: [
    {
      id: 'zero',
      title: 'Know the free card',
      prompt: 'Which of these is worth nothing at all in your layout?',
      options: [
        { faces: ['K♠'], correct: true },
        { faces: ['A♦'] },
        { faces: ['10♥'] },
        { faces: ['Q♣'] },
      ],
      correctText: 'Kings score 0 in Golf. Swapping one over a Queen saves you ten points in a single turn.',
      wrongText: 'The Ace is 1 — close, but the **King** is the one worth exactly zero. Queens and tens are 10 each.',
    },
    {
      id: 'column',
      title: 'Cancel a column',
      prompt: 'Which of these pairs scores 0 when stacked in the same column?',
      options: [
        { faces: ['9♦', '9♣'], correct: true },
        { faces: ['K♠', '2♥'] },
        { faces: ['9♦', '8♣'] },
        { faces: ['Q♥', 'J♠'] },
      ],
      correctText: 'Two of the same rank in one column cancel each other out, whatever the rank. Suits are irrelevant.',
      wrongText: 'It has to be the **same rank**, one above the other. K and 2 are only worth 0 and −2 individually — that is −2, not 0.',
    },
  ],

  variations: [
    { name: 'Nine-card Golf', description: 'Deal **nine cards** in a 3×3 grid and turn three face up. A **column of three matching ranks** scores 0. Longer rounds, and you will want a second deck past four players.' },
    { name: 'Four-card Golf', description: 'Deal four in a 2×2 and turn two up. Very quick — a full nine holes takes about ten minutes, good for teaching the game.' },
    { name: 'Knocking', description: 'Instead of ending when someone is fully face up, a player may **knock** at the end of their turn. Everyone else gets one final turn, then all cards are revealed. Adds a real decision about when to stop.' },
    { name: 'Jokers at −5', description: 'Add the two jokers and score them **−5**. It widens the gap between a good round and a great one, and gives the stock a jackpot.' },
    { name: 'Rows instead of columns', description: 'Some tables cancel matching **rows** rather than columns, or both. Both is much more forgiving — decide before dealing.' },
    { name: 'Fewer holes', description: 'Nine rounds is the standard, but **five** plays fine and stops the game outstaying its welcome.' },
  ],

  hints: [
    'Turn up two cards in **different columns** at the start. Two in the same column tells you a lot about one column and nothing about the other two.',
    'A King over a Queen is a ten-point swing in one turn. Take that trade every time before chasing a matching column.',
    'Only take from the discard pile when it genuinely improves a card you can see. You are committed once you pick it up.',
    'Remember the cards you covered. Knowing you buried a 9 in the top-left is what lets you pair it later.',
    'Do not race to turn your last card over if your visible score is bad. Ending the round early just freezes everyone else’s losses in your favour — or yours in theirs.',
    'Late in a round, count what your opponents have exposed. If someone is showing 4 points across five cards, ending it fast costs you.',
  ],

  faq: [
    { q: 'Can I look at a face-down card before replacing it?', a: 'No. You choose the position blind, and only see what was there once it hits the discard pile.' },
    { q: 'Do the two cards I turn up at the start have to be in a particular place?', a: 'No, any two of the six. Most players pick two in different columns to spread the information.' },
    { q: 'Does the column rule work with three of a kind?', a: 'In six-card Golf a column only holds two cards. In the nine-card version, a column of **three** matching ranks scores 0.' },
    { q: 'What happens to the players who have not finished when the round ends?', a: 'Nothing — they simply turn their remaining cards face up and score them as they are. There are no extra turns.' },
    { q: 'Can I score a negative round?', a: 'Yes. Two 2s in separate columns and a couple of Kings gets you below zero, which is exactly what you are aiming for.' },
    { q: 'Is this related to the Cambio family?', a: 'Closely. Both are low-score memory games with a hidden layout, but Golf has no card powers and no calling — you play a fixed number of rounds instead.' },
  ],

  cheatSheet: {
    setup: '**Six cards face down** each, in **three columns of two**. Turn **any two** face up. Stock face down, one card up to start the discard pile.',
    turn: [
      'Draw from the **stock** or the **discard pile**.',
      '**Swap** it into your layout (discarding what it replaces), or **discard** it — stock draws only.',
      'Round ends when any player’s six cards are all face up.',
    ],
    keyRules: [
      'Values: **K = 0**, **2 = −2**, A = 1, 3–10 face value, **J/Q = 10**.',
      'Two matching ranks **in the same column** score **0**.',
      'A card taken from the discard pile **must** go into your layout.',
      'No extra turns once someone goes out.',
    ],
    scoring: 'Total your six cards each round. Play **nine holes**. **Lowest total wins.**',
  },

  scoring: { mode: 'low', target: null, unit: 'points' },
};
