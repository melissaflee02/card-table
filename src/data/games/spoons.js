export default {
  slug: 'spoons',
  name: 'Spoons',
  suit: '♣',
  aliases: ['Pig', 'Donkey', 'Tongue'],
  tagline: 'Collect four of a kind, then grab a spoon before the person next to you notices you have.',
  reviewed: '2026-09-09',
  sources: [
    { name: 'Pagat — Pig, Spoons', url: 'https://www.pagat.com/passing/pig.html' },
    { name: 'Bicycle — Spoons', url: 'https://bicyclecards.com/how-to-play/spoons' },
  ],
  players: { min: 3, max: 10, best: '5–8' },
  time: { min: 10, max: 20 },
  difficulty: 'easy',
  deck: 'standard',
  extras: ['One spoon fewer than there are players'],
  tags: ['reflex', 'party'],
  keywords: ['pig', 'donkey', 'four of a kind', 'grab', 'party game', 'spoons card game'],
  objective:
    'Collect four of a kind and take a spoon. The moment anyone does, everyone else grabs too — and whoever is left empty-handed picks up a letter.',

  sections: [
    {
      id: 'setup',
      title: 'Setup',
      body: [
        {
          type: 'ol',
          items: [
            'Sit in a circle with a table everyone can reach.',
            'Put out **one spoon fewer than there are players**, in the middle, within reach of everybody. Five players, four spoons.',
            'Deal **four cards** to each player from a full 52-card deck. The dealer keeps the rest face down as the **stock**.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'Reachable, and not sharp',
          text: 'The grab is genuinely fast and people lunge. Put the spoons where everyone can reach equally, and keep drinks somewhere else. Plenty of groups use socks, coasters or bottle caps for exactly this reason.',
        },
      ],
    },

    {
      id: 'your-turn',
      title: 'Passing the cards',
      lede: 'Everyone plays at once. There are no turns to wait for.',
      body: [
        {
          type: 'p',
          text: 'You are always trying to hold **four of the same rank**. Cards flow around the circle continuously:',
        },
        {
          type: 'ol',
          items: [
            'The **dealer** takes a card from the stock, looks at their five, and passes one face down to the player on their **left**.',
            'That player picks it up — they now hold five — decides which card they least want, and passes one to **their** left.',
            'This continues round the circle. Everybody is picking up and passing at the same time.',
            'The **last player** in the circle discards to a pile beside them instead of passing back to the dealer.',
          ],
        },
        {
          type: 'callout',
          variant: 'note',
          label: 'If the stock runs out',
          text: 'Pause, shuffle the last player\'s discard pile, and it becomes the new stock. In practice a hand usually ends long before this.',
        },
        {
          type: 'p',
          text: 'You may only ever hold **five cards at once**, and only momentarily. You cannot stockpile a hand while you wait — pass one on as soon as you take one.',
        },
      ],
    },

    {
      id: 'grabbing',
      title: 'Grabbing a spoon',
      body: [
        {
          type: 'p',
          text: 'The moment you hold **four of a kind**, take a spoon. You do not have to announce it, show your hand, or wait.',
        },
        {
          type: 'p',
          text: '**As soon as one spoon is gone, everybody may grab** — with four of a kind or without. There is one spoon fewer than there are players, so somebody ends up with nothing.',
        },
        {
          type: 'callout',
          variant: 'tip',
          label: 'The quiet grab',
          text: 'Nothing obliges you to be obvious. Sliding a spoon off the table without breaking eye contact, and watching how long it takes anyone to notice, is the best thing about this game.',
        },
        {
          type: 'p',
          text: 'The player left without a spoon takes a **letter**: S, then P, then O, then O, then N. Spell **SPOON** and you are out. Remove one spoon each time a player is eliminated, so there is always exactly one fewer than the number still playing.',
        },
      ],
    },

    {
      id: 'winning',
      title: 'Winning',
      body: [
        {
          type: 'p',
          text: 'Gather all the cards, reshuffle, and deal the next round. Play continues until **one player is left**, and they win.',
        },
        {
          type: 'p',
          text: 'A full game with five letters takes a while. Many groups shorten it to three letters — **P-I-G** — or simply play single rounds where whoever misses the spoon loses that round outright.',
        },
      ],
    },
  ],

  drills: [
    {
      id: 'pass-the-odd-one',
      title: 'Pass the odd one out',
      prompt: 'You hold 7♠ 7♥ 7♦ and have just been passed K♣. Which card do you pass on?',
      options: [
        { faces: ['K♣'], correct: true },
        { faces: ['7♠'] },
        { faces: ['7♥'] },
        { faces: ['7♦'] },
      ],
      correctText: 'Keep all three 7s — you are one card from a spoon. The King is the only card that is not helping.',
      wrongText: 'You are three-quarters of the way to four of a kind. Breaking up the 7s throws that away; the King is doing nothing for you.',
    },
    {
      id: 'two-pairs',
      title: 'Two pairs, one choice',
      prompt: 'You hold 3♠ 3♥ 8♦ K♣ and are passed the 8♠. Which card should you pass?',
      options: [
        { faces: ['K♣'], correct: true },
        { faces: ['3♠'] },
        { faces: ['8♦'] },
        { faces: ['8♠'] },
      ],
      correctText: 'The King is your only card without a partner. Hold both pairs — either could become four of a kind.',
      wrongText: 'You now hold two pairs and a spare. Passing from a pair leaves you further from four of a kind; the lone King costs you nothing.',
    },
  ],

  variations: [
    {
      name: 'Pig — no spoons at all',
      description: 'Instead of grabbing, a player with four of a kind quietly **puts a finger on their nose**. Everyone else must do the same as soon as they notice; the last to catch on takes a letter of P-I-G. No equipment, no lunging, and it plays beautifully in a car or on a train.',
    },
    {
      name: 'Donkey',
      description: 'The Australian version: **five-card hands**, tokens instead of spoons, and losses spell D-O-N-K-E-Y. Longer, and the extra card makes hands harder to complete.',
    },
    {
      name: 'Closed deck, simultaneous passing',
      description: 'Use exactly **four cards per player** — five players, five ranks, twenty cards — with no stock at all. Everyone passes one card left on a count of three, over and over. Faster and more chaotic, with no dealer advantage.',
    },
    {
      name: 'Single rounds, no letters',
      description: 'Whoever misses the spoon simply loses that round. Good when people are drifting in and out, since nobody carries a score.',
    },
    {
      name: 'Silent spoons',
      description: 'Taking a spoon obviously — slapping it, announcing it — costs you a letter. Turns the whole game into a staring contest and is much funnier than it sounds.',
    },
  ],

  hints: [
    'Watch hands, not cards. The tell is almost never someone\'s face — it is a person who has stopped passing, or whose arm has drifted towards the middle of the table.',
    'Pass fast. The quicker cards move, the sooner you see new ones, and speed is worth more than any decision you make about which card to keep.',
    'Sit where you can reach. Seat position genuinely matters in this game, and the person furthest from the spoons loses more often than anyone else.',
    'Do not stare at the spoons. Everyone else is watching for exactly that, and it triggers a false grab that costs you nothing but tells them everything.',
    'If you are dealt two pairs, hold both. Committing early to one rank halves the number of cards that can help you.',
    'Take the spoon before you finish counting. If you think you have four of a kind, grab first and verify after — a wrong grab costs nothing, and hesitating costs the round.',
  ],

  faq: [
    {
      q: 'Do I have to have four of a kind to take a spoon?',
      a: 'Only to take the **first** one. Once any spoon has been taken, everyone may grab regardless of what they are holding — which is why watching the table matters as much as your hand.',
    },
    {
      q: 'What if I grab a spoon by mistake?',
      a: 'Nothing, in the standard game — a false grab just starts the scramble early and everyone has a laugh. Some groups penalise it with a letter; agree beforehand if you care.',
    },
    {
      q: 'Can two people grab the last spoon at once?',
      a: 'It happens constantly. The usual resolution is whoever has more of the spoon in hand keeps it. If nobody can agree, replay the round — it takes two minutes.',
    },
    {
      q: 'How many people can play?',
      a: 'Three at a minimum, and it gets better with more. Above about ten you will want a second deck, and the table has to be small enough that everyone can genuinely reach the middle.',
    },
    {
      q: 'Is this the same game as Pig?',
      a: 'Yes, with different hardware. **Pig** replaces the spoons with touching your nose, which makes it playable anywhere and removes the lunging. The card mechanics are identical.',
    },
    {
      q: 'Do we play in turns?',
      a: 'No — everybody passes at the same time, continuously. That is what makes it frantic, and it is the main reason it works so well with a big group.',
    },
  ],

  cheatSheet: {
    setup: '**Four cards** each, full deck, dealer keeps the stock. **One spoon fewer than players**, in easy reach of everyone.',
    turn: [
      'Dealer draws from the stock and passes one card **left**, face down.',
      'Everyone picks up, keeps four, passes one on. All at the same time.',
      'The last player discards to a pile instead of passing back.',
    ],
    keyRules: [
      'Get **four of a kind** and take a spoon — no need to announce it.',
      'Once **any** spoon is taken, everyone may grab, with or without a set.',
      'You may hold **five cards** only momentarily. No stockpiling.',
      'Missing out costs a letter: **S-P-O-O-N**. Spell it and you are out.',
    ],
    scoring: 'No points. Remove one spoon per elimination. **Last player standing wins.**',
  },

  scoring: null,
};
