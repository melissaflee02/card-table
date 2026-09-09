export default {
  slug: 'hearts',
  name: 'Hearts',
  suit: '♥',
  aliases: ['Black Lady', 'Black Maria'],
  tagline: 'A trick-taking game you win by losing. Avoid the hearts. Really avoid the Queen of Spades.',
  reviewed: '2026-09-08',
  sources: [
    { name: 'Pagat — Hearts', url: 'https://www.pagat.com/reverse/hearts.html' },
    { name: 'Bicycle — Hearts', url: 'https://bicyclecards.com/how-to-play/hearts' },
  ],
  players: { min: 3, max: 5, best: '4' },
  time: { min: 25, max: 40 },
  difficulty: 'medium',
  deck: 'standard',
  tags: ['trick-taking'],
  keywords: ['strategic', 'low score', 'queen of spades', 'shooting the moon', 'passing'],
  objective:
    'Take as few penalty cards as possible. Each heart costs 1 point, the Queen of Spades costs 13 — and the lowest score when someone hits 100 wins.',

  sections: [
    {
      id: 'setup',
      title: 'The deal',
      body: [
        {
          type: 'p',
          text: 'Hearts is built for **four players**, each getting 13 cards. Deal one at a time, face down, clockwise.',
        },
        {
          type: 'table',
          headers: ['Players', 'Cards each', 'Deck change'],
          rows: [
            ['3', '17', 'Remove the **2♦**'],
            ['**4** (standard)', '**13**', 'None — full 52'],
            ['5', '10', 'Remove the **2♦** and **2♣**'],
          ],
        },
        {
          type: 'p',
          text: 'Aces are high. There is **no trump suit** — spades are dangerous because of one specific card, not because they beat anything.',
        },
      ],
    },
    {
      id: 'passing',
      title: 'The pass',
      lede: 'Before a single card is played, you hand three problems to someone else.',
      body: [
        {
          type: 'p',
          text: 'After the deal, every player chooses **three cards** to pass. The direction rotates every hand:',
        },
        {
          type: 'ol',
          items: [
            'Hand 1 — pass **left**',
            'Hand 2 — pass **right**',
            'Hand 3 — pass **across** (to the player opposite)',
            'Hand 4 — **hold**. No passing at all. Often called a *keeper* hand.',
          ],
        },
        { type: 'p', text: 'Then the cycle repeats from the top.' },
        {
          type: 'diagram',
          id: 'hearts-passing',
          caption: 'Seats are lettered by compass point. On the fourth hand nobody passes, so you play the hand you were dealt.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'You must place your three cards face down and pass them **before** you look at the three coming to you. No peeking first, then deciding.',
        },
      ],
    },
    {
      id: 'play',
      title: 'Playing a trick',
      body: [
        {
          type: 'p',
          text: 'The player holding the **2♣** leads it — always, every hand. In the five-player game the 2♣ has been removed, so the **3♣** leads instead.',
        },
        {
          type: 'ol',
          items: [
            'Going clockwise, each player plays one card.',
            'You **must follow suit** if you have that suit. If you have none, you may play anything (with one exception, below).',
            'The **highest card of the suit led** wins the trick. There is no trump.',
            'The winner collects the trick face down in front of them and **leads the next one**.',
          ],
        },
        {
          type: 'diagram',
          id: 'hearts-trick',
          caption:
            'The Ace of Hearts is the highest card played here and still loses. Only clubs can win a trick that was led with clubs — so West has quietly handed East a penalty point.',
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'The first trick is protected',
          text: 'On the opening trick you may **not** play a heart or the **Q♠**, even if you cannot follow clubs. If clubs are all you are missing and hearts and the Queen are all you hold, then you may play them — but only in that genuinely stuck case.',
        },
        {
          type: 'p',
          text: '**Breaking hearts:** you may not *lead* a heart until hearts have been "broken" — that is, until someone has discarded a heart or the Q♠ on an earlier trick. You may always *follow* with a heart when you cannot follow suit. The Q♠ may be led at any time.',
        },
      ],
    },
    {
      id: 'scoring',
      title: 'Scoring',
      body: [
        {
          type: 'table',
          headers: ['Card', 'Penalty points'],
          rows: [
            ['Each heart (♥)', '1 point'],
            ['Queen of Spades (Q♠)', '**13 points**'],
            ['Everything else', '0'],
          ],
        },
        {
          type: 'p',
          text: 'That is **26 points** on the table every hand. After all 13 tricks, each player counts the penalty cards they took and adds them to a running total.',
        },
        {
          type: 'p',
          text: 'The game ends the moment any player reaches or passes **100 points**. The player with the **lowest** total at that point wins. Some groups play to 50 for a shorter game.',
        },
      ],
    },
    {
      id: 'shooting-the-moon',
      title: 'Shooting the moon',
      body: [
        {
          type: 'p',
          text: 'If you take **all 13 hearts and the Queen of Spades** in a single hand, you have shot the moon. Instead of 26 points, you choose one of:',
        },
        {
          type: 'ul',
          items: [
            'Score **0** yourself, and add **26 points to every other player**.',
            'Subtract **26 points** from your own total, leaving everyone else untouched.',
          ],
        },
        {
          type: 'p',
          text: 'Take the second option when you are near 100 and need breathing room; take the first when you are comfortably ahead and want to end the game.',
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'It is all or nothing. Take twelve hearts and the Queen and you score **25** — very nearly the worst possible hand. Do not start a moon shot you cannot finish.',
        },
      ],
    },
  ],

  variations: [
    {
      name: 'Omnibus Hearts (Jack of Diamonds)',
      description: 'The **J♦ is worth −10 points**, making it a card worth chasing rather than dodging. Adds a second axis to every hand. When shooting the moon in this variant, you must also take the J♦ — or you take it separately and still get the −10.',
    },
    {
      name: 'Playing to 50',
      description: 'End the game at **50 points** rather than 100. Roughly halves the length and makes a single bad hand much more decisive — good for one-off sessions.',
    },
    {
      name: 'New moon / no passing',
      description: 'Skip the passing phase entirely. Hands are pure card-reading with no hand-shaping, which strong players tend to dislike and casual groups often prefer.',
    },
    {
      name: 'Spot hearts',
      description: 'Hearts score their **pip value** (2–10 face value, J=11, Q=12, K=13, A=14) and the Q♠ is worth **25**. Play to 500. A much longer, more arithmetic game.',
    },
    {
      name: 'No Q♠ on the first trick — strict',
      description: 'Some tables forbid playing the Q♠ or a heart on the first trick under **any** circumstances, forcing you to break the follow-suit rule instead. Rare, but worth clarifying, since it changes opening play.',
    },
    {
      name: 'Q♠ breaks hearts',
      description: 'Whether discarding the Queen of Spades counts as breaking hearts genuinely varies. The more common rule is that it **does**. Agree before the first hand — it affects when hearts can be led.',
    },
  ],

  hints: [
    'Void yourself in a suit early. Having no diamonds means you can dump the Q♠ or a fistful of hearts the moment diamonds are led.',
    'Passing the Q♠ away is often correct, but passing A♠ and K♠ is usually better — they are the cards that get *forced* into taking the Queen.',
    'If you keep the Q♠, keep low spades with it. You want to duck under spade leads until you can drop the Queen on someone else.',
    'Lead low in long suits and high in short suits. You want to lose tricks in suits everyone still holds, and win them only when you must.',
    'Count the spades. Once the Q♠ has gone, spades become the safest suit in the deck and leading them is nearly free.',
    'Watch for a moon shot. If one player has taken every heart so far, throw them a heart at the first opportunity — even if it means eating a trick yourself.',
    'On the "hold" hand you cannot fix a bad hand, so play defensively from the first trick. Aim to take a handful of hearts rather than gambling on zero.',
  ],

  faq: [
    {
      q: 'Can Hearts be played with three or five people?',
      a: 'Yes. Remove the **2♦** for three players (17 cards each) or the **2♦ and 2♣** for five (10 cards each). Four players with the full deck is the standard game and plays best.',
    },
    {
      q: 'What does "breaking hearts" actually mean?',
      a: 'Hearts are broken once a heart or the Q♠ has been **discarded** on a trick where someone could not follow suit. Until then, nobody may *lead* a heart. Following suit with a heart is always allowed.',
    },
    {
      q: 'Can I lead the Queen of Spades whenever I want?',
      a: 'Yes. The Q♠ is not restricted the way hearts are — it can be led at any time after the first trick. Leading it is usually a bad idea, since you will probably take it yourself.',
    },
    {
      q: 'Who leads the first trick?',
      a: 'Whoever holds the **2♣** after passing, and they must lead exactly that card. The exception is the **five-player** game, where the 2♣ is removed from the deck — there the **3♣** leads.',
    },
    {
      q: 'What happens if two players tie for lowest?',
      a: 'Standard practice is that the tied players are **joint winners**. If you want a single winner, play one more hand with only the tied players’ scores counting.',
    },
    {
      q: 'Is there a trump suit?',
      a: 'No. The highest card of the **suit led** always wins the trick. Spades are only dangerous because of the Queen, not because they outrank anything.',
    },
    {
      q: 'Why is it also called Black Lady?',
      a: 'Because the Queen of Spades — the black lady — is the card the entire game revolves around. **Black Maria** is a closely related British version with slightly different penalty cards.',
    },
  ],

  cardLibrary: {
    intro: 'Only two things score, and you are trying to avoid both of them.',
    entries: [
      { rank: 'Q', suit: '♠', name: 'Queen of Spades', value: '13', effect: 'The card the whole game is about.', tags: ['penalty'] },
      { rank: 'A', suit: '♥', name: 'Any heart', value: '1', effect: 'One point each. Thirteen of them in the deck.', tags: ['penalty'] },
      { rank: '2', suit: '♣', name: 'Two of Clubs', value: '0', effect: 'Always leads the first trick.', tags: ['special'] },
      { rank: 'J', suit: '♦', name: 'Jack of Diamonds', value: '−10', effect: 'Worth minus ten — but only in the Omnibus variant.', tags: ['variant'] },
      { rank: '—', name: 'Everything else', value: '0', effect: 'Harmless. Spades other than the Queen included.', tags: ['scoring'] },
    ],
  },

  drills: [
    {
      id: 'trick',
      title: 'Who takes the trick?',
      prompt: 'North led 7♣. These three follow. Which card wins the trick?',
      options: [
        { faces: ['K♣'], correct: true },
        { faces: ['A♥'] },
        { faces: ['2♣'] },
        { faces: ['7♣'] },
      ],
      correctText: 'Highest card of the suit that was led. The Ace of Hearts is higher, but hearts were not led — it cannot win.',
      wrongText: 'There is no trump in Hearts. Only clubs can win a trick led with clubs, so the highest club takes it.',
    },
    {
      id: 'penalty',
      title: 'Spot the expensive one',
      prompt: 'Which of these costs you 13 points if you take it?',
      options: [
        { faces: ['Q♠'], correct: true },
        { faces: ['Q♥'] },
        { faces: ['K♠'] },
        { faces: ['A♠'] },
      ],
      correctText: 'The Queen of Spades alone is 13. Every other spade is harmless.',
      wrongText: 'Spades are only dangerous because of one card. The K♠ and A♠ score nothing; Q♥ is a heart, worth 1.',
    },
  ],

  cheatSheet: {
    setup: 'Four players, **13 cards each**, full 52-card deck. Aces high, no trump. Pass **three cards**: left, right, across, then hold — repeating.',
    turn: [
      'Holder of the **2♣** leads it to start the hand.',
      '**Follow suit** if you can; otherwise play anything.',
      '**Highest card of the suit led** takes the trick and leads the next.',
    ],
    keyRules: [
      'Penalties: each **heart = 1**, **Q♠ = 13**. 26 points per hand.',
      'No heart or **Q♠** on the **first trick** unless you have nothing else.',
      'Cannot **lead** hearts until hearts are broken (a heart or the Q♠ has been discarded).',
      '**Shoot the moon:** take all 13 hearts + Q♠ → score 0 and give everyone else 26, or take −26 yourself.',
    ],
    scoring: 'Add penalties to a running total each hand. Game ends when someone reaches **100**. **Lowest total wins.**',
  },

  scoring: { mode: 'low', target: 100, unit: 'points' },
};
