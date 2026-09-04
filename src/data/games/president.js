export default {
  slug: 'president',
  name: 'President',
  suit: '♣',
  aliases: ['Scum', 'Kings and Assholes', 'Bum', 'Landlord'],
  tagline: 'Shed your cards, climb the social ladder, and make last place hand over their best card.',
  players: { min: 4, max: 7, best: '5–6' },
  time: { min: 20, max: 40 },
  difficulty: 'easy',
  deck: '1 standard 52-card deck',
  tags: ['shedding', 'party'],
  keywords: ['climbing', 'scum', 'asshole', 'big two', 'ranks', 'easy'],
  objective:
    'Be the first to empty your hand. Finishing order sets everyone’s rank for the next hand — and the winner gets a tax on the loser’s best cards.',

  sections: [
    {
      id: 'setup',
      title: 'The deal',
      body: [
        {
          type: 'p',
          text: 'Deal the **entire deck** out clockwise, one card at a time. With 4–7 players it will not divide evenly and some players will have one extra card. That is normal and nobody adjusts for it.',
        },
        {
          type: 'p',
          text: 'Card ranking, high to low: **2, A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3**. Suits are irrelevant.',
        },
        {
          type: 'callout',
          variant: 'note',
          text: 'The **2** is the highest single card, not the lowest. The 3 is the worst card in the deck.',
        },
        {
          type: 'p',
          text: 'On the very first hand of a session nobody has a rank yet, so the player holding the **3♣** leads. After that, the President always leads.',
        },
      ],
    },
    {
      id: 'play',
      title: 'Playing a round',
      body: [
        {
          type: 'p',
          text: 'The leader plays any single card, or any **set of equal-rank cards** — a pair, a triple, or four of a kind. That sets the shape of the round.',
        },
        {
          type: 'ol',
          items: [
            'Going clockwise, each player must either **beat the previous play** or **pass**.',
            'To beat it you must play the **same number of cards** at a **higher rank**. Two 6s can only be beaten by two 7s or higher — never by a single King.',
            'Passing does not remove you from the round; you may play again if it comes back around, unless you are playing the single-round variant.',
            'When everyone has passed on the last play, the round ends. Those cards are set aside, and the player who made that last play **leads the next round** with anything they like.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Winning a round is powerful: you get to set the next shape. If you are holding three 4s, win a round and lead them — nobody can touch them with singles.',
        },
        {
          type: 'p',
          text: 'When you play your last card you are **out**, and your finishing position is locked in. Everyone else keeps playing to settle the remaining places.',
        },
      ],
    },
    {
      id: 'ranks',
      title: 'The social ranks',
      lede: 'Finishing order becomes your job title for the next hand.',
      body: [
        {
          type: 'table',
          headers: ['Finish', 'Rank', 'Privileges'],
          rows: [
            ['1st', '**President**', 'Leads every hand. Receives the Scum’s best cards. Chooses seating.'],
            ['2nd', '**Vice President**', 'Receives the Vice Scum’s best card.'],
            ['Middle', '**Citizen** (Neutral)', 'No exchange, no duties. Quietly the most comfortable place to be.'],
            ['2nd last', '**Vice Scum**', 'Gives their best card to the Vice President.'],
            ['Last', '**Scum**', 'Gives their best cards to the President. Shuffles, deals and clears the table.'],
          ],
        },
        {
          type: 'p',
          text: 'With four players there is no Citizen — you get President, VP, Vice Scum and Scum. With five or more, the middle fills up with Citizens.',
        },
      ],
    },
    {
      id: 'exchange',
      title: 'The card exchange',
      body: [
        {
          type: 'p',
          text: 'After every hand *except the first*, cards are traded before play begins:',
        },
        {
          type: 'ul',
          items: [
            'The **Scum** hands their **two best cards** to the President. The President hands back **any two cards** of their choice — usually their two worst.',
            'The **Vice Scum** hands their **single best card** to the Vice President, who hands back any one card.',
            '**Citizens** exchange nothing.',
          ],
        },
        {
          type: 'diagram',
          id: 'president-exchange',
          caption:
            'Solid arrows are forced — the loser must hand over their genuinely best cards. Dashed arrows are free choice, which is why the President usually sends back rubbish.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'The Scum has no choice about which cards to give — it must genuinely be their highest. The President chooses freely what to give back. That asymmetry is the entire engine of the game, and it makes climbing out of Scum genuinely hard.',
        },
        {
          type: 'p',
          text: 'How many cards get traded varies a lot between groups: **two-and-one** is the most common, but one-and-one is gentler and two-and-two is brutal. Decide before the first exchange, not during it.',
        },
      ],
    },
    {
      id: 'winning',
      title: 'Winning',
      body: [
        {
          type: 'p',
          text: 'President has no natural end point — it is played as a series of hands, and the winner is whoever is President when you stop. Two common ways to make that concrete:',
        },
        {
          type: 'ul',
          items: [
            '**Fixed hands** — play a set number (seven or nine is typical), and whoever is President at the end wins.',
            '**Points** — award **2 points** for President, **1** for Vice President, **0** for Citizens, **−1** for Vice Scum and **−2** for Scum. First to 10 points wins.',
          ],
        },
        {
          type: 'p',
          text: 'The points method is the fairer of the two, since being President once at the end of a session says less than being President repeatedly.',
        },
      ],
    },
  ],

  variations: [
    {
      name: 'The 2 clears the pile',
      description: 'Playing a single **2** ends the round immediately — everyone else is skipped, the cards are cleared, and the player leads again. Turns the 2 from a strong card into an escape hatch. Extremely common.',
    },
    {
      name: 'Four of a kind reverses the order',
      description: 'Playing all four of one rank **inverts the ranking** for the rest of the hand — 3s become the highest card and 2s the lowest. Chaotic and very popular. Some groups reverse the direction of play instead.',
    },
    {
      name: 'Compulsory beating',
      description: 'You **must** beat the previous play if you are able to, rather than choosing to pass. This removes most of the strategy but stops strong players from slow-rolling their high cards.',
    },
    {
      name: 'Single round of play',
      description: 'Each player gets exactly **one** chance to beat the current play. Once it comes back around, the round ends. Much faster, and passing becomes a genuine commitment.',
    },
    {
      name: 'Transparent threes',
      description: 'A **3** counts as whatever rank it is played on, letting you match any set. Since 3s are otherwise useless, this gives the Scum something to work with.',
    },
    {
      name: 'Scum seating and duties',
      description: 'Many groups seat players by rank, with the President choosing the best seat and the Scum sat next to them. The Scum also deals, clears the cards and — in some households — fetches the drinks. Cosmetic, but it is half the reason the game is fun.',
    },
    {
      name: 'Revolution',
      description: 'A player dealt **four 2s** may declare a revolution before play, immediately reversing all ranks. Rare, dramatic, and worth agreeing on in advance so nobody argues when it happens.',
    },
  ],

  hints: [
    'Pairs and triples are worth more than their face value. Two 5s beat two 4s but are untouchable by any single card — breaking up a pair to win a small round is usually a mistake.',
    'As Scum, do not try to win. You gave away your two best cards; aim for the middle and get out of the exchange entirely.',
    'As President, hand back cards that are useless *as sets*, not just low cards. Two 3s are worse for you than a 3 and a 4, because the pair is playable.',
    'Save one high card for the endgame. Being the last to hold a 2 means you win a round and get a free lead when it matters most.',
    'Count who is out. Once the strong players have finished, your low cards get much stronger — a lead of 5s can win outright against two remaining players.',
    'Lead your longest suit of matched ranks early while everyone still has cards to burn. Sets get harder to play as hands shrink.',
  ],

  faq: [
    {
      q: 'How many people do you need?',
      a: 'Four minimum, since you need a President, VP, Vice Scum and Scum. **Five or six** is the sweet spot. Above seven, add a second deck or hands get too short to be interesting.',
    },
    {
      q: 'Is the 2 high or low?',
      a: 'High — it is the **strongest single card** in the deck, above the Ace. The **3 is the lowest**. This catches out anyone who has just come from playing Hearts or Rummy.',
    },
    {
      q: 'Can I beat a pair with a single high card?',
      a: 'No. You must match the **number of cards** and exceed the rank. A pair can only be beaten by a higher pair, a triple by a higher triple.',
    },
    {
      q: 'What happens if I pass — am I out of the round?',
      a: 'In the standard game, no. You may play again next time it comes around. In the **single round** variant, a pass ends your participation in that round.',
    },
    {
      q: 'Does the Scum choose which cards to give away?',
      a: 'No, and that is the point. The Scum must hand over their genuinely **best** cards, while the President gives back whatever they like. Being Scum is meant to be difficult to escape.',
    },
    {
      q: 'Is President the same game as Big Two?',
      a: 'They are close relatives — both are climbing games with 2 as the top card. **Big Two** adds poker hands (straights, flushes, full houses) and cares about suits. President is simpler and more social.',
    },
    {
      q: 'How do we decide the overall winner?',
      a: 'Either play a fixed number of hands and crown whoever is President at the end, or score **2 / 1 / 0 / −1 / −2** by rank each hand and play to 10. The points version rewards consistency.',
    },
  ],

  cheatSheet: {
    setup: 'Deal the **whole deck** clockwise; uneven hands are fine. Ranking **2 A K Q J 10 … 4 3**, suits irrelevant. First hand: **3♣** leads. Later hands: the **President** leads.',
    turn: [
      'Play a single card or a **set of equal ranks**, beating the previous play with the **same number of cards** at a higher rank.',
      'Or **pass** — you can still play again later.',
      'Everyone passes → cards cleared, last player to play **leads the next round**.',
    ],
    keyRules: [
      'Finishing order = **President, VP, Citizens, Vice Scum, Scum**.',
      'Exchange before each later hand: **Scum → 2 best cards → President**, who returns any 2.',
      '**Vice Scum → 1 best card → VP**, who returns any 1.',
      'The Scum shuffles, deals and clears. Citizens exchange nothing.',
    ],
    scoring: 'No hand scoring. Play a fixed number of hands, or score **+2** President, **+1** VP, **0** Citizen, **−1** Vice Scum, **−2** Scum and play to 10.',
  },

  scoring: { mode: 'high', target: 10, unit: 'rank points' },
};
