// Homepage search + filters. Operates purely on data-* attributes already in
// the HTML, so the game list is never duplicated as a JS payload and the page
// is fully usable with JS disabled.
(function () {
  var form = document.querySelector('[data-finder]');
  var grid = document.querySelector('[data-grid]');
  if (!form || !grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll('[data-game]'));
  var countEl = document.querySelector('[data-count]');
  var emptyEl = document.querySelector('[data-empty]');
  var resetBtns = Array.prototype.slice.call(document.querySelectorAll('[data-reset]'));
  var search = form.querySelector('#q');

  function checked(name) {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name="' + name + '"]:checked'))
      .map(function (i) {
        return i.value;
      });
  }

  // A group with nothing checked means "no constraint". Within a group the
  // match is OR (4 players OR 5+), across groups it is AND.
  function matchesGroup(item, attr, selected) {
    if (!selected.length) return true;
    var values = (item.dataset[attr] || '').split(' ');
    return selected.some(function (s) {
      return values.indexOf(s) !== -1;
    });
  }

  function apply() {
    var q = search.value.trim().toLowerCase();
    var players = checked('players');
    var duration = checked('duration');
    var tags = checked('tags');
    var active = q !== '' || players.length || duration.length || tags.length;
    var shown = 0;

    items.forEach(function (item) {
      var hit =
        (q === '' || (item.dataset.search || '').indexOf(q) !== -1) &&
        matchesGroup(item, 'players', players) &&
        matchesGroup(item, 'duration', duration) &&
        matchesGroup(item, 'tags', tags);
      item.hidden = !hit;
      if (hit) shown++;
    });

    if (countEl) {
      countEl.textContent = active
        ? shown + (shown === 1 ? ' game matches' : ' games match')
        : items.length + ' games';
    }
    if (emptyEl) emptyEl.hidden = shown !== 0;
    resetBtns.forEach(function (b) {
      b.hidden = !active;
    });

    writeHash(q, players, duration, tags, active);
  }

  function writeHash(q, players, duration, tags, active) {
    if (!active) {
      if (location.hash) history.replaceState(null, '', location.pathname);
      return;
    }
    var parts = [];
    if (q) parts.push('q=' + encodeURIComponent(q));
    if (players.length) parts.push('players=' + players.join(','));
    if (duration.length) parts.push('length=' + duration.join(','));
    if (tags.length) parts.push('type=' + tags.map(encodeURIComponent).join(','));
    history.replaceState(null, '', '#' + parts.join('&'));
  }

  // Restore a shared/bookmarked filtered view.
  function readHash() {
    var hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    hash.split('&').forEach(function (pair) {
      var i = pair.indexOf('=');
      if (i === -1) return;
      var key = pair.slice(0, i);
      var val = decodeURIComponent(pair.slice(i + 1));
      if (key === 'q') {
        search.value = val;
        return;
      }
      var name = { players: 'players', length: 'duration', type: 'tags' }[key];
      if (!name) return;
      val.split(',').forEach(function (v) {
        var input = form.querySelector(
          'input[name="' + name + '"][value="' + decodeURIComponent(v).replace(/"/g, '\\"') + '"]'
        );
        if (input) input.checked = true;
      });
    });
  }

  form.addEventListener('input', apply);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  });

  // The reset event fires *before* the controls are cleared, so recompute on
  // the next tick. Cancelling it and calling form.reset() by hand does not
  // work: the re-fired event is cancelled too and nothing ever clears.
  form.addEventListener('reset', function () {
    setTimeout(function () {
      search.value = '';
      apply();
      search.focus();
    }, 0);
  });

  // The empty-state button lives outside the form, so it triggers the reset.
  resetBtns.forEach(function (b) {
    if (b.type !== 'reset') {
      b.addEventListener('click', function () {
        form.reset();
      });
    }
  });

  readHash();
  apply();
})();
