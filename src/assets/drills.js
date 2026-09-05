// Try It drills: pick a card, get told why. Completion feeds the progress ring.
(function () {
  var drills = document.querySelectorAll('[data-drill]');
  if (!drills.length) return;

  var progress = window.CardTableProgress;

  function settle(drill, correct) {
    var box = drill.querySelector('[data-drill-feedback]');
    var text = drill.querySelector('[data-drill-feedback-text]');
    var tpl = drill.querySelector(correct ? '[data-correct-text]' : '[data-wrong-text]');
    var again = drill.querySelector('[data-drill-again]');

    text.innerHTML = tpl ? tpl.innerHTML : '';
    box.hidden = false;
    box.dataset.state = correct ? 'correct' : 'wrong';
    // A right answer ends the drill; a wrong one offers another go.
    again.hidden = correct;
    drill.classList.toggle('is-correct', correct);
    drill.classList.toggle('is-wrong', !correct);

    if (correct) {
      var check = drill.querySelector('[data-drill-check]');
      if (check) check.hidden = false;
      if (progress) progress.complete(drill.dataset.game, drill.dataset.id);
    }
  }

  function reset(drill) {
    drill.classList.remove('is-wrong');
    drill.querySelector('[data-drill-feedback]').hidden = true;
    var opts = drill.querySelectorAll('[data-drill-option]');
    for (var i = 0; i < opts.length; i++) {
      opts[i].disabled = false;
      opts[i].removeAttribute('data-picked');
    }
  }

  for (var i = 0; i < drills.length; i++) {
    (function (drill) {
      // Already completed in a previous visit: show it as done, still replayable.
      if (progress && progress.read(drill.dataset.game).indexOf(drill.dataset.id) !== -1) {
        var check = drill.querySelector('[data-drill-check]');
        if (check) check.hidden = false;
        drill.classList.add('is-done');
      }

      drill.addEventListener('click', function (e) {
        var opt = e.target.closest('[data-drill-option]');
        if (opt && !opt.disabled) {
          var correct = opt.hasAttribute('data-correct');
          opt.dataset.picked = correct ? 'correct' : 'wrong';
          if (correct) {
            var all = drill.querySelectorAll('[data-drill-option]');
            for (var n = 0; n < all.length; n++) all[n].disabled = true;
          } else {
            opt.disabled = true;
          }
          settle(drill, correct);
          return;
        }
        if (e.target.closest('[data-drill-again]')) reset(drill);
      });
    })(drills[i]);
  }
})();
