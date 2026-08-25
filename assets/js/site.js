document.documentElement.classList.add('js-reveal');

/* Scroll reveal — 18px rise, 640ms, ~70ms stagger, fires once (brief §4.3). */
(function () {
  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!nodes.length) return;

  var show = function (el) { el.classList.add('is-in'); };

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(show);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      io.unobserve(el);
      setTimeout(function () { show(el); }, i * 70);
    });
  }, { threshold: 0.15 });

  nodes.forEach(function (n) { io.observe(n); });

  // Observer callbacks are suspended while a tab is hidden or occluded. Nothing
  // may stay invisible because a decoration never ran.
  setTimeout(function () { nodes.forEach(show); }, 2500);
})();

/* Menu — each instance owns its own open state (brief §4.1). */
(function () {
  document.querySelectorAll('[data-menu]').forEach(function (menu) {
    var button = menu.querySelector('[data-menu-button]');
    var panel = menu.querySelector('[data-menu-panel]');
    var links = Array.prototype.slice.call(panel.querySelectorAll('a'));

    function setOpen(open, focusTarget) {
      panel.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (open) {
        document.addEventListener('pointerdown', onOutside, true);
        (focusTarget || links[0]).focus();
      } else {
        document.removeEventListener('pointerdown', onOutside, true);
      }
    }

    function onOutside(e) {
      if (!menu.contains(e.target)) setOpen(false);
    }

    button.addEventListener('click', function () {
      setOpen(panel.hidden);
    });

    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) {
        setOpen(false);
        button.focus();
        return;
      }
      if (panel.hidden) return;

      var i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        links[i < 0 || i === links.length - 1 ? 0 : i + 1].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        links[i <= 0 ? links.length - 1 : i - 1].focus();
      } else if (e.key === 'Tab') {
        // Keep focus inside the open panel, then restore it to the button.
        if (e.shiftKey && i === 0) { e.preventDefault(); links[links.length - 1].focus(); }
        else if (!e.shiftKey && i === links.length - 1) { e.preventDefault(); links[0].focus(); }
      }
    });
  });
})();

/* Case-study switcher — the Portfolio page's own navigation. */
(function () {
  var list = document.querySelector('[data-tablist]');
  if (!list) return;

  var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { select(tab); });
  });

  list.addEventListener('keydown', function (e) {
    var i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    var next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    var t = tabs[(next + tabs.length) % tabs.length];
    select(t);
    t.focus();
  });
})();

/* Posts archive: paginated on mobile, full list on desktop (brief §13.3).
   A nested scroll region inside a scrolling page is the wrong pattern on
   touch, so the mobile list reveals three at a time instead. */
(function () {
  var list = document.querySelector('.archive__list');
  var wrap = document.querySelector('[data-more-wrap]');
  var btn = document.querySelector('[data-more-btn]');
  var count = document.querySelector('.archive__count');
  if (!list || !wrap || !btn || !count) return;

  var posts = Array.prototype.slice.call(list.querySelectorAll('.post'));
  var TOTAL = posts.length;
  var STEP = 3;
  var mq = window.matchMedia('(max-width:700px)');
  var shown = STEP;

  function render() {
    if (!mq.matches) {
      // Desktop: every post stays in the DOM so the box scrolls to reveal
      // them. The box's own height is set by the sync script below, and
      // .archive__list carries overflow-y:auto, so the run past the fold
      // is reachable by scrolling inside the box.
      posts.forEach(function (p) { p.hidden = false; });
      wrap.hidden = true;
      count.textContent = TOTAL + ' posts';
      return;
    }
    posts.forEach(function (p, i) { p.hidden = i >= shown; });
    wrap.hidden = shown >= TOTAL;
    count.textContent = shown + ' of ' + TOTAL + ' posts';
  }

  btn.addEventListener('click', function () {
    shown = Math.min(TOTAL, shown + STEP);
    render();
  });

  // Reset the window when crossing the breakpoint, so returning to mobile
  // does not inherit a half-expanded list from a desktop resize.
  mq.addEventListener('change', function () { shown = STEP; render(); });

  render();
})();

