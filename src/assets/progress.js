// Shared drill-progress store. Loaded on every page that shows a ring.
(function () {
  var PREFIX = 'drills:';

  function read(game) {
    try {
      var raw = localStorage.getItem(PREFIX + game);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function write(game, list) {
    try {
      localStorage.setItem(PREFIX + game, JSON.stringify(list));
    } catch (e) {
      /* private browsing — progress just will not persist */
    }
  }

  function complete(game, id) {
    var list = read(game);
    if (list.indexOf(id) === -1) {
      list.push(id);
      write(game, list);
    }
    paint();
  }

  // A ring is an SVG circle whose dash offset is driven by the completed count.
  function paint() {
    var rings = document.querySelectorAll('[data-ring]');
    for (var i = 0; i < rings.length; i++) {
      var ring = rings[i];
      var total = Number(ring.dataset.total) || 0;
      var done = Math.min(read(ring.dataset.ringGame).length, total);
      var fill = ring.querySelector('.ring__fill');
      var count = ring.querySelector('[data-ring-count]');
      var tick = ring.querySelector('[data-ring-done]');
      var pct = total ? done / total : 0;

      if (fill) {
        var len = 2 * Math.PI * 15.5;
        fill.style.strokeDasharray = len;
        fill.style.strokeDashoffset = len * (1 - pct);
      }
      if (count) count.textContent = done + '/' + total;
      var finished = total > 0 && done >= total;
      ring.classList.toggle('is-complete', finished);
      if (tick) tick.hidden = !finished;
      if (count) count.hidden = finished;
      ring.setAttribute('role', 'img');
      ring.setAttribute('aria-label',
        done + ' of ' + total + ' drills completed' + (finished ? ' — all done' : ''));
    }
  }

  window.CardTableProgress = { read: read, complete: complete, paint: paint };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint);
  } else {
    paint();
  }
})();
