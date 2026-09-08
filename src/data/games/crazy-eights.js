export default {
  slug: 'crazy-eights',
  name: 'Crazy Eights',
  suit: '♦',
  aliases: ['Eights', 'Switch', 'Mau Mau'],
  tagline: 'Match the suit or the rank. Eights are wild, and everyone always argues about the extras.',
  players: { min: 2, max: 8, best: '3–5' },
  time: { min: 10, max: 20 },
  difficulty: 'easy',
  deck: 'standard',
  tags: ['shedding', 'party'],
  keywords: ['switch', 'mau mau', 'uno with a normal deck', 'wild', 'easy'],
  objective:
    'Be the first to get rid of every card by matching the suit or rank on the discard pile — or by dropping an eight and changing the suit to whatever you like.',

  sections: [
    {
      id: 'setup',
      title: 'The deal',
      body: [
        {
          type: 'ol',
          items: [
            'Deal **5 cards** each. With only two players, deal **7 each**.',
            'Put the rest face down as the **stock**.',
            'Turn the top card of the stock face up beside it to start the **discard pile**.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          text: 'If the starter card happens to be an eight, bury it in the middle of the stock and turn over the next one.',
        },
      ],
    },
    {
      id: 'your-turn',
      title: 'Your turn',
      body: [
        { type: 'p', text: 'Play **one card** that matches the top of the discard pile by either:' },
        {
          type: 'ul',
          items: [
            '**Suit** — a heart on a heart.',
            '**Rank** — a 7 on a 7, whatever the suits.',
            'Or an **eight**, which goes on anything.',
          ],
        },
        {
          type: 'p',
          text: 'If you cannot play, **draw from the stock** until you can, then play it. If the stock runs out and you still cannot go, your turn simply passes.',
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Say **“last card”** when you are down to one. Most tables make you draw two if you forget — the same rule Uno borrowed.',
        },
      ],
    },
    {
      id: 'eights',
      title: 'The eights',
      body: [
        {
          type: 'p',
          text: 'An **eight is wild**. Play it on any card at all, then **name a suit** — including the one already showing, if that suits you. The next player must follow the suit you named, or play an eight of their own.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'An eight is worth **50 points** against you if you are still holding it when someone goes out. They are the most powerful cards in the deck and the most expensive to be caught with.',
        },
      ],
    },
    {
      id: 'stock-runs-out',
      title: 'If the stock runs out',
      body: [
        {
          type: 'p',
          text: 'Take the discard pile except its top card, shuffle it, and set it down as a fresh stock. If you would rather not, play on without a stock — anyone who cannot go just passes, and the hand ends when nobody can move.',
        },
      ],
    },
    {
      id: 'scoring',
      title: 'Scoring',
      body: [
        {
          type: 'p',
          text: 'The moment someone plays their last card the hand ends. Everyone else counts what they are still holding, and the winner scores the lot.',
        },
        {
          type: 'table',
          headers: ['Card', 'Points against you'],
          rows: [
            ['**Any eight**', '**50**'],
            ['King, Queen, Jack, 10', '10 each'],
            ['Ace', '1'],
            ['2 – 7, 9', 'Face value'],
          ],
        },
        { type: 'p', text: 'Keep a running total across hands. First player to **100 points** wins.' },
      ],
    },
  ],

  cardLibrary: {
    intro: 'Only one rank is special in the base game. Everything else is worth what it costs you if you get caught with it.',
    entries: [
      { rank: '8', name: 'Eight', value: '50', effect: 'Wild. Play on anything, then name any suit.', tags: ['wild'] },
      { rank: 'K', name: 'King', value: '10', effect: 'No power. Ten points if you are caught with it.', tags: ['scoring'] },
      { rank: 'Q', name: 'Queen', value: '10', effect: 'No power in the base game — see House rules.', tags: ['scoring'] },
      { rank: 'J', name: 'Jack', value: '10', effect: 'No power in the base game.', tags: ['scoring'] },
      { rank: '10', name: 'Ten', value: '10', effect: 'Scores as a face card despite being a number.', tags: ['scoring'] },
      { rank: 'A', name: 'Ace', value: '1', effect: 'The cheapest card to be left holding.', tags: ['scoring'] },
      { rank: '2–7, 9', name: 'Number cards', value: 'face', effect: 'Worth their pip value against you.', tags: ['scoring'] },
    ],
  },

  drills: [
    {
      id: 'match',
      title: 'Find the legal play',
      prompt: 'The discard pile shows 7♥. Which of these can you play?',
      options: [
        { faces: ['7♠'], correct: true },
        { faces: ['9♣'] },
        { faces: ['K♦'] },
        { faces: ['4♠'] },
      ],
      correctText: 'Same rank counts, whatever the suit. A 7 goes on a 7 — as would any heart.',
      wrongText: 'You need to match the **suit** (hearts) or the **rank** (sevens). None of the others do either.',
    },
    {
      id: 'wild',
      title: 'Change the suit',
      prompt: 'You are stuck with nothing but clubs and the pile shows a diamond. Which card rescues you?',
      options: [
        { faces: ['8♣'], correct: true },
        { faces: ['A♣'] },
        { faces: ['Q♣'] },
        { faces: ['2♣'] },
      ],
      correctText: 'An eight plays on anything, and you then name the suit — clubs, obviously.',
      wrongText: 'Only an **eight** is wild in the base game. Aces, queens and twos only get powers under the house rules.',
    },
  ],

  variations: [
    { name: 'Action cards', description: 'By far the most common addition, and the reason no two tables agree: **Queen** skips the next player, **Ace** reverses direction, and a **2** forces the next player to draw two or stack another 2. Agree which of these you are using before the first deal.' },
    { name: 'Draw one, not until you can play', description: 'Instead of drawing until you find a card, you draw exactly **one** and pass if it does not help. Much faster, and it stops one unlucky player hoovering up half the stock.' },
    { name: 'Stacking draws', description: 'If you play the 2s variant, decide whether a 2 can be answered with another 2 to pass the penalty along and double it. Fun, and occasionally someone draws eight cards.' },
    { name: 'Play to 200, or a single hand', description: 'A game to 100 is two or three hands. Casual groups often just play **one hand, winner takes it** and skip scoring entirely.' },
    { name: 'Eights are not wild on the last card', description: 'Some tables ban going out on an eight, to stop the game ending on an unanswerable play.' },
  ],

  hints: [
    'Hold an eight back rather than spending it early. It is your escape hatch when a suit you cannot follow comes round — and 50 points if you misjudge it.',
    'Watch which suit each player changes to when they play an eight. It is almost always the suit they hold most of.',
    'Dump high cards first. A King and an Ace are the same one card, but ten times the penalty if the hand ends suddenly.',
    'If you hold several of one suit, play a different suit when you can. You want options later, not a hand of one colour.',
    'Count how many cards the leader has. When somebody is down to two, stop playing the suit they keep asking for.',
    'With two players the deal is seven cards and the game becomes much more about denial — play the suit your opponent just drew against.',
  ],

  faq: [
    { q: 'Is this the same game as Uno?', a: 'Effectively, yes. Uno is Crazy Eights with a purpose-made deck: the wild card is the eight, and the draw-two, skip and reverse cards are the common house rules made official.' },
    { q: 'Can I play an eight even when I have a legal card?', a: 'Yes. An eight is always playable, and choosing when to spend it is most of the skill.' },
    { q: 'What if I cannot play and the stock is empty?', a: 'Your turn passes. If nobody can play, the hand ends there and everyone counts their cards — lowest total wins that hand.' },
    { q: 'Do I have to say “last card”?', a: 'Under the standard rule, yes, and forgetting costs you two cards. It is a house rule in the sense that some groups skip it, but almost everyone plays with it.' },
    { q: 'How many can play?', a: 'Two to eight on one deck, though with seven or eight the hands get thin — add a second deck and deal five each.' },
    { q: 'Can I change to the suit already showing?', a: 'Yes. Playing an eight on a heart and naming hearts is legal, and sometimes exactly right if the next player is clearly void.' },
  ],

  cheatSheet: {
    setup: '**5 cards each** (7 with two players). Rest face down as stock, top card turned up to start the discard pile.',
    turn: [
      'Play one card matching the **suit** or the **rank** on top.',
      'Or play an **eight** on anything and **name a suit**.',
      'Cannot play? **Draw until you can**, then play it.',
    ],
    keyRules: [
      '**Eights are wild** and worth **50** against you.',
      'Say **“last card”** at one card or draw two.',
      'Stock empty? Reshuffle the discards under the top card.',
      'Action cards (Q skip, A reverse, 2 draw-two) are house rules — agree first.',
    ],
    scoring: 'Winner scores everyone else’s hand: **8 = 50**, **K/Q/J/10 = 10**, **A = 1**, rest face value. Game to **100**.',
  },

  scoring: { mode: 'high', target: 100, unit: 'points' },
};