/* Personality flip cards (About): the flip is pure CSS (:hover, :focus) —
   deliberately not JS-driven, per the design brief, to avoid the lag an
   earlier React-state version had. A click focuses a card (tabindex=0),
   which "locks" it flipped via :focus even after the mouse leaves. Because
   only the ACTUAL flip transform is CSS-driven, nothing stopped a second
   card from also flipping via :hover while the first stayed locked via
   :focus — two cards open at once. This doesn't touch the transform itself,
   it just releases that lock the moment a different card is hovered. */
(function () {
  var cards = document.querySelectorAll('.flip__inner');
  if (!cards.length) return;
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      var active = document.activeElement;
      if (active && active !== card && active.classList.contains('flip__inner')) {
        active.blur();
      }
    });
  });
})();

/* Publications: the posts panel's height is set so the white space below the
   box, before the footer, is a fixed 16px (half the reports column's own
   28px gap to the footer — see .pubs__main's padding-bottom in CSS).
   Desktop only — mobile paginates instead of scrolling (handled by the
   block above).

   The target is the REPORTS COLUMN's bottom edge, not the footer itself:
   the footer's own position is downstream of whichever column is tallest,
   and since align-items:start lets the archive box be shorter than the
   reports column without being stretched to match it, sizing off the
   footer directly would create a feedback loop (a taller box pushes the
   footer down, which would then compute an even taller box, ...). Sizing
   off the reports column instead is a fixed point: this formula always
   lands the box ~48px shorter than that column (32px margin-top eaten from
   the top, 16px target gap eaten from the bottom), so the box can never
   become the tallest one, and the footer's position never depends on it. */
(function () {
  var list = document.querySelector('.archive__list');
  var reports = document.querySelector('.pubs__main');
  if (!list || !reports) return;
  var GAP = 16; // target white space between the box's bottom and the footer
  var mq = window.matchMedia('(max-width:700px)');

  function sync() {
    if (mq.matches) { list.style.height = ''; return; }
    var top = list.getBoundingClientRect().top;
    var bottom = reports.getBoundingClientRect().bottom - GAP;
    var h = Math.round(bottom - top);
    // A fixed height (not max-height): the full run of posts is taller than
    // this, so pinning the height is what gives .archive__list's
    // overflow-y:auto something to scroll, while still landing the box's
    // bottom on the target.
    if (h > 100) list.style.height = h + 'px';
  }

  window.addEventListener('resize', sync);
  window.addEventListener('load', sync);
  // Cover images loading after initial layout can shift the reports
  // column's height, and so the target.
  document.querySelectorAll('.pub img').forEach(function (img) {
    if (img.complete) return;
    img.addEventListener('load', sync);
  });
  sync();
})();

/* Publications: if the footer would already sit inside the viewport on
   load (scrolled to top), pad main.pubs just enough to push it 3px below
   the fold. This runs after the archive-box sync above (same file order,
   so its height is already final when this measures), and is computed
   against the real viewport rather than a fixed guess — a fixed px value
   either leaves the footer visible on short windows or wastes a lot of
   space on tall ones, since the content itself doesn't grow with height. */
(function () {
  var main = document.querySelector('main.pubs');
  var footer = document.querySelector('.site-footer');
  if (!main || !footer) return;
  var mq = window.matchMedia('(max-width:700px)');

  function sync() {
    main.style.paddingBottom = '';
    if (mq.matches) return;
    var deficit = window.innerHeight - footer.getBoundingClientRect().top;
    if (deficit > 0) main.style.paddingBottom = Math.ceil(deficit + 3) + 'px';
  }

  window.addEventListener('resize', sync);
  window.addEventListener('load', sync);
  document.querySelectorAll('.pub img').forEach(function (img) {
    if (img.complete) return;
    img.addEventListener('load', sync);
  });
  sync();
})();
