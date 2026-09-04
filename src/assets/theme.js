// Theme toggle. The initial theme is already applied by an inline snippet in
// <head>, so this only wires up the button and keeps its label honest.
(function () {
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;

  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    return root.dataset.theme || (media.matches ? 'dark' : 'light');
  }

  function sync() {
    var next = current() === 'dark' ? 'light' : 'dark';
    btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    btn.querySelector('.theme-toggle__text').textContent =
      current() === 'dark' ? 'Dark' : 'Light';
  }

  btn.hidden = false;
  sync();

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    // Colour transitions meant for hover states smear across the whole page
    // during a theme flip, so switch them off for the duration of the swap.
    root.classList.add('theme-switching');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.remove('theme-switching');
      });
    });
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* private browsing — the toggle still works for this page */
    }
    sync();
  });

  // Follow the OS if the user has never made an explicit choice.
  media.addEventListener('change', function () {
    if (!root.dataset.theme) sync();
  });
})();
