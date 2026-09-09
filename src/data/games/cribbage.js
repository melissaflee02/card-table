export default {
  slug: 'cribbage',
  name: 'Cribbage',
  suit: '♦',
  aliases: ['Crib', 'Noddy'],
  tagline: 'Count to fifteen, count to thirty-one, and count the same cards twice in one hand.',
  reviewed: '2026-09-09',
  sources: [
    { name: 'Pagat — Cribbage', url: 'https://www.pagat.com/adders/crib6.html' },
    { name: 'Bicycle — Cribbage', url: 'https://bicyclecards.com/how-to-play/cribbage' },
  ],
  players: { min: 2, max: 2 },
  time: { min: 20, max: 30 },
  difficulty: 'medium',
  deck: 'standard',
  extras: ['A cribbage board, or pen and paper'],
  tags: ['counting'],
  keywords: ['crib', 'pegging', 'fifteen two', 'his nobs', 'his heels', 'muggins', 'skunk', 'cribbage board'],
  objective:
    'Be first to 121 points, scored in two places: pegged during the play, then counted from your hand at the show. The dealer also scores a bonus hand — the crib.',

  sections: [
    {
      id: 'setup',
      title: 'The deal',
      body: [
        {
          type: 'ol',
          items: [
            'Deal **six cards** to each player, one at a time. Full 52-card deck, no jokers.',
            'Each player looks at their six and **discards two face down** to form the **crib** — a fifth hand of four cards that will be scored by the **dealer** at the end.',
            'The non-dealer cuts the remaining deck; the dealer turns up the top card of the bottom portion. This is the **starter**.',
            'Both players now have four cards, and the starter counts as a fifth card for **both** hands and the crib.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          label: 'Two for his heels',
          text: 'If the starter is a **Jack**, the dealer immediately pegs **2 points**. It is the only score that happens before a card is played, and it is a real reason to want the deal.',
        },
        {
          type: 'p',
          text: 'The deal alternates every hand. Being dealer is an advantage — you get the crib — so a game is normally played over an even number of deals or simply to 121, whichever comes first.',
        },
      ],
    },

    {
      id: 'values',
      title: 'Card values',
      lede: 'Two different orderings, and mixing them up is the classic beginner error.',
      body: [
        {
          type: 'table',
          headers: ['Card', 'Counting value'],
          rows: [
            ['Ace', '1'],
            ['2 – 10', 'Face value'],
            ['Jack, Queen, King', '**10 each**'],
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'Runs use rank, not value',
          text: 'For **fifteens and thirty-ones** a King is worth 10. For **runs** it is just the card above the Queen. So `J Q K` is a run of three, but it is worth 30 towards a fifteen. The Ace is **always low** — `Q K A` is not a run.',
        },
      ],
    },

    {
      id: 'the-play',
      title: 'The play (pegging)',
      lede: 'Alternate cards, keep a running total, never go past 31.',
      body: [
        {
          type: 'ol',
          items: [
            'The **non-dealer** lays a card face up in front of them and says the total.',
            'The dealer lays one and says the new total. Alternate.',
            'The total may **never exceed 31**. If you cannot play without going over, say **"Go"**.',
            'After a Go, your opponent keeps laying cards while they can, then scores for the last card. The count resets to zero and play continues with whatever cards remain.',
          ],
        },
        {
          type: 'p',
          text: 'Cards stay in front of the player who laid them — you are not pooling them. You will need yours back for the show.',
        },
        {
          type: 'table',
          headers: ['During the play', 'Points'],
          rows: [
            ['Bringing the total to exactly **15**', '2'],
            ['Bringing the total to exactly **31**', '2'],
            ['Playing a card matching the last one (a **pair**)', '2'],
            ['A third of the same rank (**pair royal**)', '6'],
            ['A fourth of the same rank (**double pair royal**)', '12'],
            ['Completing a **run** of 3 or more with the last cards played', '1 per card'],
            ['Playing the **last card** before a reset (not on 31)', '1'],
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          label: 'Runs in the play need not be in order',
          text: 'If the last three cards laid are `5 7 6`, that is a run of three and scores 3. They only have to *form* a run, not arrive in sequence — and any intervening card breaks it.',
        },
      ],
    },

    {
      id: 'the-show',
      title: 'The show',
      lede: 'Now count the same cards again, in a fixed order.',
      body: [
        {
          type: 'p',
          text: 'Everyone takes their four cards back and scores them **together with the starter** as a five-card hand. The order matters, because the game can end mid-count:',
        },
        {
          type: 'ol',
          items: [
            '**Non-dealer\'s hand** — which is why being behind as non-dealer is not hopeless.',
            '**Dealer\'s hand.**',
            '**The crib**, which the dealer also scores.',
          ],
        },
        {
          type: 'table',
          headers: ['Combination', 'Points'],
          rows: [
            ['Each distinct set of cards totalling **15**', '2'],
            ['Each **pair**', '2'],
            ['**Run** of 3, 4 or 5', '3, 4 or 5'],
            ['**Flush** — all four hand cards one suit', '4'],
            ['**Flush** — and the starter matches too', '5'],
            ['**His nobs** — a Jack in hand matching the starter\'s suit', '1'],
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'The crib flush is stricter',
          text: 'A four-card flush scores 4 in a **hand**, but scores **nothing in the crib**. The crib only counts a flush when all five cards — including the starter — share a suit.',
        },
        {
          type: 'p',
          text: 'Every combination counts separately and cards are reused freely. Four 5s and a Jack scores **29** — the highest possible hand — because there are eight different ways to make fifteen, plus double pair royal, plus his nobs.',
        },
      ],
    },

    {
      id: 'winning',
      title: 'Winning',
      body: [
        {
          type: 'p',
          text: 'First to **121 points** wins, and the game stops the instant someone gets there — mid-count, mid-peg, mid-anything. There is no finishing the hand.',
        },
        {
          type: 'p',
          text: 'On a board, 121 is twice up the two rows of thirty holes plus the final hole. Pen and paper works identically; the board just makes it hard to lose your place.',
        },
        {
          type: 'callout',
          variant: 'note',
          label: 'Skunks',
          text: 'Winning while your opponent is still under **91** is a **skunk**, and under **61** a double skunk. It counts as two games (or four) in a match. Purely a bragging convention, but a widely observed one.',
        },
      ],
    },
  ],

  cardLibrary: {
    intro: 'Everything counts at face value except the court cards, which are all worth ten. The 5 is the most valuable card in the deck.',
    entries: [
      { rank: '5', name: 'Five', value: '5', effect: 'The best card in cribbage. Every 10-value card makes fifteen with it, and there are sixteen of those.', tags: ['key'] },
      { rank: 'J', name: 'Jack', value: '10', effect: 'Worth 1 extra as his nobs if it matches the starter\'s suit — and 2 to the dealer if it *is* the starter.', tags: ['key'] },
      { rank: 'A', name: 'Ace', value: '1', effect: 'Always low. Useful for creeping the count to 31 without busting.', tags: ['scoring'] },
      { rank: '2–4', name: 'Low cards', value: 'face', effect: 'Good for the play, where staying under 31 matters more than raw value.', tags: ['scoring'] },
      { rank: '6–9', name: 'Middle cards', value: 'face', effect: 'Ordinary. A 6 and a 9 make fifteen, as do a 7 and an 8.', tags: ['scoring'] },
      { rank: 'K', name: 'Ten, Queen, King', value: '10', effect: 'All count ten towards fifteens and thirty-ones, but rank separately for runs.', tags: ['scoring'] },
    ],
  },

  drills: [
    {
      id: 'fifteen',
      title: 'Make fifteen',
      prompt: 'The running total is 10. Which card takes it to exactly fifteen and pegs you 2?',
      options: [
        { faces: ['5♠'], correct: true },
        { faces: ['K♦'] },
        { faces: ['A♣'] },
        { faces: ['9♥'] },
      ],
      correctText: 'Ten plus five is fifteen — 2 points. This is why the 5 is the strongest card in the deck.',
      wrongText: 'You need a card worth exactly 5. The King is worth ten and would take you to 20; the Ace to 11; the 9 to 19.',
    },
    {
      id: 'nobs',
      title: 'Spot his nobs',
      prompt: 'The starter is the 8♣. Which card in your hand is worth an extra point?',
      options: [
        { faces: ['J♣'], correct: true },
        { faces: ['J♥'] },
        { faces: ['8♠'] },
        { faces: ['K♣'] },
      ],
      correctText: 'His nobs is the **Jack matching the starter\'s suit**. The starter is a club, so `J♣` scores 1.',
      wrongText: 'It has to be a Jack *and* the same suit as the starter. `J♥` is the right rank but the wrong suit; `8♠` pairs the starter but that is a different score.',
    },
  ],

  variations: [
    {
      name: 'Muggins',
      description: 'If you undercount your own hand, your opponent may call **"Muggins"** and peg the points you missed. Standard in serious play and usually dropped when teaching — it punishes exactly the mistake a beginner makes constantly.',
    },
    {
      name: 'Three-handed cribbage',
      description: 'Deal **five cards** each plus one straight into the crib, so everyone discards only one. Play passes left and each player has their own peg line. Works well and is much less common than the two-player game.',
    },
    {
      name: 'Four-handed partnership',
      description: 'Two teams of two, partners opposite, **five cards** each with one discard to the crib. Partners share a peg line. This is the tournament format in much of the world.',
    },
    {
      name: 'Playing to 61',
      description: 'A short game, once round the board rather than twice. Common as a lunch-break game, and it makes the dealer advantage matter more since there are fewer hands to even it out.',
    },
    {
      name: 'Five-card cribbage',
      description: 'The older English game: **five cards** dealt, two to the crib, and the game is to **61**. The non-dealer pegs **3 for last** at the start as compensation. A genuinely different game rather than a house rule.',
    },
    {
      name: 'No muggins, no skunks',
      description: 'Plenty of casual tables drop both. Neither changes the mechanics — they only add stakes to miscounting and to losing badly.',
    },
  ],

  hints: [
    'Keep **5s**. There are sixteen cards worth ten in the deck, so any 5 you hold has sixteen partners waiting to make fifteen.',
    'What you throw to the crib matters as much as what you keep. If it is **your** crib, throw cards that work together; if it is theirs, throw the junk — a King and an Ace, never two cards five apart.',
    'Never lead a 5. Your opponent almost certainly has a ten-value card and will peg 2 immediately.',
    'Leading a 4 or a low card is safer than leading a 6, 7, 8 or 9, because those let the opponent reach fifteen in one card.',
    'Count your hand before you discard. A hand that looks like 8 points often has a run or a fourth fifteen you have not spotted.',
    'Late in the game, position beats points. If you can reach 121 during the play, you never have to show your hand at all.',
  ],

  faq: [
    {
      q: 'Do I really need a cribbage board?',
      a: 'No. A board is only a scorekeeper — pen and paper does the same job, and so does the tracker on this page. The board is popular because scores change several times per hand and a running written tally gets messy fast.',
    },
    {
      q: 'Whose crib is it?',
      a: 'Always the **dealer\'s**, and it is scored last. Both players contribute two cards to it, which is why discarding to your opponent\'s crib is a genuine decision rather than a throwaway.',
    },
    {
      q: 'Can the same card be used in more than one combination?',
      a: 'Yes, freely. A 5 can be part of three different fifteens, a pair and a run all at once, and each scores separately. This is why hands score higher than beginners expect.',
    },
    {
      q: 'What is the highest possible hand?',
      a: '**29** — three 5s and the Jack of the fourth suit, with the fourth 5 as the starter. That is eight fifteens (16), double pair royal (12) and his nobs (1). It is extremely rare.',
    },
    {
      q: 'What happens if I miscount my hand?',
      a: 'If you are playing **muggins**, your opponent claims the points you missed. Without it, you simply lose them. Either way, once you have pegged and moved on, the count is settled.',
    },
    {
      q: 'Does the game really end mid-count?',
      a: 'Yes. The moment a peg reaches 121 the game is over — the rest of the hand is not scored. It is why the non-dealer counting first genuinely matters.',
    },
    {
      q: 'Why is it called a crib?',
      a: 'The crib is the extra hand "cribbed" from both players\' discards. The game was devised by the English poet Sir John Suckling in the early 1600s, adapted from an older game called Noddy.',
    },
  ],

  cheatSheet: {
    setup: '**Six cards each**. Both discard **two to the crib** (dealer scores it). Non-dealer cuts, dealer turns the **starter**. Jack as starter = **2 for his heels**.',
    turn: [
      'Alternate single cards, calling the running total. **Never exceed 31.**',
      'Cannot play? Say **"Go"** — opponent plays on, then scores the last card.',
      'Peg as you go: **15** = 2, **31** = 2, pair = 2, run = 1 per card, last card = 1.',
    ],
    keyRules: [
      'Values: A **1**, 2–10 face value, **J/Q/K = 10**. Runs use rank; the Ace is **always low**.',
      'The show counts **hand + starter** as five cards: fifteens **2** each, pairs **2**, runs **1 per card**, flush **4** (**5** with the starter), his nobs **1**.',
      'Count in order: **non-dealer, dealer, crib**. The game can end mid-count.',
      'A four-card flush scores **nothing in the crib** — the crib needs all five.',
    ],
    scoring: 'First to **121** wins, immediately, wherever the peg lands. Under 91 at the end is a **skunk**.',
  },

  scoring: { mode: 'high', target: 121, unit: 'points' },
};
