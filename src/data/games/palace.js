export default {
  slug: 'palace',
  name: 'Palace',
  suit: '♠',
  aliases: ['Shithead', 'Karma', 'Shed'],
  tagline: 'Get rid of every card. Three of them are face down and you have no idea what they are.',
  players: { min: 2, max: 6, best: '3–5' },
  time: { min: 10, max: 20 },
  difficulty: 'easy',
  deck: 'standard',
  tags: ['shedding', 'bluffing', 'party'],
  keywords: ['shithead', 'shit head', 'karma', 'shed', 'pile', 'burn', 'easy'],
  objective:
    'Empty your hand, then your three face-up cards, then your three face-down cards. The last player still holding anything loses — and deals the next round.',

  sections: [
    {
      id: 'setup',
      title: 'Setup',
      body: [
        { type: 'p', text: 'Each player gets **nine cards**, dealt in three layers:' },
        {
          type: 'ol',
          items: [
            '**Three face down** in a row in front of them. Nobody looks at these, including you.',
            '**Three face up**, one on top of each face-down card.',
            '**Three in hand**, held privately.',
          ],
        },
        {
          type: 'p',
          text: 'The rest of the deck goes face down in the middle as the **draw pile**.',
        },
        {
          type: 'diagram',
          id: 'palace-layers',
          caption:
            'Nine cards each, in three layers. You play the hand first, then the face-up row, then the face-down row — and you only find out what those last three are as you flip them.',
        },
        {
          type: 'callout',
          variant: 'tip',
          label: 'The swap phase',
          text: 'Before play starts, you may freely swap cards between your **hand** and your **face-up** row. Put your best cards face up — you will need them at the end of the round, when your hand is gone and you have no choices left.',
        },
        {
          type: 'p',
          text: 'The player with the lowest **3** showing in their face-up row goes first. If nobody has one, the first person to call out a 3 in their hand starts.',
        },
      ],
    },
    {
      id: 'ranking',
      title: 'Card ranking',
      body: [
        {
          type: 'p',
          text: 'From highest to lowest: **2, A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3**. Suits are irrelevant — Palace never cares about suits.',
        },
        {
          type: 'callout',
          variant: 'note',
          text: 'The **2** is both the highest and lowest card. It beats anything and anything beats it, which makes it a universal escape hatch.',
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
            'Play one or more cards of **the same rank**, equal to or higher than the top card of the pile.',
            '**Draw back up to three cards** from the draw pile, if any remain. You only refill while the draw pile lasts.',
            'Play passes to the left.',
          ],
        },
        {
          type: 'p',
          text: 'Playing multiple cards of the same rank at once is always allowed and always a good idea — `8♠ 8♥` in one turn is two cards gone for the price of one.',
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'If you cannot play',
          text: 'You **pick up the entire discard pile** into your hand. The next player then starts a fresh pile with anything they like. This is how a two-card hand becomes a fourteen-card hand in one turn.',
        },
      ],
    },
    {
      id: 'magic-cards',
      title: 'Magic cards',
      lede: 'Four ranks break the rules. These are near-universal; the 7 and 8 are more contested — see House rules.',
      body: [
        {
          type: 'table',
          headers: ['Card', 'Effect'],
          rows: [
            ['**2**', 'Playable on **anything**, and **anything** may be played on it. Resets the pile to the bottom.'],
            ['**10**', 'Playable on anything. **Burns the pile** — the whole discard pile is removed from the game — then you play again.'],
            ['**Four of a kind**', 'Completing four cards of the same rank on top of the pile, in one turn or across several, **burns the pile**. You play again.'],
            ['**3**', 'Lowest card in the deck. No special power in the base game, but see the "invisible 3" variation.'],
          ],
        },
        {
          type: 'diagram',
          id: 'palace-burn',
          caption:
            'The four of a kind does not have to be yours. Three other players laid those 9s down across their own turns — you just finished the set and took the whole pile out of the game.',
        },
        {
          type: 'p',
          text: 'A burn is the most powerful thing that can happen to you. The pile vanishes, and the player who burned it starts a brand-new pile with a free choice — so save a 10 for when you are cornered.',
        },
      ],
    },
    {
      id: 'endgame',
      title: 'Playing your table cards',
      body: [
        {
          type: 'p',
          text: 'Once the draw pile is empty and your hand is empty, you move down through your table cards. You must clear each layer completely before starting the next.',
        },
        {
          type: 'ul',
          items: [
            '**Face-up row** — play these exactly like hand cards. You can see them, so you can plan. Multiple cards of the same rank still go together.',
            '**Face-down row** — flip **one card blind** on your turn. If it happens to beat the pile, it is played and you continue. If it does not, you pick up the pile *plus that card* and you are back to having a hand.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Flipping a face-down card is not optional and you may not look first. A round can flip entirely on the last three cards — this is by design, and it is why Palace is a good game for uneven groups.',
        },
      ],
    },
    {
      id: 'winning',
      title: 'Winning & losing',
      body: [
        {
          type: 'p',
          text: 'The moment you play your last face-down card you are **out** and safe. Play continues without you.',
        },
        {
          type: 'p',
          text: 'There is no points-based winner. The **last player still holding cards loses**, earns the title, and deals the next round. Most groups play a run of rounds and simply remember who has lost the most.',
        },
      ],
    },
  ],

  variations: [
    {
      name: '7 — play lower',
      description: 'After a **7**, the next player must play a **7 or lower** (or a 2 or 10). Very widely played — many groups consider it core. Some call this "seven the glass": the next play must beat whatever is *underneath* the 7 rather than the 7 itself.',
    },
    {
      name: '8 — skip or invisible',
      description: 'Two common and incompatible readings. Either an **8 skips the next player**, or an **8 is transparent** — the next player must beat the card beneath it. Pick one; playing both makes 8s chaotic.',
    },
    {
      name: 'The invisible 3',
      description: 'A **3** becomes a mirror: the next player must beat the card *under* the 3. Stacked 3s make for a very confusing pile, which is the appeal.',
    },
    {
      name: 'Jokers as reverse',
      description: 'Add both jokers as **direction reversers** — useful with 6+ players where a full lap of the table takes a while. With fewer players it mostly just protects whoever played it.',
    },
    {
      name: 'Karma pick-up',
      description: 'When a player picks up the pile, play reverts to the **previous** player rather than continuing to the next. This punishes whoever forced the pick-up and slows the game noticeably.',
    },
    {
      name: 'Six-card deal',
      description: 'Deal three face down and a **six-card hand**, then each player chooses which three to place face up. More control over your endgame and a much better teaching setup than the blind three-and-three deal.',
    },
    {
      name: 'Tens cannot burn on face cards',
      description: 'Some tables rule that a 10 cannot burn a pile topped by a J, Q or K. This makes face cards genuinely strong late in a round rather than just high.',
    },
  ],

  hints: [
    'Put 2s and 10s **face up**, not in your hand. Your face-up row is what saves you at the end of the round, and an escape card is worth far more then than now.',
    'Never sit on a hand full of low cards while the draw pile is still going. You refill to three every turn, so cards spent early are free — cards held late are a liability.',
    'Hold a single 2 as insurance. One guaranteed playable card means you can never be forced to pick up the pile on the turn that matters.',
    'Watch what has been played of each rank. If three Queens are already down, the fourth Queen is a burn waiting to happen — for you or against you.',
    'Dump high cards while the pile is high. A King is only useful on a pile you can already beat; carrying it into your face-up row usually means a pick-up later.',
    'When the draw pile empties, count what everyone else has left. If someone is on their face-down cards, forcing a pick-up on them is often worth wasting a good card.',
  ],

  faq: [
    {
      q: 'Why does this game have so many names?',
      a: 'It spread through pubs, schools and hostels rather than through published rulebooks, so it picked up local names — **Palace, Shithead, Karma, Shed** and others — along with local rules. There is no single official version.',
    },
    {
      q: 'Can I look at my face-down cards?',
      a: 'No, never — not during the swap phase, not during play. You only find out what they are when you flip them, one at a time, at the very end.',
    },
    {
      q: 'Do I have to play a card if I can?',
      a: 'Yes. If you have a legal play you must make it. You cannot choose to pick up the pile to stockpile good cards.',
    },
    {
      q: 'Can I play two different ranks in one turn?',
      a: 'No. Cards played together in one turn must all be **the same rank**. `8♠ 8♥` is fine; `8♠ 9♥` is not.',
    },
    {
      q: 'What happens if the draw pile runs out?',
      a: 'Nothing dramatic — you simply stop refilling your hand. Play your remaining hand cards down to zero, then start on your face-up row.',
    },
    {
      q: 'Can I complete a four-of-a-kind using cards other players put down?',
      a: 'Yes, and it is one of the best moves in the game. If three 9s are already on top of the pile, playing the fourth burns it — regardless of who played the first three.',
    },
    {
      q: 'How many people can play?',
      a: 'Three to five is the sweet spot. Two works but is fairly grim. With six or more, either add a second deck or accept a lot of waiting between turns.',
    },
  ],

  cardLibrary: {
    intro: 'Ranking runs 2, A, K, Q, J, 10 … 4, 3. Suits never matter. Four ranks break the rules entirely.',
    entries: [
      { rank: '2', name: 'Two', value: 'wild', effect: 'Playable on anything, and anything can be played on it.', tags: ['magic'] },
      { rank: '10', name: 'Ten', value: 'burn', effect: 'Playable on anything. Burns the pile, then you play again.', tags: ['magic'] },
      { rank: 'A', name: 'Ace', value: 'high', effect: 'Second only to the 2.', tags: ['ranking'] },
      { rank: 'K', name: 'King', value: 'high', effect: 'Beaten only by an Ace or a 2.', tags: ['ranking'] },
      { rank: '4–9', name: 'Middle cards', value: 'mid', effect: 'Ordinary. Must equal or beat the top of the pile.', tags: ['ranking'] },
      { rank: '3', name: 'Three', value: 'low', effect: 'The worst card in the deck. Lowest 3 showing starts the game.', tags: ['ranking'] },
    ],
  },

  drills: [
    {
      id: 'legal',
      title: 'Find the dead card',
      prompt: 'The pile shows 9♠. Three of these are legal plays. Which one is not?',
      options: [
        { faces: ['7♦'], correct: true },
        { faces: ['9♥'] },
        { faces: ['10♣'] },
        { faces: ['2♠'] },
      ],
      correctText: 'A 7 is lower than a 9 and has no power, so it cannot go down. You would pick up the pile.',
      wrongText: 'Equal counts: 9♥ matches. The 10 burns, and the 2 plays on anything. Only a plain lower card is stuck.',
    },
    {
      id: 'burn',
      title: 'Burn it down',
      prompt: 'Which single card clears the whole pile out of the game on its own?',
      options: [
        { faces: ['10♣'], correct: true },
        { faces: ['2♥'] },
        { faces: ['A♠'] },
        { faces: ['3♦'] },
      ],
      correctText: 'The 10 burns the pile and hands you another turn with a free choice.',
      wrongText: 'The 2 resets the pile to the bottom but leaves it there. Only a 10 — or a completed four of a kind — burns it.',
    },
  ],

  cheatSheet: {
    setup: 'Nine cards each: **3 face down**, **3 face up** on top of them, **3 in hand**. Swap between hand and face-up row before play. Rest of the deck is the draw pile. Lowest 3 showing starts.',
    turn: [
      'Play one or more cards of the **same rank**, equal or higher than the pile’s top card.',
      '**Draw back up to three** while the draw pile lasts.',
      'Cannot play? **Pick up the whole pile.**',
    ],
    keyRules: [
      'Ranking: **2 A K Q J 10 9 8 7 6 5 4 3**. Suits never matter.',
      '**2** — playable on anything, anything plays on it.',
      '**10** — playable on anything, **burns the pile**, play again.',
      '**Four of a kind** on top — **burns the pile**, play again.',
      'Order of play: hand → face-up row → face-down row (flipped **blind**, one per turn).',
    ],
    scoring: 'No points. First to shed all nine cards is out and safe. **Last player holding cards loses** and deals next.',
  },

  scoring: null,
};
