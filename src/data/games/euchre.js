export default {
  slug: 'euchre',
  name: 'Euchre',
  suit: '♣',
  aliases: ['Écarté (unrelated)', 'Knock Euchre'],
  tagline: 'Twenty-four cards, five tricks, and two Jacks that are not the Jacks you think they are.',
  reviewed: '2026-09-09',
  sources: [
    { name: 'Pagat — Euchre', url: 'https://www.pagat.com/euchre/euchre.html' },
    { name: 'Bicycle — Euchre', url: 'https://bicyclecards.com/how-to-play/euchre' },
  ],
  players: { min: 4, max: 4, note: 'two partnerships' },
  time: { min: 20, max: 30 },
  difficulty: 'medium',
  deck: 'standard',
  deckNote: 'using only the 9 through Ace — 24 cards',
  tags: ['trick-taking'],
  keywords: ['bower', 'right bower', 'left bower', 'trump', 'partnership', 'going alone', 'euchred', 'midwest'],
  objective:
    'With your partner, win at least three of the five tricks in a hand after one of you has named trump. Name it and fail, and the other side scores instead.',

  sections: [
    {
      id: 'setup',
      title: 'The deck and the deal',
      body: [
        {
          type: 'p',
          text: 'Euchre uses a **24-card deck**: only the **9, 10, Jack, Queen, King and Ace** of each suit. Strip everything from the 2 to the 8 out of a standard pack and set it aside.',
        },
        {
          type: 'ol',
          items: [
            'Four players in two partnerships, partners sitting **opposite** each other.',
            'Deal **five cards** to each player, in packets of two and three, going clockwise.',
            'Place the four remaining cards face down in the middle and **turn the top one face up**. That card is the **up-card**, and it proposes a trump suit.',
          ],
        },
        {
          type: 'p',
          text: 'A common way to pick the first dealer is to deal cards around face up until a **black Jack** appears; whoever gets it deals. After that the deal passes to the left.',
        },
      ],
    },

    {
      id: 'bowers',
      title: 'The bowers',
      lede: 'The one rule that makes Euchre Euchre. Get this wrong and nothing else works.',
      body: [
        {
          type: 'p',
          text: 'Once a suit is trump, **the two Jacks of that colour become the two highest cards in the game** — and the off-suit one changes suit for the whole hand.',
        },
        {
          type: 'ul',
          items: [
            '**Right bower** — the Jack of the trump suit. The highest card in the deck.',
            '**Left bower** — the *other* Jack of the same colour. It **becomes a trump card**, second only to the right bower, and stops being a member of its printed suit entirely.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'The left bower is not its own suit any more',
          text: 'If **hearts** are trump, the `J♦` is a heart for this hand. If diamonds are led, you may **not** play it to follow suit — and if hearts are led, you **must**. This catches out every new player exactly once.',
        },
        {
          type: 'table',
          headers: ['Trump suit', 'Right bower', 'Left bower'],
          rows: [
            ['Hearts ♥', '`J♥`', '`J♦`'],
            ['Diamonds ♦', '`J♦`', '`J♥`'],
            ['Spades ♠', '`J♠`', '`J♣`'],
            ['Clubs ♣', '`J♣`', '`J♠`'],
          ],
        },
        {
          type: 'p',
          text: 'Trump therefore ranks: **right bower, left bower, A, K, Q, 10, 9**. Every other suit ranks normally — A, K, Q, J, 10, 9 — except the suit that lost its Jack to the bowers, which is one card short.',
        },
      ],
    },

    {
      id: 'making-trump',
      title: 'Naming trump',
      lede: 'Two rounds, and the second one is stricter than the first.',
      body: [
        {
          type: 'p',
          text: '**Round one — the up-card.** Starting to the dealer\'s left, each player may **order it up** (accept the up-card\'s suit as trump) or **pass**.',
        },
        {
          type: 'ul',
          items: [
            'If someone orders it up, that suit is trump. The **dealer picks the up-card into their hand** and discards any card face down.',
            'The dealer\'s partner ordering it up is called **assisting**; the dealer accepting it themselves is **taking it up**.',
          ],
        },
        {
          type: 'p',
          text: '**Round two — anything but that suit.** If all four pass, the up-card is turned face down. Going round again from the dealer\'s left, each player may now **name any suit except the up-card\'s suit**, or pass.',
        },
        {
          type: 'callout',
          variant: 'note',
          label: 'Whoever names trump is "the maker"',
          text: 'Their side has taken on the contract: **win at least three tricks**. The other side are the defenders, and they are trying to euchre them.',
        },
        {
          type: 'p',
          text: 'If all four pass a second time the hand is dead — throw it in and the next player deals. Many tables instead play **stick the dealer**, where the dealer is forced to name a suit rather than pass. Agree which before you start.',
        },
      ],
    },

    {
      id: 'going-alone',
      title: 'Going alone',
      body: [
        {
          type: 'p',
          text: 'After trump is settled but **before the first card is led**, the maker may declare they are **going alone**. Their partner lays their hand face down and sits the hand out entirely.',
        },
        {
          type: 'p',
          text: 'One player against two, for all five tricks. It is worth doing because the payoff is double — and it is why holding both bowers plus an Ace is worth announcing rather than quietly playing.',
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'A lone hand needs roughly the two bowers and one more certain trick. With only one bower, the odds turn against you fast — you are giving up a partner who could have taken a trick for you.',
        },
      ],
    },

    {
      id: 'play',
      title: 'Playing the tricks',
      body: [
        {
          type: 'ol',
          items: [
            'The player to the **dealer\'s left** leads first, with any card.',
            '**Follow suit if you can.** Remember the left bower counts as trump, not as its printed suit.',
            'If you cannot follow, play anything — including a trump.',
            'The **highest trump** wins the trick; if no trump was played, the **highest card of the suit led** wins. The winner leads the next trick.',
          ],
        },
        {
          type: 'p',
          text: 'Five tricks, and the hand is over. There is no drawing and no discarding after the deal — everything is decided by what you were given and what you name as trump.',
        },
      ],
    },

    {
      id: 'scoring',
      title: 'Scoring',
      body: [
        {
          type: 'table',
          headers: ['Outcome', 'Points'],
          rows: [
            ['Makers take **3 or 4** tricks', '**1**'],
            ['Makers take **all 5** (a *march*)', '**2**'],
            ['Lone player takes **3 or 4** tricks', '**1**'],
            ['Lone player takes **all 5**', '**4**'],
            ['Makers take **fewer than 3** — they are *euchred*', '**2 to the defenders**'],
          ],
        },
        {
          type: 'p',
          text: 'First side to **10 points** wins. Being euchred is the thing to avoid: it hands the opposition two points, the same as a march, for the crime of over-estimating your hand.',
        },
        {
          type: 'callout',
          variant: 'note',
          label: 'Keeping score with the spare cards',
          text: 'Traditionally each side keeps score with two of the discarded low cards — a 5 and a 6, or a pair of 4s — arranged face up to show the running total. Any pen and paper does the same job.',
        },
      ],
    },
  ],

  cardLibrary: {
    intro: 'Trump ranking, once a suit is named. The bowers are the whole game — everything else behaves normally.',
    entries: [
      { rank: 'J', suit: '♥', name: 'Right bower', value: 'highest', effect: 'The Jack of the trump suit. Beats everything.', tags: ['trump'] },
      { rank: 'J', suit: '♦', name: 'Left bower', value: '2nd', effect: 'The other Jack of the same colour. Becomes trump and leaves its printed suit.', tags: ['trump'] },
      { rank: 'A', name: 'Ace of trump', value: '3rd', effect: 'The highest ordinary trump.', tags: ['trump'] },
      { rank: 'K', name: 'King of trump', value: '4th', effect: 'Strong, but both bowers and the Ace beat it.', tags: ['trump'] },
      { rank: '9', name: 'Nine of trump', value: 'lowest trump', effect: 'Still beats every card in every other suit.', tags: ['trump'] },
      { rank: 'A', name: 'Off-suit Ace', value: 'side suit', effect: 'Wins its own suit unless somebody trumps it.', tags: ['side suit'] },
      { rank: '9', name: 'Off-suit nine', value: 'side suit', effect: 'Nearly worthless. Good only for discarding.', tags: ['side suit'] },
    ],
  },

  drills: [
    {
      id: 'left-bower',
      title: 'Find the left bower',
      prompt: 'Spades are trump. Which card is the second-highest in the game?',
      options: [
        { faces: ['J♣'], correct: true },
        { faces: ['J♠'] },
        { faces: ['A♠'] },
        { faces: ['J♥'] },
      ],
      correctText: 'Clubs are the other black suit, so `J♣` becomes the left bower — trump, and beaten only by `J♠`.',
      wrongText: 'The left bower is the Jack of the **same colour** as trump. Spades are black, so it is the Jack of clubs. `J♠` is the right bower, which is higher still.',
    },
    {
      id: 'follow-suit',
      title: 'Follow suit with a bower',
      prompt: 'Hearts are trump and a diamond is led. You hold J♦. What can you do with it?',
      options: [
        { faces: ['J♦'], correct: true },
        { faces: ['9♦'] },
        { faces: ['A♦'] },
        { faces: ['K♦'] },
      ],
      correctText: 'Nothing — it is not a diamond any more. With hearts as trump the `J♦` is the left bower, so it cannot follow a diamond lead. Play a real diamond if you hold one.',
      wrongText: 'The `J♦` has become a heart for this hand. If you hold any of the other diamonds you must play one of those instead.',
    },
  ],

  variations: [
    {
      name: 'Stick the dealer',
      description: 'If everyone passes twice, the dealer **must** name a suit rather than throw the hand in. Very widely played — it stops a table passing out three deals in a row, and it makes the dealer position genuinely risky.',
    },
    {
      name: 'Going under / farmer\'s hand',
      description: 'A player dealt nothing above a 10 may declare it and swap three cards with the four in the kitty. Rare, but it saves a hopeless hand. Agree before dealing, since it changes the odds on a lone call.',
    },
    {
      name: 'Playing to 5 or 11',
      description: 'Ten points is standard in North America. **Five** makes for a very quick game and **11** a longer one. Some tables play to 15 with a two-point win required.',
    },
    {
      name: 'No trump / notrump',
      description: 'Some groups allow a player to call no trump, where the hand is played with no bowers and Aces high. Not standard, and it changes the bowers rule that defines the game — say so explicitly if you use it.',
    },
    {
      name: 'Three-handed and two-handed Euchre',
      description: 'With **three**, everyone plays for themselves and the maker takes on both opponents. With **two**, deal from a reduced pack. Both work, but neither has the partnership signalling that makes the four-player game good.',
    },
  ],

  hints: [
    'Count trumps, not cards. There are only **seven** trumps in a 24-card deck once the bowers join, so if four have gone, three remain and you can usually work out who has them.',
    'Do not order up a suit just because you hold the right bower. One bower and nothing else is a two-trick hand, and three tricks is the bar.',
    'If your partner has ordered it up, lead trump. They have told you they hold strength in it, and drawing the opponents\' trumps protects their Aces.',
    'Holding the left bower and nothing else in trump is worth less than it feels. It wins one trick and then you are void.',
    'As a defender, leading a suit the makers are likely void in is how you force them to burn a trump early.',
    'The dealer sees one extra card and discards one. If you are the dealer, discarding down to a **void suit** is usually stronger than keeping a lone Ace in it.',
  ],

  faq: [
    {
      q: 'Why only 24 cards?',
      a: 'Euchre is a five-trick game, so a full deck would leave most of it unused and make trump distribution unpredictable. Stripping to **9 through Ace** means almost every card dealt matters. Some regions play with 25 cards by adding a Joker as the highest trump.',
    },
    {
      q: 'Is the left bower really trump?',
      a: 'Yes, completely. For the duration of that hand it is a member of the trump suit and nothing else — it cannot follow its printed suit, and it must follow a trump lead. This is the single most-argued point in the game and the answer is not in dispute.',
    },
    {
      q: 'Can I look at the up-card after it is turned down?',
      a: 'No. Once it is turned face down it is out of play and out of the conversation, though everyone is entitled to remember what it was.',
    },
    {
      q: 'What happens if we both reach 10 in the same hand?',
      a: 'Only one side scores in any hand, so it cannot happen. Either the makers score or the defenders do.',
    },
    {
      q: 'Can my partner tell me to go alone?',
      a: 'No. Going alone is your decision and table talk about hand strength is cheating. The signalling in Euchre is all in which cards you lead.',
    },
    {
      q: 'What does "euchred" actually mean?',
      a: 'Your side named trump and then failed to win three tricks. The opponents score **2 points** for it. The word predates the card game as a term for being outwitted.',
    },
  ],

  cheatSheet: {
    setup: '**24 cards** (9–A only). Four players, partners opposite. **Five cards each**, four in the middle, top one turned up.',
    turn: [
      'Round 1: order up the up-card\'s suit, or pass. Dealer picks it up and discards.',
      'Round 2: if all pass, name **any suit except** the up-card\'s. Or pass again.',
      'Follow suit if you can. Highest trump wins, else highest card of the suit led.',
    ],
    keyRules: [
      'Trump order: **right bower** (J of trump), **left bower** (other J of that colour), then A K Q 10 9.',
      'The **left bower is trump**, not its printed suit. It cannot follow that suit.',
      'The maker\'s side must win **3 of 5 tricks**.',
      '**Going alone**: declared before the first lead, partner sits out, all five tricks needed for the bonus.',
    ],
    scoring: 'Makers 3–4 tricks **1**, all five **2**. Alone: 3–4 tricks **1**, all five **4**. **Euchred** (makers take fewer than 3): **2 to the defenders**. Game to **10**.',
  },

  scoring: { mode: 'high', target: 10, unit: 'points' },
};
