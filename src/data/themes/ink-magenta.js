// Radix gray neutrals with a single spot ink — the two-colour look of a
// printed technical manual. Structure is black-on-white; the ink is used only
// where something is interactive or needs to be found.
export default {
  name: 'Ink Magenta',
  description: 'Black on white with a risograph-pink spot ink. Unexpected, still legible.',
  light: {
    bg: '#f9f9f9',            // gray 2
    surface: '#ffffff',
    surface2: '#f0f0f0',      // gray 3
    border: '#d9d9d9',        // gray 6
    borderStrong: '#202020',  // gray 12 — hard rules, not soft edges
    inputBorder: '#646464',   // gray 11
    text: '#202020',          // gray 12
    textMuted: '#646464',     // gray 11
    accent: '#c2298a',
    accentHover: '#ff8dcc',
    accentSoft: '#fee9f5',
    accentOnSoft: '#651249',
    accentSolid: '#c2298a',
    accentSolidHover: '#651249',
    accentOnSolid: '#ffffff',
    suitRed: '#c2298a'.replace('#c2298a','#ce2c31'),
    warningBg: '#fff7ed',
    warningBorder: '#ffc182',
    cardFace: '#ffffff',
    cardBorder: '#bbbbbb',    // gray 8
    cardBack: '#c2298a',
    diagramArrow: '#838383',  // gray 10
    diagramGood: '#c2298a',
    diagramWarn: '#582d1d',   // orange 12 — orange 11 is 3.96:1 on gray 3
    diagramGoodBg: '#fee9f5',
    diagramWarnBg: '#fff7ed',
  },
  dark: {
    bg: '#111111',            // gray dark 1
    surface: '#191919',       // gray dark 2
    surface2: '#222222',      // gray dark 3
    border: '#3a3a3a',        // gray dark 6
    borderStrong: '#606060',  // gray dark 8
    inputBorder: '#6e6e6e',   // gray dark 9
    text: '#eeeeee',          // gray dark 12
    textMuted: '#b4b4b4',     // gray dark 11
    accent: '#ff8dcc',
    accentHover: '#ffffff',
    accentSoft: '#37172f',
    accentOnSoft: '#ff8dcc',
    accentSolid: '#cf3897',
    accentSolidHover: '#de51a8',
    accentOnSolid: '#ffffff',
    suitRed: '#ff9592',
    warningBg: '#1e160f',
    warningBorder: '#7e451d',
    cardFace: '#f0f0f0',
    cardBorder: '#606060',
    cardBack: '#cf3897',
    diagramArrow: '#7b7b7b',  // gray dark 10
    diagramGood: '#ff8dcc',
    diagramWarn: '#ffa057',
    diagramGoodBg: '#37172f',
    diagramWarnBg: '#1e160f',
  },
};
