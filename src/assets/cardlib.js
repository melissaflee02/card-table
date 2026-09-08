// Card library filter. Text match plus optional tag toggles, all over data-*
// attributes already in the HTML — the list is never duplicated in JS.
(function () {
  var root = document.querySelector('[data-cardlib]');
  if (!root) return;

  var q = root.querySelector('[data-cardlib-q]');
  var tagBtns = Array.prototype.slice.call(root.querySelectorAll('[data-cardlib-tag]'));
  var items = Array.prototype.slice.call(root.querySelectorAll('[data-card]'));
  var empty = root.querySelector('[data-cardlib-empty]');
  var count = root.querySelector('[data-cardlib-count]');
  var active = [];

  function apply() {
    var term = (q.value || '').trim().toLowerCase();
    var shown = 0;
    items.forEach(function (item) {
      var tags = (item.dataset.tags || '').split(' ');
      var hit =
        (term === '' || (item.dataset.search || '').indexOf(term) !== -1) &&
        (active.length === 0 || active.some(function (t) { return tags.indexOf(t) !== -1; }));
      item.hidden = !hit;
      if (hit) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
    // Typing filters the grid with no other signal, so say what happened.
    if (count) {
      var filtering = term !== '' || active.length > 0;
      count.textContent = filtering
        ? shown + (shown === 1 ? ' card matches' : ' cards match')
        : items.length + ' cards';
    }
  }

  q.addEventListener('input', apply);
  tagBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tag = btn.dataset.cardlibTag;
      var at = active.indexOf(tag);
      if (at === -1) active.push(tag); else active.splice(at, 1);
      btn.setAttribute('aria-pressed', at === -1 ? 'true' : 'false');
      apply();
    });
  });

  apply();
})();
