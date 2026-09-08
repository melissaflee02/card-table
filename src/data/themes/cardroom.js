// Cardroom Modern: warm ivory paper, deep card-table green, restrained brick
// red for accents and brass for details. Deep green rather than black carries
// headings and primary controls; brick red is an accent, not a default.
export default {
  name: 'Cardroom',
  description: 'Ivory paper, card-table green, brick-red accents.',
  light: {
    bg: '#f3eedf',            // page — warm ivory
    surface: '#fffdf7',       // elevated paper
    surface2: '#eae3d0',      // recessed paper, for insets and table heads
    border: '#d2c8b2',
    borderStrong: '#a99d83',  // brass/tan
    inputBorder: '#7d8b80',   // green-grey; the hero search overrides to deep green

    text: '#18362d',          // deep green ink, not black
    textMuted: '#68645b',

    accent: '#b33a2f',        // brick red — links, focus ring, suit accents
    accentHover: '#8d2c23',
    accentSoft: '#e3f0e2',
    accentOnSoft: '#245c38',
    accentSolid: '#18362d',   // primary buttons and active states: table green
    accentSolidHover: '#0f251e',
    accentOnSolid: '#fffdf7', // ivory on green

    // Panels are the card table itself.
    panel: '#18362d',
    panelText: '#f3eedf',
    panelMuted: '#c3bda8',
    panelBorder: '#2a4a3e',
    panelAccent: '#d8bd83',   // brass

    suitRed: '#b33a2f',
    warningBg: '#f8efdb',
    warningBorder: '#d9be86',
    dangerBg: '#f9e8e5',
    dangerBorder: '#dfaea7',

    cardFace: '#fffdf7',
    cardBorder: '#c8bda4',
    cardInk: '#1b1a17',
    cardInkRed: '#b33a2f',
    cardBack: '#18362d',

    diagramArrow: '#8b8069',
    diagramGood: '#245c38',
    diagramWarn: '#8a4a20',
    diagramGoodBg: '#e3f0e2',
    diagramWarnBg: '#f8efdb',

    shadowSm: '0 1px 2px rgb(24 54 45 / 6%), 0 1px 3px rgb(24 54 45 / 4%)',
    shadowMd: '0 3px 10px rgb(24 54 45 / 8%), 0 1px 3px rgb(24 54 45 / 5%)',
    shadowLg: '0 10px 26px rgb(24 54 45 / 12%), 0 3px 8px rgb(24 54 45 / 6%)',
  },
  // Same room, lights down. Green deepens rather than turning grey.
  dark: {
    bg: '#101f1a',
    surface: '#162b24',
    surface2: '#1d372e',
    border: '#2a4a3e',
    borderStrong: '#436a5a',
    inputBorder: '#5f8272',

    text: '#f0ead9',
    textMuted: '#a8b0a4',

    accent: '#f0a79c',
    accentHover: '#f7c4bc',
    accentSoft: '#17332a',
    accentOnSoft: '#8ed7a9',
    accentSolid: '#2a6f4d',   // deepened: ivory on #2f7d57 was 4.17:1
    accentSolidHover: '#37875e',
    accentOnSolid: '#f0ead9',

    panel: '#1d372e',
    panelText: '#f0ead9',
    panelMuted: '#adb7ab',
    panelBorder: '#31564a',
    panelAccent: '#dcc18a',

    suitRed: '#f0a79c',
    warningBg: '#2c2417',
    warningBorder: '#6b5426',
    dangerBg: '#2e1b19',
    dangerBorder: '#6d3330',

    cardFace: '#f2eee2',
    cardBorder: '#5c6b61',
    cardInk: '#1b1a17',
    cardInkRed: '#b33a2f',
    cardBack: '#2f7d57',

    diagramArrow: '#8d978c',
    diagramGood: '#8ed7a9',
    diagramWarn: '#e0a463',
    diagramGoodBg: '#17332a',
    diagramWarnBg: '#2c2417',

    shadowSm: '0 1px 2px rgb(0 0 0 / 40%)',
    shadowMd: '0 3px 10px rgb(0 0 0 / 45%)',
    shadowLg: '0 10px 26px rgb(0 0 0 / 55%)',
  },
};
