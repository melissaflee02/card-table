// Shared by blocks.js and diagram.js. Lives in its own module so those two
// can both use it without an import cycle.
export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
