export default {
  slug: 'cheat',
  name: 'Cheat',
  suit: '♥',
  aliases: ['BS', 'Bullshit', 'I Doubt It'],
  tagline: 'Everything is played face down, so nothing you are told is necessarily true.',
  reviewed: '2026-09-08',
  sources: [
    { name: 'Pagat — Cheat', url: 'https://www.pagat.com/beating/cheat.html' },
  ],
  players: { min: 3, max: 8, best: '4–6' },
  time: { min: 15, max: 25 },
  difficulty: 'easy',
  deck: 'standard',
  tags: ['shedding', 'bluffing', 'party'],
  keywords: ['bs', 'bullshit', 'i doubt it', 'lying', 'bluff', 'easy'],
  objective:
    'Get rid of every card. You must announce what you are playing, but nobody sees it — so you can lie, and everyone can call you on it.',

  sections: [
    {
      id: 'setup',
      title: 'The deal',
      body: [
        {
          type: 'p',
          text: 'Deal out the **entire deck**, one card at a time. Some players will have one more than others; that is fine and nobody adjusts for it.',
        },
        { type: 'p', text: 'There is no stock and no draw pile. Every card is in somebody’s hand from the first turn.' },
      ],
    },
    {
      id: 'your-turn',
      title: 'Your turn',
      lede: 'The ranks march in order round the table, whether you hold them or not.',
      body: [
        {
          type: 'ol',
          items: [
            'The first player plays **Aces**, the next plays **Twos**, the next **Threes**, and so on up to Kings — then it loops back to Aces.',
            'Play **one or more cards face down** onto the pile and say how many: “two Sevens”.',
            'You do **not** have to be telling the truth. Nothing is turned over unless somebody challenges.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'The rank is set by your **position in the rotation**, not by choice. When Sevens come round to you and you have none, you have to lie — that is the whole game.',
        },
      ],
    },
    {
      id: 'challenging',
      title: 'Calling cheat',
      body: [
        {
          type: 'p',
          text: 'Any player may call **“Cheat!”** at any point after cards are laid down. Only the cards from that most recent play are turned over.',
        },
        {
          type: 'table',
          headers: ['What the cards show', 'Who picks up the whole pile'],
          rows: [
            ['They **were** what was claimed', 'The **challenger**'],
            ['They were **not**', 'The **player who lied**'],
          ],
        },
        {
          type: 'p',
          text: 'Either way the pile is cleared, and play resumes with the next player and the next rank in the sequence.',
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'A challenge is never free. Being wrong hands you the entire pile, which by mid-game can be twenty cards.',
        },
      ],
    },
    {
      id: 'winning',
      title: 'Winning',
      body: [
        {
          type: 'p',
          text: 'The first player to get rid of all their cards **and survive any challenge on that final play** wins.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Going out on a lie is legal but risky. Everyone knows the last play is the one worth challenging, so the safest way to win is with a hand that is genuinely what you say it is.',
        },
      ],
    },
  ],

  drills: [
    {
      id: 'sequence',
      title: 'Know what to claim',
      prompt: 'The player before you just laid down “three Fours”. What rank must you claim?',
      options: [
        { faces: ['5♠'], correct: true },
        { faces: ['4♥'] },
        { faces: ['6♦'] },
        { faces: ['A♣'] },
      ],
      correctText: 'Ranks go up by one every turn, all the way round the table. After Fours come Fives — whether or not you hold any.',
      wrongText: 'The rank is fixed by the rotation, not by what you are holding. Fours were just played, so you must claim **Fives**.',
    },
    {
      id: 'bluff',
      title: 'Pick the safest lie',
      prompt: 'You must claim Jacks and hold none. Aces through Tens have already gone round this cycle. Which card do you bluff with?',
      options: [
        { faces: ['3♣'], correct: true },
        { faces: ['Q♦'] },
        { faces: ['K♠'] },
        { faces: ['A♥'] },
      ],
      correctText: 'Threes have already passed, so you will not need that card for an honest play any time soon. Queens, Kings and Aces are all still coming.',
      wrongText: 'Bluff with a rank that has already gone by. Throwing away a Queen means lying again when Queens come round in two turns.',
    },
  ],

  variations: [
    { name: 'Any rank you like', description: 'Drop the sequence entirely: on your turn you claim **any rank**, as long as it is the same as or adjacent to the last one. Far more forgiving, and much less lying.' },
    { name: 'Up or down', description: 'You may claim **one higher or one lower** than the previous rank. A small change that gives everyone an honest option most turns and makes the bluffs more deliberate.' },
    { name: 'Double challenge', description: 'If a challenge is wrong, the challenger picks up the pile **and** misses their next turn. Cuts down on speculative calls.' },
    { name: 'Two decks for a big group', description: 'Above six players, hands get short and the sequence rushes past. A second deck fixes it — and adds eight of each rank, so the counting gets harder.' },
    { name: 'No challenging the last play', description: 'Some tables protect the winning play from a challenge, which makes the endgame kinder and considerably less fun.' },
  ],

  hints: [
    'There are exactly **four of each rank**. If you are holding three Kings and someone claims two, you know for certain they are lying.',
    'Dump your biggest lie early, while the pile is small. Getting caught in the first round costs you five cards; getting caught in the tenth costs you thirty.',
    'Lie with ranks that have just gone past. You will not need them again for a full lap of the table.',
    'Watch how many cards people put down, not their faces. Somebody quietly laying four of something late in the game is usually telling the truth and about to win.',
    'Do not challenge just because a claim is large. Challenge when the arithmetic says it is impossible — you have seen too many of that rank already.',
    'When you are down to two or three cards, play them honestly if you can. The final play attracts a challenge almost every time.',
  ],

  faq: [
    { q: 'Can I play more cards than I claim?', a: 'No — the number you say must match the number you put down. The lie is about the **rank**, not the count. Some groups allow lying about both; agree first.' },
    { q: 'Who can call cheat?', a: 'Anyone at the table, not just the next player. If two people call at once, the one nearer the player’s left usually takes precedence.' },
    { q: 'When is it too late to challenge?', a: 'Once the next player has laid their cards down, the previous play is safe. Call it before that.' },
    { q: 'Do I have to play a card on my turn?', a: 'Yes. There is no passing and no drawing — you always put at least one card down, truthfully or otherwise.' },
    { q: 'What if I run out of cards but get challenged?', a: 'If the challenge is correct you pick up the pile and you are back in the game. You only win once a final play survives.' },
    { q: 'Why does this game have so many names?', a: '**Cheat** is the usual British name, **BS** or **Bullshit** the American one, and **I Doubt It** the polite version taught to children. Same game throughout.' },
  ],

  cheatSheet: {
    setup: 'Deal the **whole deck** out. Uneven hands are fine. No stock, no drawing.',
    turn: [
      'Play **one or more cards face down** and announce them.',
      'The rank is fixed by the rotation: **A, 2, 3 … K**, then back to A.',
      'You may lie about the rank. The count must be true.',
    ],
    keyRules: [
      'Anyone may call **“Cheat!”** — only the last play is revealed.',
      'Caught lying → **the liar takes the pile**. Wrong challenge → **the challenger takes it**.',
      'There are **four of each rank** — that is the whole basis for a good challenge.',
      'You must play on your turn. No passing.',
    ],
    scoring: 'No points. First to shed every card **and survive the challenge on their last play** wins.',
  },

  scoring: null,
};
