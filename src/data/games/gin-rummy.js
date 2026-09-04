export default {
  slug: 'gin-rummy',
  name: 'Gin Rummy',
  suit: '♥',
  aliases: ['Gin', 'Rummy (2-player)'],
  tagline: 'Two players, ten cards each, and one long argument with the discard pile.',
  players: { min: 2, max: 2 },
  time: { min: 15, max: 30 },
  difficulty: 'medium',
  deck: '1 standard 52-card deck',
  tags: ['melds'],
  // 'jim rummy' is a common mishearing of 'gin rummy' — worth matching.
  keywords: ['two player', '2 player', 'strategic', 'rummy', 'knock', 'sets and runs', 'jim rummy', 'gin rummi'],
  objective:
    'Arrange your ten cards into sets and runs, then knock before your opponent does — scoring the difference between the cards neither of you managed to match.',

  sections: [
    {
      id: 'setup',
      title: 'The deal',
      body: [
        {
          type: 'ol',
          items: [
            'Remove the jokers. Gin Rummy uses **52 cards**, no wilds.',
            'Both players draw a card; **high card deals** (or chooses to). Deal alternates each hand after that.',
            'Deal **ten cards each**, one at a time, alternating.',
            'Place the remaining cards face down as the **stock**. Turn the top card face up beside it to start the **discard pile**.',
          ],
        },
        {
          type: 'p',
          text: 'The **non-dealer** goes first, and their only choice is whether to take that face-up card or pass. If they pass, the dealer may take it. If both pass, the non-dealer draws from the stock and normal play begins.',
        },
      ],
    },
    {
      id: 'melds',
      title: 'Sets and runs',
      lede: 'A meld is three or more cards. There are only two kinds.',
      body: [
        {
          type: 'ul',
          items: [
            '**Set** — three or four cards of the same rank. `7♠ 7♥ 7♦`',
            '**Run** — three or more consecutive cards in the same suit. `4♣ 5♣ 6♣`',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'The Ace is **low only**. `A♠ 2♠ 3♠` is a run; `Q♠ K♠ A♠` is not. This trips up almost every new player once.',
        },
        {
          type: 'p',
          text: 'A card can only live in one meld at a time. `5♠ 6♠ 7♠` plus `7♥ 7♦` does not let you use the `7♠` twice — you have a run and a *pair*, and that pair is dead weight.',
        },
      ],
    },
    {
      id: 'values',
      title: 'Card values',
      body: [
        {
          type: 'table',
          headers: ['Card', 'Points'],
          rows: [
            ['Ace', '1'],
            ['2 – 10', 'Face value'],
            ['Jack, Queen, King', '10 each'],
          ],
        },
        {
          type: 'p',
          text: 'These values only ever apply to your **deadwood** — the cards left over that are not in a meld. Cards inside melds are worth nothing, which is the whole point.',
        },
      ],
    },
    {
      id: 'your-turn',
      title: 'Your turn',
      body: [
        { type: 'p', text: 'Every turn is the same two steps, and you must do both:' },
        {
          type: 'ol',
          items: [
            '**Draw** one card — either the top of the face-down stock, or the top of the discard pile.',
            '**Discard** one card face up onto the discard pile.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          text: 'If you draw from the **discard pile**, you may not discard that same card on the same turn. Taking a card commits you to it for at least a round.',
        },
        {
          type: 'p',
          text: 'You always end your turn with ten cards. Drawing from the stock is private information; drawing from the discard pile tells your opponent exactly what you are collecting. That trade-off is the game.',
        },
      ],
    },
    {
      id: 'knocking',
      title: 'Knocking & going gin',
      body: [
        {
          type: 'p',
          text: 'When your **deadwood totals 10 points or less**, you may end the hand. Discard face down and knock on the table. Then lay out your melds and your deadwood for both to see.',
        },
        {
          type: 'ul',
          items: [
            '**Knocking** — your deadwood is 10 or under. Your opponent now gets to *lay off*.',
            '**Gin** — all ten cards form melds and your deadwood is **zero**. Your opponent may not lay off anything, and you collect a bonus.',
          ],
        },
        {
          type: 'p',
          text: 'After a normal knock, your opponent lays out their melds and may **lay off** any of their deadwood onto *your* melds — adding a `9♣` to your `10♣ J♣ Q♣`, or a fourth `7` to your set of three. Every card they lay off reduces their deadwood and your score.',
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'The undercut',
          text: 'If, after laying off, your opponent’s deadwood is **equal to or lower than yours**, they have undercut you. They score the difference plus a **25-point bonus** — despite you being the one who knocked.',
        },
      ],
    },
    {
      id: 'scoring',
      title: 'Scoring',
      body: [
        {
          type: 'table',
          headers: ['Outcome', 'Who scores', 'How much'],
          rows: [
            ['Knock', 'Knocker', 'Opponent’s deadwood − knocker’s deadwood'],
            ['Gin', 'Knocker', 'Opponent’s full deadwood **+ 25 bonus**'],
            ['Undercut', 'Opponent', 'Difference in deadwood **+ 25 bonus**'],
          ],
        },
        {
          type: 'p',
          text: 'Keep a running total. The first player to reach **100 points** wins the game — then bonuses are added:',
        },
        {
          type: 'ul',
          items: [
            '**Game bonus: 100** to the winner.',
            '**Line (box) bonus: 25** per hand won, to each player, for each hand they took.',
            '**Shutout (skunk): double the winner’s total** if the loser never scored a single point.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          text: 'Bonus values are the most variable part of Gin Rummy. Gin and undercut bonuses of **25** and a game bonus of **100** are the most widely used, but 20/20/100 is also common. Agree before the first deal.',
        },
      ],
    },
    {
      id: 'stock-runs-out',
      title: 'If the stock runs out',
      body: [
        {
          type: 'p',
          text: 'When only **two cards** remain in the stock and the player who drew has discarded, the hand is a **dead hand**. Nobody scores, and the same dealer deals again.',
        },
        {
          type: 'p',
          text: 'This is a real strategic deadline, not an edge case — if you are sitting on 14 points of deadwood late in a hand, a dead hand may be a better outcome than getting undercut.',
        },
      ],
    },
  ],

  variations: [
    {
      name: 'Oklahoma Gin',
      description: 'The face-up card at the start of the hand sets the **maximum deadwood you may knock with**. If it is a 4, you must get to 4 or under; if it is an Ace, you must go gin. A Spade as the starter doubles the whole hand’s score. This is the most popular Gin variant among regular players.',
    },
    {
      name: 'Straight Gin',
      description: 'No knocking at all — you must **go gin** to end the hand. Longer hands, no undercuts, and laying off never comes up.',
    },
    {
      name: 'Playing to 500',
      description: 'Instead of 100, play to **500 points**. Hands still score identically, but the longer game reduces the impact of one lucky gin and rewards consistent knocking.',
    },
    {
      name: 'Ace high in runs',
      description: 'Some households allow `Q K A` as a run. This makes Aces genuinely useful rather than just cheap deadwood — but it is **not** standard, so say it out loud first.',
    },
    {
      name: 'No laying off after a knock',
      description: 'Skipping the lay-off step makes scoring faster and knocking much safer, at the cost of the undercut being far less likely. Good for teaching the game, less good once everyone knows it.',
    },
  ],

  hints: [
    'Ditch high cards early. A King is ten points of deadwood; the meld it *might* join is worth less than the risk of being caught holding it.',
    'Cards that serve two purposes are gold. A `7♠` alongside `6♠` and `7♥` can become a run or a set — keep it longer than a card with one future.',
    'Watch what your opponent picks up from the discard pile. Two picks in the same suit means stop feeding that suit, even if it costs you a turn.',
    'Discard cards adjacent to what your opponent has taken *last*, not first — they have often already filled that gap and moved on.',
    'Knocking at 8 or 9 deadwood early in a hand is usually better than chasing gin. A small guaranteed score beats a large uncertain one, and it denies them a turn.',
    'Late in a hand, count the stock. If a dead hand is two turns away and you are behind, stop drawing and let the clock run out.',
  ],

  faq: [
    {
      q: 'Can Gin Rummy be played with more than two players?',
      a: 'Not as written — it is a **strictly two-player game**. With three, one player usually sits out each hand and scores nothing; with four, play two separate games or switch to **Rummy 500**, which handles groups properly.',
    },
    {
      q: 'Is the Ace high or low?',
      a: 'Low. It is worth **1 point** and forms runs only as `A 2 3`. `Q K A` is not a run in standard Gin Rummy, though some house rules allow it.',
    },
    {
      q: 'What exactly is deadwood?',
      a: 'Any card in your hand that is **not part of a completed meld**. Add up their point values — that total is what you are trying to get to 10 or under before you knock.',
    },
    {
      q: 'Can I knock on my very first turn?',
      a: 'Yes, if you were dealt ten cards that already leave you 10 or fewer points of deadwood. It is rare but entirely legal, and it is worth checking every hand.',
    },
    {
      q: 'Do I have to knock as soon as I can?',
      a: 'No. Knocking is always optional. Holding at 6 deadwood to chase gin is a legitimate gamble — you gain 25 if you make it and risk an undercut if they knock first.',
    },
    {
      q: 'What is the difference between Gin Rummy and Rummy?',
      a: 'Gin Rummy is the two-player version with hidden melds revealed only at the knock. In standard **Rummy**, players lay melds on the table as they go and any number can play. Gin has more bluffing; Rummy is more open.',
    },
  ],

  cheatSheet: {
    setup: 'Ten cards each, no jokers. Stock face down, one card face up to start the discard pile. **Non-dealer** decides first whether to take the up-card.',
    turn: [
      '**Draw** one card — stock (hidden) or discard pile (visible to your opponent).',
      '**Discard** one card face up. You may not discard the card you just took from the pile.',
      'Knock when your deadwood is **10 or under**.',
    ],
    keyRules: [
      'Melds: **sets** (same rank, 3+) and **runs** (same suit, consecutive, 3+). Ace is **low only**.',
      'Deadwood values: Ace **1**, 2–10 face value, J/Q/K **10**.',
      'After a knock the opponent may **lay off** deadwood onto your melds. After **gin**, they may not.',
      '**Undercut:** if their deadwood ends up ≤ yours, *they* score the difference + **25**.',
      'Two cards left in the stock = **dead hand**, nobody scores.',
    ],
    scoring: 'Knock = difference in deadwood. Gin = their deadwood **+ 25**. Undercut = difference **+ 25** to them. Game to **100**, then +100 game bonus and +25 per hand won.',
  },

  scoring: { mode: 'high', target: 100, unit: 'points' },
};
