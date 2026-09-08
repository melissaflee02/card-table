export default {
  slug: 'spades',
  name: 'Spades',
  suit: '♠',
  aliases: ['Call Bridge'],
  tagline: 'Bid what you think you can take, then take exactly that. Greed is punished twice.',
  players: { min: 4, max: 4, note: 'two partnerships' },
  time: { min: 30, max: 45 },
  difficulty: 'medium',
  deck: 'standard',
  tags: ['trick-taking'],
  keywords: ['partnership', 'bidding', 'nil', 'bags', 'trump', 'call bridge'],
  objective:
    'With your partner, bid the number of tricks you will take — then take at least that many. Overshoot and the bags pile up until they cost you 100 points.',

  sections: [
    {
      id: 'setup',
      title: 'The deal',
      body: [
        {
          type: 'p',
          text: 'Four players in two fixed partnerships, partners sitting **opposite** each other. Deal the whole deck one card at a time, clockwise — **13 cards each**.',
        },
        {
          type: 'p',
          text: 'Cards rank **A K Q J 10 9 8 7 6 5 4 3 2** in every suit. Spades are permanently **trump**: any spade beats any card of any other suit.',
        },
      ],
    },
    {
      id: 'bidding',
      title: 'Bidding',
      lede: 'Everyone bids once, and the two partners’ bids simply add together.',
      body: [
        {
          type: 'ol',
          items: [
            'Starting left of the dealer, each player names the number of tricks they expect to win — **0 to 13**.',
            'Bids do not have to rise, and you cannot change yours once said.',
            'Your side’s target is the **sum of both partners’ bids**. There are 13 tricks to share out.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          text: 'The two sides’ bids do not have to add up to 13. If everyone bids cautiously the table might only bid 10, and the extra three tricks become bags for whoever takes them.',
        },
      ],
    },
    {
      id: 'nil',
      title: 'Nil bids',
      body: [
        {
          type: 'p',
          text: 'Bidding **Nil** is a promise to win **no tricks at all**. It scores separately from your partner, who still plays for their own bid.',
        },
        {
          type: 'table',
          headers: ['Bid', 'Made', 'Failed'],
          rows: [
            ['**Nil**', '+100', '−100'],
            ['**Blind nil**', '+200', '−200'],
          ],
        },
        {
          type: 'p',
          text: '**Blind nil** is declared before you look at your hand, and most tables only allow it when your side is 100 or more points behind. After the bids are in, blind-nil partners swap two cards.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'A failed nil is worse than it looks: the tricks the nil bidder took do **not** help their partner make their bid, but they still count as bags against the team.',
        },
      ],
    },
    {
      id: 'play',
      title: 'Playing a trick',
      body: [
        {
          type: 'ol',
          items: [
            'The player left of the dealer leads first, and may **not** lead a spade.',
            '**Follow suit** if you can. If you cannot, play anything — including a spade.',
            'The highest **spade** wins the trick. If no spade was played, the highest card of the suit led wins.',
            'The winner leads the next trick.',
          ],
        },
        {
          type: 'diagram',
          id: 'spades-trump',
          caption:
            'This is the whole point of a trump suit. South is out of hearts, throws the lowest spade in the deck, and beats an ace with it.',
        },
        {
          type: 'p',
          text: '**Breaking spades:** you may not *lead* a spade until someone has played one on another suit, or until spades are the only cards left in your hand. You may always play one when you cannot follow suit.',
        },
      ],
    },
    {
      id: 'scoring',
      title: 'Scoring',
      body: [
        {
          type: 'table',
          headers: ['Result', 'Score'],
          rows: [
            ['Made your combined bid', '**10 × the bid**, plus 1 per overtrick'],
            ['Missed your combined bid', '**−10 × the bid**'],
            ['Every 10 bags accumulated', '**−100**'],
          ],
        },
        {
          type: 'p',
          text: 'Overtricks — tricks beyond your bid — are called **bags**, and they are the trap. Each is worth a single point now, but they accumulate across hands, and every tenth one costs your side 100.',
        },
        {
          type: 'example',
          text: 'You bid 4, your partner bids 3, and together you take 9. That is 70 points for the bid plus 2 for the bags — and two more bags on the running count.',
        },
        { type: 'p', text: 'First side to **500 points** wins. If both cross in the same hand, the higher score takes it.' },
      ],
    },
  ],

  cardLibrary: {
    intro: 'Spades are trump, so the whole deck splits into two groups: spades, and everything else.',
    entries: [
      { rank: 'A', suit: '♠', name: 'Ace of Spades', value: 'top trump', effect: 'Cannot be beaten. One guaranteed trick.', tags: ['trump'] },
      { rank: '2–K', suit: '♠', name: 'Any other spade', value: 'trump', effect: 'Beats every non-spade, however high.', tags: ['trump'] },
      { rank: 'A', name: 'Off-suit Aces', value: 'strong', effect: 'Wins its own suit — unless somebody trumps it.', tags: ['side suit'] },
      { rank: 'K', name: 'Off-suit Kings', value: 'risky', effect: 'Usually a trick, unless the Ace is still out.', tags: ['side suit'] },
      { rank: '2–8', name: 'Low side cards', value: 'safe', effect: 'The cards you want when bidding nil.', tags: ['side suit'] },
    ],
  },

  drills: [
    {
      id: 'trump',
      title: 'Trump beats rank',
      prompt: 'Hearts were led and you have no hearts. Which of these takes the trick?',
      options: [
        { faces: ['2♠'], correct: true },
        { faces: ['A♥'] },
        { faces: ['A♦'] },
        { faces: ['K♥'] },
      ],
      correctText: 'Spades are trump, so the lowest spade beats the highest heart. The A♦ is simply a discard — off-suit and not trump, it cannot win.',
      wrongText: 'The A♥ would win if nobody trumped. But any spade beats any heart, so the 2♠ takes it.',
    },
    {
      id: 'breaking',
      title: 'What can you lead?',
      prompt: 'It is your lead and nobody has played a spade yet. Which card may you lead?',
      options: [
        { faces: ['A♥'], correct: true },
        { faces: ['2♠'] },
        { faces: ['A♠'] },
        { faces: ['7♠'] },
      ],
      correctText: 'Spades are not broken yet, so you cannot lead one. Any other suit is fine.',
      wrongText: 'You may not **lead** a spade until someone has played one on another suit. You can still play spades when you cannot follow suit.',
    },
  ],

  variations: [
    { name: 'Playing to 250 or 300', description: 'A game to 500 runs long. Dropping the target to **250** or **300** keeps it to about half an hour without changing any of the tactics.' },
    { name: 'Bags cost more, or nothing', description: 'Some tables set the bag penalty at **−50 per 5 bags**, which punishes sloppy bidding harder. Others drop bags entirely — much gentler, and it removes the main reason to underbid.' },
    { name: 'Must bid at least 4 between partners', description: 'A minimum team bid stops both partners bidding 1 and coasting. Common in casual games where nobody wants a hand of pure bag-dodging.' },
    { name: 'Ten for two', description: 'A team bidding exactly 10 or more scores double if they make it and double negative if they miss. High risk, and it keeps a losing side in the game.' },
    { name: 'No blind nil', description: 'Blind nil swings 400 points and can decide a game on one lucky deal. Plenty of groups leave it out.' },
  ],

  hints: [
    'Count your certain tricks before you bid: aces, protected kings, and any spade above the 10. Bid those, then add one only if you are short of trumps.',
    'Voids are worth more than high cards. Being out of a suit means you can trump it — that is a trick from nothing.',
    'If your partner bids nil, lead your highest cards early. You want to draw the dangerous cards out while they still have low ones to throw.',
    'Watch the bag count. If you are on 8 bags, deliberately losing a trick you could win is often worth more than taking it.',
    'Do not bid a nil with a spade above the 5, or with a singleton in a side suit — you will be forced to win a trick eventually.',
    'Lead trumps early if your side bid high. Stripping spades out of the opponents’ hands protects your aces and kings later.',
  ],

  faq: [
    { q: 'Can spades be led straight away?', a: 'No. Spades must be **broken** first — somebody has to play one on a trick where they could not follow suit. The exception is a hand of nothing but spades.' },
    { q: 'What exactly is a bag?', a: 'A trick you take beyond your bid. It scores 1 point now, but every **10 bags** your side accumulates costs 100. It is why overbidding and underbidding are both punished.' },
    { q: 'Do partners’ bids get combined?', a: 'Yes — for everything except nil. Your side has one target, the sum of both bids, and either both of you make it or neither does. A nil is scored on its own.' },
    { q: 'Can you play Spades with three players?', a: 'Not properly — it is built around partnerships. For three, remove the 2♣ and deal 17 each with everyone playing solo, or pick a different trick-taking game.' },
    { q: 'What happens if the nil bidder wins a trick?', a: 'The nil fails, costing 100. The tricks they took do not count towards their partner’s bid, but they do add to the team’s bag count — a double punishment.' },
    { q: 'Is the Ace of Spades always the best card?', a: 'Yes. Spades are trump and the Ace is the highest spade, so it cannot be beaten by anything in the deck.' },
  ],

  cheatSheet: {
    setup: 'Four players, two partnerships sitting opposite. **13 cards each**. Spades are always trump. Aces high.',
    turn: [
      'Everyone bids 0–13; partners’ bids **add together** into one target.',
      '**Follow suit** if you can; otherwise play anything, including a spade.',
      'Highest **spade** wins; if none, highest card of the led suit.',
    ],
    keyRules: [
      'You may not **lead** a spade until spades are broken.',
      'The first lead of the hand can never be a spade.',
      '**Nil** = take no tricks: ±100. **Blind nil** (bid before looking): ±200.',
      'Overtricks are **bags**: +1 each, but **−100** every 10.',
    ],
    scoring: 'Made the bid: **10 × bid** + 1 per bag. Missed it: **−10 × bid**. First side to **500** wins.',
  },

  scoring: { mode: 'high', target: 500, unit: 'points' },
};
