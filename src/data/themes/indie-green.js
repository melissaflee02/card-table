// Clean modern indie / rogue-lite: parchment page, dark slate panels, one
// vibrant accent. The accent splits by role because a neon green is far too
// light to be link text — it works as a solid with dark type on it.
export default {
  name: 'Indie Green',
  description: 'Parchment and slate with a neon green accent.',
  light: {
    bg: '#faf7f2',            // parchment
    surface: '#fffdfa',       // raised card, lighter than the page
    surface2: '#f2ede4',
    border: '#e6dfd2',
    borderStrong: '#cfc5b2',
    inputBorder: '#8b8271',
    text: '#1c1a17',
    textMuted: '#5d574c',

    accent: '#2b6b2f',        // dark green: links, icons
    accentHover: '#1c4a20',
    accentSoft: '#e6f5e6',
    accentOnSoft: '#1c4a20',
    accentSolid: '#4ade80',   // the neon: CTAs, active states, success
    accentSolidHover: '#7bea9f',
    accentOnSolid: '#0b2a12',

    // Dark slate cards, used against the parchment for contrast blocks.
    panel: '#1e232b',
    panelText: '#f3f5f8',
    panelMuted: '#a7b0bd',
    panelBorder: '#2f3742',
    panelAccent: '#4ade80',

    suitRed: '#bd2130',
    warningBg: '#fdf4e3',
    warningBorder: '#e6c88c',
    dangerBg: '#fdecea',
    dangerBorder: '#efb1ab',

    cardFace: '#ffffff',
    cardBorder: '#d8d0c2',
    cardInk: '#1b1a17',
    cardInkRed: '#b3231a',
    cardBack: '#2b6b2f',

    diagramArrow: '#8a8172',
    diagramGood: '#1c4a20',
    diagramWarn: '#8a4a12',
    diagramGoodBg: '#e6f5e6',
    diagramWarnBg: '#fbf0dc',

    shadowSm: '0 1px 2px rgb(28 26 23 / 6%), 0 1px 3px rgb(28 26 23 / 5%)',
    shadowMd: '0 4px 12px rgb(28 26 23 / 8%), 0 2px 4px rgb(28 26 23 / 5%)',
    shadowLg: '0 12px 28px rgb(28 26 23 / 12%), 0 4px 8px rgb(28 26 23 / 6%)',
  },
  dark: {
    bg: '#12151a',
    surface: '#1a1f26',
    surface2: '#222932',
    border: '#2f3742',
    borderStrong: '#414c5a',
    inputBorder: '#66707f',
    text: '#eef1f5',
    textMuted: '#a3adbb',

    accent: '#6ee7a0',
    accentHover: '#a7f3c8',
    accentSoft: '#16301f',
    accentOnSoft: '#6ee7a0',
    accentSolid: '#4ade80',
    accentSolidHover: '#7bea9f',
    accentOnSolid: '#0b2a12',

    // Inverted intent: in dark mode the panel lifts off the page rather than
    // sinking into it, so it stays a distinct surface.
    panel: '#252d38',
    panelText: '#f3f5f8',
    panelMuted: '#a7b0bd',
    panelBorder: '#3a4553',
    panelAccent: '#4ade80',

    suitRed: '#ff9a94',
    warningBg: '#2c2317',
    warningBorder: '#6b5426',
    dangerBg: '#2e1a1a',
    dangerBorder: '#6d3230',

    cardFace: '#f4f2ed',
    cardBorder: '#5b6472',
    cardInk: '#1b1a17',
    cardInkRed: '#b3231a',
    cardBack: '#2f7a44',

    diagramArrow: '#8b94a2',
    diagramGood: '#6ee7a0',
    diagramWarn: '#e0a463',
    diagramGoodBg: '#16301f',
    diagramWarnBg: '#2f2619',

    shadowSm: '0 1px 2px rgb(0 0 0 / 40%)',
    shadowMd: '0 4px 12px rgb(0 0 0 / 45%)',
    shadowLg: '0 12px 28px rgb(0 0 0 / 55%)',
  },
};
