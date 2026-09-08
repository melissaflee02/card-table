// Generic score tracker. One implementation drives every game; behaviour comes
// from the data-* config the template emits (mode, target, unit).
(function () {
  var host = document.querySelector('[data-tracker]');
  if (!host) return;

  var CONFIG = {
    game: host.dataset.game,
    mode: host.dataset.mode === 'high' ? 'high' : 'low',
    target: host.dataset.target ? Number(host.dataset.target) : null,
    unit: host.dataset.unit || 'points',
  };
  var KEY = 'scores:' + CONFIG.game;
  var MAX_PLAYERS = 8;

  var state = load() || { players: ['Player 1', 'Player 2', 'Player 3'], rounds: [] };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.players) || !Array.isArray(parsed.rounds)) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable — tracker still works for this session */
    }
  }

  function totals() {
    return state.players.map(function (_, p) {
      return state.rounds.reduce(function (sum, round) {
        var v = Number(round[p]);
        return sum + (isFinite(v) ? v : 0);
      }, 0);
    });
  }

  // A player only "leads" once at least one round has a real number in it,
  // otherwise every player would be flagged as joint leader on 0.
  function hasScores() {
    return state.rounds.some(function (round) {
      return round.some(function (v) {
        return v !== '' && v !== null && v !== undefined && isFinite(Number(v));
      });
    });
  }

  function leaders(t) {
    if (!hasScores()) return [];
    var best = CONFIG.mode === 'low' ? Math.min.apply(null, t) : Math.max.apply(null, t);
    return t.reduce(function (acc, v, i) {
      if (v === best) acc.push(i);
      return acc;
    }, []);
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render() {
    var t = totals();
    var lead = leaders(t);
    var reached = CONFIG.target !== null && hasScores() && Math.max.apply(null, t) >= CONFIG.target;

    var html =
      '<div class="tracker__panel">' +
      '<div class="tracker__players">' +
      state.players
        .map(function (name, i) {
          return (
            '<input type="text" value="' +
            esc(name) +
            '" data-name="' +
            i +
            '" aria-label="Name of player ' +
            (i + 1) +
            '" maxlength="14">'
          );
        })
        .join('') +
      (state.players.length < MAX_PLAYERS
        ? '<button class="btn btn--quiet" type="button" data-add-player>+ Player</button>'
        : '') +
      (state.players.length > 2
        ? '<button class="btn btn--quiet" type="button" data-remove-player>&minus; Player</button>'
        : '') +
      '</div>' +
      '<div class="tracker__grid">' +
      '<table>' +
      '<thead><tr><th scope="col" class="tracker__rounds-head">Round</th>' +
      state.players
        .map(function (n) {
          return '<th scope="col" class="tracker__rounds-head">' + esc(n) + '</th>';
        })
        .join('') +
      '</tr></thead><tbody>' +
      state.rounds
        .map(function (round, r) {
          return (
            '<tr><th scope="row">' +
            (r + 1) +
            '</th>' +
            state.players
              .map(function (_, p) {
                var v = round[p];
                return (
                  '<td><input type="number" inputmode="numeric" step="1" value="' +
                  (v === undefined || v === null ? '' : esc(v)) +
                  '" data-round="' +
                  r +
                  '" data-player="' +
                  p +
                  '" aria-label="Round ' +
                  (r + 1) +
                  ', ' +
                  esc(state.players[p]) +
                  '"></td>'
                );
              })
              .join('') +
            '</tr>'
          );
        })
        .join('') +
      '<tr class="tracker__totals"><th scope="row">Total</th>' +
      t
        .map(function (v, i) {
          return (
            '<td' + (lead.indexOf(i) !== -1 ? ' class="tracker__leader"' : '') + '>' + v + '</td>'
          );
        })
        .join('') +
      '</tr>' +
      '</tbody></table></div>' +
      '<div class="tracker__actions">' +
      '<button class="btn btn--primary" type="button" data-add-round>+ Add round</button>' +
      (state.rounds.length
        ? '<button class="btn btn--quiet" type="button" data-remove-round>Remove last round</button>' +
          '<button class="btn btn--quiet" type="button" data-reset-scores>Reset game</button>'
        : '') +
      '</div>' +
      '</div>';

    if (reached) {
      var names = lead.map(function (i) {
        return state.players[i];
      });
      html +=
        '<p class="tracker__winner" role="status">' +
        esc(names.join(' and ')) +
        (names.length > 1 ? ' win' : ' wins') +
        ' with ' +
        (CONFIG.mode === 'low' ? 'the lowest' : 'the highest') +
        ' score (' +
        (CONFIG.mode === 'low' ? Math.min.apply(null, t) : Math.max.apply(null, t)) +
        ' ' +
        esc(CONFIG.unit) +
        ') — someone reached ' +
        CONFIG.target +
        '.</p>';
    }

    var panel = host.querySelector('.tracker__panel');
    var winner = host.querySelector('.tracker__winner');
    if (panel) panel.remove();
    if (winner) winner.remove();
    host.insertAdjacentHTML('beforeend', html);
  }

  // Re-rendering on every keystroke would steal focus, so score edits update
  // state and only refresh the totals row in place.
  function refreshTotals() {
    var t = totals();
    var lead = leaders(t);
    var cells = host.querySelectorAll('.tracker__totals td');
    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = t[i];
      cells[i].className = lead.indexOf(i) !== -1 ? 'tracker__leader' : '';
    }
    var reached = CONFIG.target !== null && hasScores() && Math.max.apply(null, t) >= CONFIG.target;
    var winner = host.querySelector('.tracker__winner');
    if (reached !== !!winner) render();
  }

  host.addEventListener('input', function (e) {
    var el = e.target;
    if (el.dataset.round !== undefined && el.dataset.player !== undefined) {
      state.rounds[Number(el.dataset.round)][Number(el.dataset.player)] = el.value;
      save();
      refreshTotals();
    } else if (el.dataset.name !== undefined) {
      state.players[Number(el.dataset.name)] = el.value;
      save();
      var i = Number(el.dataset.name);
      var headers = host.querySelectorAll('thead th');
      if (headers[i + 1]) headers[i + 1].textContent = el.value;
      // Renaming deliberately does not re-render — that would steal focus
      // mid-typing — so patch the score cells' accessible names by hand.
      // Without this a screen reader still announces "Round 1, Player 1"
      // for a column the sighted user has already relabelled "Ana".
      var cells = host.querySelectorAll('input[data-player="' + i + '"]');
      for (var c = 0; c < cells.length; c++) {
        cells[c].setAttribute(
          'aria-label',
          'Round ' + (Number(cells[c].dataset.round) + 1) + ', ' + el.value
        );
      }
    }
  });

  host.addEventListener('click', function (e) {
    var el = e.target.closest('button');
    if (!el) return;

    if (el.hasAttribute('data-add-round')) {
      state.rounds.push(state.players.map(function () { return ''; }));
    } else if (el.hasAttribute('data-remove-round')) {
      state.rounds.pop();
    } else if (el.hasAttribute('data-add-player')) {
      state.players.push('Player ' + (state.players.length + 1));
      state.rounds.forEach(function (r) { r.push(''); });
    } else if (el.hasAttribute('data-remove-player')) {
      state.players.pop();
      state.rounds.forEach(function (r) { r.pop(); });
    } else if (el.hasAttribute('data-reset-scores')) {
      state.rounds = [];
    } else {
      return;
    }

    save();
    var action = el.dataset.action || el.getAttributeNames().find(function (n) {
      return n.indexOf('data-') === 0 && n !== 'data-action';
    });
    render();

    // render() replaces the panel, so the button that was just clicked no
    // longer exists and focus falls to <body>. Put it back on the equivalent
    // control, or on the first cell of a freshly added round.
    if (action === 'data-add-round') {
      var first = host.querySelector(
        'input[data-round="' + (state.rounds.length - 1) + '"][data-player="0"]'
      );
      if (first) { first.focus(); return; }
    }
    var again = host.querySelector('[' + action + ']') || host.querySelector('[data-add-round]');
    if (again) again.focus();
  });

  render();
})();
