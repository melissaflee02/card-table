// Radix gray neutrals with a single spot ink — the two-colour look of a
// printed technical manual. Structure is black-on-white; the ink is used only
// where something is interactive or needs to be found.
export default {
  name: 'Ink Blue',
  description: 'Black on white with a blueprint-blue spot ink. Technical, high contrast.',
  light: {
    bg: '#f9f9f9',            // gray 2
    surface: '#ffffff',
    surface2: '#f0f0f0',      // gray 3
    border: '#d9d9d9',        // gray 6
    borderStrong: '#202020',  // gray 12 — hard rules, not soft edges
    inputBorder: '#646464',   // gray 11
    text: '#202020',          // gray 12
    textMuted: '#646464',     // gray 11
    accent: '#0d74ce',
    accentHover: '#70b8ff',
    accentSoft: '#e6f4fe',
    accentOnSoft: '#113264',
    accentSolid: '#0d74ce',
    accentSolidHover: '#113264',
    accentOnSolid: '#ffffff',
    suitRed: '#c2298a'.replace('#c2298a','#ce2c31'),
    warningBg: '#fff7ed',
    warningBorder: '#ffc182',
    cardFace: '#ffffff',
    cardBorder: '#bbbbbb',    // gray 8
    cardBack: '#0d74ce',
    diagramArrow: '#838383',  // gray 10
    diagramGood: '#113264',   // blue 12 — blue 11 is 4.18:1 on gray 3
    diagramWarn: '#582d1d',   // orange 12
    diagramGoodBg: '#e6f4fe',
    diagramWarnBg: '#fff7ed',
    shadowSm: 'none',
    shadowMd: 'none',
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
    accent: '#70b8ff',
    accentHover: '#ffffff',
    accentSoft: '#0d2847',
    accentOnSoft: '#70b8ff',
    accentSolid: '#0588f0',
    accentSolidHover: '#3b9eff',
    accentOnSolid: '#111111',  // dark on the vivid solid — white on blue 9 is only 3.63:1
    suitRed: '#ff9592',
    warningBg: '#1e160f',
    warningBorder: '#7e451d',
    cardFace: '#f0f0f0',
    cardBorder: '#606060',
    cardBack: '#0588f0',
    diagramArrow: '#7b7b7b',  // gray dark 10
    diagramGood: '#70b8ff',
    diagramWarn: '#ffa057',
    diagramGoodBg: '#0d2847',
    diagramWarnBg: '#1e160f',
    shadowSm: 'none',
    shadowMd: 'none',
  },
};
