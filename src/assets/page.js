// Game-page enhancements: highlight the section you are reading in the sticky
// nav, and wire up the print button.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.anchor-nav a'));
  var nav = document.querySelector('.anchor-nav');
  var navList = document.querySelector('.anchor-nav ul');

  if (links.length && navList) {
    var byId = {};
    links.forEach(function (a) {
      byId[a.getAttribute('href').slice(1)] = a;
    });

    // Sections in document order, matching the nav order.
    var sections = links
      .map(function (a) {
        return document.getElementById(a.getAttribute('href').slice(1));
      })
      .filter(Boolean);

    var currentId = null;

    // The active section is the last one whose top has crossed a line just
    // below the sticky nav. Picking by "which sections are visible" is
    // ambiguous — two are on screen most of the time — and choosing between
    // them by smallest top selects the one you have already read past.
    function activeSection() {
      var line = (nav ? nav.getBoundingClientRect().height : 0) + 24;

      // At the bottom of the page the final sections may never cross the
      // line, so the last one wins outright.
      var atBottom =
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) return sections[sections.length - 1];

      var active = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= line) active = sections[i];
        else break;
      }
      return active;
    }

    function keepInView(link) {
      if (navList.scrollWidth <= navList.clientWidth) return;
      var left = link.offsetLeft;
      var right = left + link.offsetWidth;
      if (left < navList.scrollLeft || right > navList.scrollLeft + navList.clientWidth) {
        navList.scrollTo({
          left: left - navList.clientWidth / 2 + link.offsetWidth / 2,
          behavior: 'smooth',
        });
      }
    }

    function mark() {
      var section = activeSection();
      if (!section || section.id === currentId) return;
      currentId = section.id;
      links.forEach(function (a) {
        a.removeAttribute('aria-current');
      });
      var link = byId[section.id];
      if (link) {
        link.setAttribute('aria-current', 'true');
        keepInView(link);
      }
    }

    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        mark();
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    mark();
  }

  var printBtn = document.querySelector('[data-print]');
  if (printBtn) {
    printBtn.hidden = false;
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }
})();
