// Radix gray neutrals with a single spot ink — the two-colour look of a
// printed technical manual. Structure is black-on-white; the ink is used only
// where something is interactive or needs to be found.
export default {
  name: 'Ink Orange',
  description: 'Black on white with a signal-orange spot ink. Industrial, loud where it counts.',
  light: {
    bg: '#f9f9f9',            // gray 2
    surface: '#ffffff',
    surface2: '#f0f0f0',      // gray 3
    border: '#d9d9d9',        // gray 6
    borderStrong: '#202020',  // gray 12 — hard rules, not soft edges
    inputBorder: '#646464',   // gray 11
    text: '#202020',          // gray 12
    textMuted: '#646464',     // gray 11
    accent: '#b34400',        // orange 11 (#cc4e00) is only 4.28:1 on gray 2
    accentHover: '#ffa057',
    accentSoft: '#ffefd6',
    accentOnSoft: '#582d1d',
    accentSolid: '#cc4e00',
    accentSolidHover: '#582d1d',
    accentOnSolid: '#ffffff',
    suitRed: '#c2298a'.replace('#c2298a','#ce2c31'),
    warningBg: '#f4faff',
    warningBorder: '#acd8fc',
    cardFace: '#ffffff',
    cardBorder: '#bbbbbb',    // gray 8
    cardBack: '#b34400',
    diagramArrow: '#838383',  // gray 10
    diagramGood: '#582d1d',   // orange 12
    diagramWarn: '#113264',   // blue 12
    diagramGoodBg: '#ffefd6',
    diagramWarnBg: '#f4faff',
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
    accent: '#ffa057',
    accentHover: '#ffffff',
    accentSoft: '#331e0b',
    accentOnSoft: '#ffa057',
    accentSolid: '#ef5f00',
    accentSolidHover: '#ff801f',
    accentOnSolid: '#111111',  // dark on the vivid solid — white on orange 10 is only 3.33:1
    suitRed: '#ff9592',
    warningBg: '#111927',
    warningBorder: '#205d9e',
    cardFace: '#f0f0f0',
    cardBorder: '#606060',
    cardBack: '#ef5f00',
    diagramArrow: '#7b7b7b',  // gray dark 10
    diagramGood: '#ffa057',
    diagramWarn: '#70b8ff',
    diagramGoodBg: '#331e0b',
    diagramWarnBg: '#111927',
  },
};
