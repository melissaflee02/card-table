// Radix Colors: lime (brand) + amber (callouts) on olive neutrals.
// Olive is the gray Radix recommends pairing with lime, so the greys carry a
// faint green cast rather than fighting the accent.
//
// Values are Radix steps, taken verbatim from @radix-ui/colors. The step
// semantics that matter here:
//   1-3  backgrounds        6-8  borders
//   9    solid background   11   low-contrast text      12  high-contrast text
//
// Lime is one of Radix's *bright* scales: step 9 (#bdee63) is light, so text
// placed on a lime solid must be dark in BOTH modes. That is why accentOnSolid
// is the light scale's step 12 even in dark mode, and why `accent` (links,
// which need 4.5:1 on the page) is step 11 rather than step 9.
export default {
  name: 'Radix Lime',
  description: 'Radix lime and amber on olive greys. Fresh, high-contrast, a bit sharper.',
  light: {
    bg: '#f8faf8',            // olive 2
    surface: '#ffffff',       // white, so cards lift off the page
    surface2: '#eff1ef',      // olive 3
    border: '#d7dad7',        // olive 6
    borderStrong: '#cccfcc',  // olive 7
    inputBorder: '#898e87',   // olive 9 — step 8 is only ~1.9:1 on white
    text: '#1d211c',          // olive 12
    textMuted: '#60655f',     // olive 11
    accent: '#5c7c2f',        // lime 11 — the text-safe lime
    accentHover: '#37401c',   // lime 12
    accentSoft: '#eef6d6',    // lime 3
    accentOnSoft: '#37401c',  // lime 12 — lime 11 is only 4.29:1 on lime 3
    accentSolid: '#bdee63',   // lime 9
    accentSolidHover: '#b0e64c', // lime 10
    accentOnSolid: '#37401c', // lime 12 — dark, because lime 9 is bright
    suitRed: '#ce2c31',       // red 11
    warningBg: '#fefbe9',     // amber 2
    warningBorder: '#e9c162', // amber 7
    cardFace: '#ffffff',
    cardBorder: '#cccfcc',    // olive 7
    cardBack: '#5c7c2f',      // lime 11 — a bright lime 9 back would glare
    diagramArrow: '#7f847d',  // olive 10 — olive 9 is 2.9:1 on olive 3
    diagramGood: '#37401c',   // lime 12 — lime 11 is 4.22:1 on olive 3
    diagramWarn: '#4f3422',   // amber 12 — amber 11 is 4.06:1 on olive 3
    diagramGoodBg: '#eef6d6', // lime 3
    diagramWarnBg: '#fff7c2', // amber 3
    shadowSm: '0 1px 2px rgb(29 33 28 / 7%), 0 1px 3px rgb(29 33 28 / 5%)',
    shadowMd: '0 4px 16px rgb(29 33 28 / 10%), 0 1px 3px rgb(29 33 28 / 6%)',
  },
  dark: {
    bg: '#111210',            // olive dark 1
    surface: '#181917',       // olive dark 2
    surface2: '#212220',      // olive dark 3
    border: '#383a36',        // olive dark 6
    borderStrong: '#454843',  // olive dark 7
    inputBorder: '#687066',   // olive dark 9
    text: '#eceeec',          // olive dark 12
    textMuted: '#afb5ad',     // olive dark 11
    accent: '#bde56c',        // lime dark 11
    accentHover: '#e3f7ba',   // lime dark 12
    accentSoft: '#1f2917',    // lime dark 3
    accentOnSoft: '#bde56c',  // lime dark 11
    accentSolid: '#bdee63',   // lime dark 9 — still bright
    accentSolidHover: '#d4ff70', // lime dark 10
    accentOnSolid: '#37401c', // lime LIGHT 12: dark text on a bright solid
    suitRed: '#ff9592',       // red dark 11
    warningBg: '#1d180f',     // amber dark 2
    warningBorder: '#714f19', // amber dark 7
    cardFace: '#eff1ef',      // olive light 3 — dimmed so cards do not glare
    cardBorder: '#5c625b',    // olive dark 8
    cardBack: '#577538',      // lime dark 8
    diagramArrow: '#767d74',  // olive dark 10
    diagramGood: '#bde56c',   // lime dark 11
    diagramWarn: '#ffca16',   // amber dark 11
    diagramGoodBg: '#1f2917', // lime dark 3
    diagramWarnBg: '#302008', // amber dark 3
    shadowSm: '0 1px 2px rgb(0 0 0 / 35%)',
    shadowMd: '0 4px 18px rgb(0 0 0 / 45%)',
  },
};
