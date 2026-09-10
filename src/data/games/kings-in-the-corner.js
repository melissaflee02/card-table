export default {
  slug: 'kings-in-the-corner',
  name: 'Kings in the Corner',
  suit: '♦',
  aliases: ['Kings Corners', 'King\'s Corner'],
  tagline: 'Solitaire you play against other people — and the Kings are the only way to make more room.',
  reviewed: '2026-09-09',
  sources: [
    { name: 'Pagat — Kings Corners', url: 'https://www.pagat.com/layout/kingscorners.html' },
    { name: 'Bicycle — Kings Corner', url: 'https://bicyclecards.com/how-to-play/kings-corner' },
  ],
  players: { min: 2, max: 4, best: '3–4' },
  time: { min: 15, max: 25 },
  difficulty: 'easy',
  deck: 'standard',
  tags: ['shedding'],
  keywords: ['kings corners', 'layout', 'foundation piles', 'alternating colours', 'shedding', 'solitaire'],
  objective:
    'Be first to play out every card in your hand onto a shared solitaire-style layout. Everyone else scores penalty points for what they are left holding.',

  sections: [
    {
      id: 'setup',
      title: 'Setup',
      body: [
        {
          type: 'ol',
          items: [
            'Deal **seven cards** to each player.',
            'Put the rest face down in the middle as the **stock**.',
            'Turn four cards face up and place them **around** the stock — north, south, east and west — like the arms of a cross. These are the four starting piles.',
          ],
        },
        {
          type: 'p',
          text: 'The four **corner** positions — north-east, south-east, south-west, north-west — start empty. Only a King can ever open one, which is where the game gets its name.',
        },
      ],
    },

    {
      id: 'your-turn',
      title: 'Your turn',
      body: [
        {
          type: 'ol',
          items: [
            '**Draw one card** from the stock.',
            'Make **as many plays as you can or want** — there is no limit, and you may keep going as long as legal moves exist.',
            'When you are done, or stuck, play passes to the left.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          label: 'Draw first, then play',
          text: 'Drawing at the start means the card you just picked up is available immediately. Some sources put the draw at the **end** of the turn instead — it is the most common point of disagreement in this game, so settle it before you deal.',
        },
      ],
    },

    {
      id: 'moves',
      title: 'What counts as a play',
      lede: 'Three kinds of move, all following the same descending, alternating-colour rule.',
      body: [
        {
          type: 'table',
          headers: ['Move', 'Rule'],
          rows: [
            ['**Play from your hand**', 'Onto any pile, if your card is **one rank lower** and the **opposite colour** to the top card.'],
            ['**Open a corner**', 'Only with a **King**, into an empty corner space. Nothing else may start one.'],
            ['**Move a whole pile**', 'Pick up an entire pile and set it on another, if its **bottom** card is one lower and the opposite colour to the target\'s **top** card.'],
          ],
        },
        {
          type: 'example',
          text: 'A pile topped by the `9♥` will accept the `8♠` or the `8♣` — one lower, opposite colour. It will not take the `8♦`, and it will not take the `10♠`.',
        },
        {
          type: 'callout',
          variant: 'tip',
          label: 'Moving piles is where the game is won',
          text: 'Consolidating two piles into one frees a space, and any card from your hand may be played into an empty **side** position. That is how you shed several cards in a single turn instead of one.',
        },
        {
          type: 'p',
          text: 'An empty **side** position can be filled by any card from your hand. An empty **corner** takes a King and nothing else.',
        },
      ],
    },

    {
      id: 'ending',
      title: 'Ending a hand',
      body: [
        {
          type: 'p',
          text: 'A hand ends when either:',
        },
        {
          type: 'ul',
          items: [
            'Somebody plays their **last card** — they win the hand.',
            'The **stock runs out** and nobody can make a legal play.',
          ],
        },
        {
          type: 'p',
          text: 'Either way, everyone still holding cards counts them up as penalties.',
        },
      ],
    },

    {
      id: 'scoring',
      title: 'Scoring',
      body: [
        {
          type: 'table',
          headers: ['Card left in hand', 'Penalty'],
          rows: [
            ['King', '**10 points**'],
            ['Every other card', '**1 point** each'],
          ],
        },
        {
          type: 'p',
          text: 'The player who went out scores **nothing**, which is the object. Keep a running total across hands; when anybody reaches the agreed target — **25 or 50** is usual — the game stops and the **lowest** total wins.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Kings are ten points each in your hand and the only card that can open a corner. Holding one waiting for the perfect moment is how a comfortable hand turns into a twenty-point one.',
        },
        {
          type: 'p',
          text: 'Plenty of tables skip scoring entirely and simply call whoever went out the winner. That works, but it removes the reason to dump high cards, which is most of the tactics.',
        },
      ],
    },
  ],

  cardLibrary: {
    intro: 'Only the King behaves differently — and it is both the most useful card and the most expensive one to be caught with.',
    entries: [
      { rank: 'K', name: 'King', value: '10', effect: 'The only card that can open a corner pile. Ten penalty points if you are still holding it.', tags: ['special'] },
      { rank: 'Q', name: 'Queen', value: '1', effect: 'Plays onto a King of the opposite colour. Nothing special otherwise.', tags: ['plain'] },
      { rank: '2–J', name: 'Number and Jack', value: '1', effect: 'Ordinary. One lower, opposite colour, onto anything.', tags: ['plain'] },
      { rank: 'A', name: 'Ace', value: '1', effect: 'Lowest card — nothing plays on top of it, so an Ace can dead-end a pile.', tags: ['plain'] },
    ],
  },

  drills: [
    {
      id: 'legal-play',
      title: 'Find the legal play',
      prompt: 'A pile is topped by the 9♥. Which card from your hand can you play on it?',
      options: [
        { faces: ['8♠'], correct: true },
        { faces: ['8♦'] },
        { faces: ['10♠'] },
        { faces: ['9♣'] },
      ],
      correctText: 'One rank lower and the opposite colour. The 9♥ is red, so it takes a black 8 — spades or clubs.',
      wrongText: 'You need **one lower** and the **opposite colour**. `8♦` is red like the 9♥; `10♠` is higher; `9♣` is the same rank.',
    },
    {
      id: 'open-corner',
      title: 'Open a corner',
      prompt: 'A corner space is empty. Which card can you put there?',
      options: [
        { faces: ['K♠'], correct: true },
        { faces: ['A♥'] },
        { faces: ['Q♦'] },
        { faces: ['10♣'] },
      ],
      correctText: 'Only a King opens a corner. Any suit will do — the restriction is rank, not colour.',
      wrongText: 'Corners are for **Kings only**. An empty *side* position will take any card, but the four corners will not.',
    },
  ],

  variations: [
    {
      name: 'Draw at the end of your turn',
      description: 'Pagat describes the draw as the **last** action rather than the first, so the card you pick up cannot be played until your next turn. It makes the game slower and slightly harder. Bicycle puts the draw first. Both are widely played — just agree which.',
    },
    {
      name: 'No scoring, first out wins',
      description: 'Skip penalty points and simply declare whoever empties their hand the winner. Fine for one round, but with nothing at stake for the cards you hold there is no reason to shed Kings early.',
    },
    {
      name: 'Kings score 25',
      description: 'Some tables raise the King penalty from 10 to 25, which makes holding one genuinely frightening and pushes players to open corners at the first opportunity.',
    },
    {
      name: 'Aces high',
      description: 'Let an Ace sit on a 2, so piles can keep growing past the Ace instead of dead-ending. A small change that noticeably reduces the number of stuck layouts.',
    },
    {
      name: 'Two decks for five or more',
      description: 'Four is the practical ceiling on one deck. With two decks shuffled together you can seat six, though the layout sprawls and turns get slow.',
    },
  ],

  hints: [
    'Play your Kings early. They are ten points in your hand and they create the corner piles you will need later — there is almost never a good reason to hold one.',
    'Look for pile moves before hand plays. Consolidating two piles frees a space, and a free space takes any card you like.',
    'Count what is still out. If both black 8s have gone, a pile topped by a red 9 is dead and there is no point planning around it.',
    'Dump high cards first when you are stuck. A hand of low cards scores almost nothing even if you never go out.',
    'Watch what the player after you needs. Filling the space they were about to use costs you nothing and can strand them for a turn.',
    'An Ace on top of a pile kills it — nothing plays above an Ace unless you are using the Aces-high variation.',
  ],

  faq: [
    {
      q: 'Can I play more than one card per turn?',
      a: 'Yes, as many as you can. There is no limit on plays — only on the draw, which is one card. A good turn can clear four or five cards from your hand.',
    },
    {
      q: 'Do I have to play if I can?',
      a: 'No. Passing up a legal play is allowed and sometimes right, usually to avoid opening a space the next player needs.',
    },
    {
      q: 'What goes in the corners?',
      a: 'Kings, and only Kings. The four side positions will accept any card once they are empty, but a corner cannot be started with anything else.',
    },
    {
      q: 'Do I draw at the start or the end of my turn?',
      a: 'Sources genuinely disagree. Bicycle says the **start**, which is what most people play and what is described above; Pagat says the **end**. Agree before you deal — it changes the pace noticeably.',
    },
    {
      q: 'What happens if everyone gets stuck?',
      a: 'If the stock is empty and nobody can move, the hand ends there and everyone scores the cards in their hand. Nobody gets the zero.',
    },
    {
      q: 'Is this just solitaire with extra people?',
      a: 'Mechanically it is very close — descending, alternating colours, foundation piles. The difference is that everyone shares one layout, so every play you make changes what the next person can do.',
    },
  ],

  cheatSheet: {
    setup: '**Seven cards** each. Stock in the middle, four cards face up around it as a cross. The four **corners** start empty.',
    turn: [
      '**Draw one card** from the stock.',
      'Make **as many plays as you like** — hand to pile, King to a corner, or move a whole pile onto another.',
      'Pass to the left when you are done or stuck.',
    ],
    keyRules: [
      'Plays go **one rank lower, opposite colour**.',
      'Only a **King** can open one of the four corners.',
      'An empty **side** position accepts any card from your hand.',
      'Whole piles may be moved onto other piles under the same rule.',
    ],
    scoring: 'Going out scores **0**. Everyone else: **King 10**, every other card **1**. Play to **25 or 50** — **lowest total wins**.',
  },

  scoring: { mode: 'low', target: 50, unit: 'penalty points' },
};
