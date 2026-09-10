export default {
  slug: 'egyptian-ratscrew',
  name: 'Egyptian Ratscrew',
  suit: '♠',
  aliases: ['ERS', 'Egyptian War', 'Slap', 'Beggar My Neighbour'],
  tagline: 'Beggar My Neighbour with slapping. Nobody chooses anything, and everyone is still exhausted afterwards.',
  reviewed: '2026-09-09',
  sources: [
    { name: 'Bicycle — Egyptian Rat Screw', url: 'https://bicyclecards.com/how-to-play/egyptian-rat-screw' },
    { name: 'Pagat — Beggar My Neighbour (the parent game)', url: 'https://www.pagat.com/war/beggar_my_neighbour.html' },
  ],
  players: { min: 2, max: 6, best: '3–4' },
  time: { min: 15, max: 30 },
  difficulty: 'easy',
  deck: 'standard',
  tags: ['reflex', 'party'],
  keywords: ['ers', 'slap', 'egyptian war', 'beggar my neighbour', 'sandwich', 'doubles', 'face card challenge'],
  objective:
    'Win the whole deck. You have no decisions to make about which card to play — only how fast you notice that the pile is slappable.',

  sections: [
    {
      id: 'setup',
      title: 'Setup',
      body: [
        {
          type: 'ol',
          items: [
            'Deal the **entire deck** out face down, as evenly as it goes. Uneven piles are fine.',
            'Nobody looks at their cards, ever. Keep them in a neat face-down stack in front of you.',
            'Play passes to the left.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          label: 'Clear the table first',
          text: 'People slap hard and fast. Move the drinks, and agree up front whether slapping someone else\'s hand is a foul — it will happen.',
        },
      ],
    },

    {
      id: 'your-turn',
      title: 'Your turn',
      body: [
        {
          type: 'p',
          text: 'Turn the **top card of your stack face up** onto a pile in the middle. That is the entire turn. You never choose which card — you cannot even see it until it lands.',
        },
        {
          type: 'p',
          text: 'Play continues around the table, one card each, until either somebody plays a **court card** or the pile becomes **slappable**.',
        },
      ],
    },

    {
      id: 'challenge',
      title: 'The face-card challenge',
      lede: 'The only structure in the game.',
      body: [
        {
          type: 'p',
          text: 'When somebody plays a **Jack, Queen, King or Ace**, the next player owes them cards. How many depends on the card:',
        },
        {
          type: 'table',
          headers: ['Card played', 'Cards the next player must turn over'],
          rows: [
            ['Jack', '**1**'],
            ['Queen', '**2**'],
            ['King', '**3**'],
            ['Ace', '**4**'],
          ],
        },
        {
          type: 'ul',
          items: [
            'If they turn over **another court card** partway through, the debt cancels and passes on — now the player after *them* owes for the new card.',
            'If they get through their cards **without** hitting one, the person who played the original court card **takes the whole pile** and puts it face down under their stack.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          label: 'Nothing else stops the game',
          text: 'This is the only mechanism by which the pile gets won without slapping — and the reason a hand can run for several minutes without anyone touching the middle.',
        },
      ],
    },

    {
      id: 'slapping',
      title: 'Slapping the pile',
      lede: 'Beat everyone else to it and the pile is yours, whoever played the cards.',
      body: [
        {
          type: 'p',
          text: 'At any moment — including during a challenge, including when it is not your turn — you may slap the pile if it shows one of these:',
        },
        {
          type: 'table',
          headers: ['Name', 'What it looks like'],
          rows: [
            ['**Double**', 'Two cards of the same rank in a row — `7 7`'],
            ['**Sandwich**', 'Two matching cards with one card between them — `7 K 7`'],
            ['**Top-bottom**', 'The card played matches the very bottom card of the pile'],
            ['**Marriage**', 'A King and a Queen next to each other, either way round'],
            ['**Run**', 'Three consecutive cards, up or down — `5 6 7`'],
            ['**Add to ten**', 'Two cards in a row totalling ten, court cards excluded — `4 6`'],
          ],
        },
        {
          type: 'p',
          text: 'First hand flat on the pile wins it. Take the lot, put it face down under your stack, and start the next pile yourself.',
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'Slapping wrongly costs you',
          text: 'Get it wrong and you **burn** a card — take the top card off your own stack and slide it face down under the pile. Do it twice in a row and you have handed two cards to whoever wins next.',
        },
        {
          type: 'p',
          text: 'Only **Double** and **Sandwich** are truly universal. Everything else on that list is played by some tables and not others, which is why the list has to be agreed before the first card goes down rather than argued about at speed.',
        },
      ],
    },

    {
      id: 'winning',
      title: 'Winning',
      body: [
        {
          type: 'p',
          text: 'Run out of cards and you are **not out yet** — you stay in until the next slap opportunity, and a correct slap puts you straight back in the game with a full pile.',
        },
        {
          type: 'p',
          text: 'You are only eliminated once you have no cards **and** miss a slap. The last player holding cards has all fifty-two, and wins.',
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'This is why the game swings so hard. A player down to their last card can win the entire deck with one well-timed slap, which makes it worth staying awake even when you are clearly losing.',
        },
      ],
    },
  ],

  cardLibrary: {
    intro: 'Only the court cards have any value, and it is the number of cards they cost the next player.',
    entries: [
      { rank: 'A', name: 'Ace', value: '4', effect: 'The strongest challenge. Four cards must come over without a court card among them.', tags: ['challenge'] },
      { rank: 'K', name: 'King', value: '3', effect: 'Three cards owed. Also half of a marriage if a Queen lands beside it.', tags: ['challenge'] },
      { rank: 'Q', name: 'Queen', value: '2', effect: 'Two cards owed. Beside a King, the pile is slappable.', tags: ['challenge'] },
      { rank: 'J', name: 'Jack', value: '1', effect: 'One card owed — the weakest challenge, and easily broken.', tags: ['challenge'] },
      { rank: '2–10', name: 'Number cards', value: '—', effect: 'No power at all. They only matter for what they make with their neighbours.', tags: ['plain'] },
    ],
  },

  drills: [
    {
      id: 'challenge-count',
      title: 'Count the debt',
      prompt: 'The player before you turned over a King. How many cards must you play?',
      options: [
        { faces: ['3♠', '3♥', '3♦'], correct: true },
        { faces: ['2♣', '2♦'] },
        { faces: ['A♠'] },
        { faces: ['4♥', '4♠', '4♦', '4♣'] },
      ],
      correctText: 'Three for a King. Jack one, Queen two, King three, Ace four — and if a court card turns up among them, the debt flips to the next player.',
      wrongText: 'The count runs J-1, Q-2, K-3, A-4. A King costs the next player **three** cards.',
    },
    {
      id: 'slappable',
      title: 'Is it slappable?',
      prompt: 'The top three cards of the pile are 7♠, K♦, 7♣. Which rule makes this a slap?',
      options: [
        { faces: ['7♠', 'K♦', '7♣'], correct: true },
        { faces: ['7♠', '7♣'] },
        { faces: ['K♦', 'Q♦'] },
        { faces: ['5♥', '6♠', '7♦'] },
      ],
      correctText: 'A **sandwich** — two matching cards with exactly one card between them. The King in the middle is irrelevant.',
      wrongText: 'The two 7s are not adjacent, so it is not a double. One card sits between them, which makes it a **sandwich**.',
    },
  ],

  variations: [
    {
      name: 'One chance for every court card',
      description: 'Bicycle publishes a simplified version where **every** court card gives the next player just **one** card to break the challenge, rather than one to four. Quicker, and it removes the reason to care which court card was played. The graduated count is much more widely played.',
    },
    {
      name: 'Slap rules beyond doubles and sandwiches',
      description: 'Top-bottom, marriage, runs and add-to-ten are all optional and none is universal. Pick the list before you start. Adding all of them makes almost every card slappable, which is either the best or worst version of the game depending on the table.',
    },
    {
      name: 'Burn one card or two',
      description: 'A wrong slap costs one card at most tables and two at some. Two is a real deterrent, which matters if somebody is slapping speculatively at everything.',
    },
    {
      name: 'Jokers as free slaps',
      description: 'Leave the jokers in; the pile is slappable whenever one appears. A simple way to add chaos without adding rules to remember.',
    },
    {
      name: 'Out is out',
      description: 'Drop the rule that lets a card-less player slap back in. Games end far sooner — which, given this one can run half an hour, is a legitimate thing to want.',
    },
  ],

  hints: [
    'Watch the pile, not your own stack. You have no decisions to make about your cards, so the only thing worth your attention is the middle of the table.',
    'Slap with a flat hand, not fingertips. It is faster, it is more accurate, and it hurts other people less when two of you arrive together.',
    'The most-missed slap is the sandwich, because everyone is watching for two matching cards side by side and a sandwich has a card in between.',
    'During a long challenge people stop watching for slaps and start counting cards. That is exactly when a double lands unnoticed.',
    'If you are down to one card, do not despair — you are one correct slap from having the biggest stack at the table.',
    'Agree the slap list out loud before the first card. Arguing about whether top-bottom counts, mid-slap, ruins more games than any other rule dispute.',
  ],

  faq: [
    {
      q: 'Can I slap when it is not my turn?',
      a: 'Yes — that is the whole point. Slapping is entirely independent of turn order and you may do it at any moment, including in the middle of somebody else\'s challenge.',
    },
    {
      q: 'What if two people slap at the same time?',
      a: 'Whoever\'s hand is underneath takes the pile. If genuinely nobody can tell, the usual settlement is to split it or replay the pile — decide which beforehand, because it happens most games.',
    },
    {
      q: 'Am I out when I run out of cards?',
      a: 'Not immediately. You stay in and may still slap; a correct slap wins you the pile and puts you right back in. You are only out once you have no cards and miss the next opportunity.',
    },
    {
      q: 'Do I have to burn a card for a wrong slap?',
      a: 'Yes, in the standard game — one card off your stack, face down under the pile. Without a penalty people just slap constantly, which removes the only skill the game has.',
    },
    {
      q: 'Is this the same as Beggar My Neighbour?',
      a: 'It is Beggar My Neighbour with slapping bolted on. The face-card challenge — one card for a Jack up to four for an Ace — comes straight from the older English game, which is several hundred years old and has no slapping at all.',
    },
    {
      q: 'How long does a game take?',
      a: 'Fifteen to thirty minutes, but genuinely unbounded — the deck can circulate for a long time. If you want a fixed end, play for a set number of minutes and whoever has the most cards wins.',
    },
  ],

  cheatSheet: {
    setup: 'Deal the **whole deck** face down. Nobody looks at their cards. Play one card at a time into a central pile.',
    turn: [
      'Turn your **top card** face up onto the pile. No choices, ever.',
      'Court card played? The next player owes: **J-1, Q-2, K-3, A-4**.',
      'Another court card among those cancels the debt and passes it on.',
    ],
    keyRules: [
      'Challenge survived → the player who laid the court card **takes the pile**.',
      'Slap on: **double** (`7 7`) and **sandwich** (`7 K 7`). Optional: top-bottom, marriage, run, add-to-ten.',
      'First flat hand on the pile takes it, turn or no turn.',
      'Wrong slap = **burn one card** face down under the pile.',
      'Out of cards? You stay in until you miss a slap.',
    ],
    scoring: 'No points. Win the whole deck and you win the game.',
  },

  scoring: null,
};
