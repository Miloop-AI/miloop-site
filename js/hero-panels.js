/* Hero panels.
 *
 * Five real runs, one at a time, in the panel beside the headline. Each one is
 * something that actually happened: a fault found during a build, a draft the
 * fact-checker sent back, an answer that names its source, an action stopped for a
 * human, a perfect score thrown out for being contaminated.
 *
 * The scenes live in the markup rather than being built here, so every string keeps
 * its data-i18n attribute and goes through the same translation path as the rest of
 * the page. This file only decides which one is showing.
 *
 * Progressive enhancement: the stylesheet shows the first scene and all of its
 * contents by default, and the staged reveal applies only under .js-on, which is
 * added below. If this file never runs, the hero is a finished panel rather than an
 * empty frame.
 */
(function () {
  "use strict";

  var root = document.getElementById("hero-panels");
  if (!root) return;

  var scenes = [].slice.call(root.querySelectorAll(".hp-scene"));
  var buttons = [].slice.call(root.querySelectorAll(".hp-dot-btn"));
  var captions = [].slice.call(root.querySelectorAll(".hp-cap"));
  if (scenes.length < 2) return;

  var DWELL = 8000;          /* long enough to read a scene */
  var DWELL_AFTER_CLICK = 14000;   /* someone who chose a scene wants to finish it */
  var current = -1;
  var timer = null;
  var running = false;

  var body = root.querySelector(".hp-body");

  /* The panel takes the height of the scene on screen, animated, rather than the
     height of the tallest of the five. Holding the worst case meant four scenes out
     of five sat in a box with empty space under them. The number cannot come from
     the stylesheet either: the scenes differ, the three languages differ, and text
     reflows once the webfont lands, so it is measured each time. */
  function fit() {
    var scene = scenes[current] || scenes[0];
    if (body && scene) body.style.height = scene.scrollHeight + "px";
  }

  /* The caption says what the run on screen demonstrates. All five are in the
     markup so each keeps its own data-i18n; only which one is showing changes. */
  function label(i) {
    captions.forEach(function (c, n) { c.classList.toggle("is-act", n === i); });
  }

  function show(i, chosen) {
    if (i === current) return;
    current = i;
    scenes.forEach(function (s, n) {
      s.classList.toggle("is-on", n === i);
      if (n !== i) s.classList.remove("is-run", "is-done");
    });
    buttons.forEach(function (b, n) { b.classList.toggle("is-act", n === i); });
    label(i);

    var scene = scenes[i];
    /* Next frame, so the reveal transitions from the hidden state rather than
       being painted already finished. */
    fit();
    /* Flush the hidden state to the layout, then reveal, so the transition has
       something to start from. This used to wait two animation frames, which never
       arrive while the tab is in the background: the scene would stay invisible and
       only the second beat, on a timer, would land. */
    void scene.offsetWidth;
    scene.classList.add("is-run");
    /* Second beat, for the panel that has one: the rejected draft is rewritten and
       published, so the diagram resolves instead of freezing on the failure. */
    setTimeout(function () { if (current === i) scene.classList.add("is-done"); }, 1800);

    if (timer) clearTimeout(timer);
    if (running) timer = setTimeout(next, chosen ? DWELL_AFTER_CLICK : DWELL);
  }

  function next() { show((current + 1) % scenes.length, false); }

  buttons.forEach(function (b, i) {
    b.addEventListener("click", function () { show(i, true); });
  });

  /* Swipe, because on a phone the panel looks like something you can push and the
     dots are a poor substitute for that. Only a clearly horizontal drag counts, so
     scrolling the page through the panel still works. Attached unconditionally:
     feature-detecting touch excludes laptops with touchscreens and some phones
     that do not expose ontouchstart on window, and the listeners cost nothing
     where there is no touch. */
  var panel = root.querySelector(".hp-panel");
  if (panel) {
    var startX = 0, startY = 0, tracking = false;
    panel.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    }, { passive: true });
    panel.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - startX;
      var dy = t.clientY - startY;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      show((current + (dx < 0 ? 1 : scenes.length - 1)) % scenes.length, true);
    }, { passive: true });
  }

  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (still && still.matches) {
    /* No cycling, and no waiting to be revealed: the first run is simply shown. */
    label(0);
    scenes[0].classList.add("is-run", "is-done");
    return;
  }

  root.classList.add("js-on");
  label(0);
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  var refit = null;
  window.addEventListener("resize", function () {
    clearTimeout(refit);
    refit = setTimeout(fit, 150);
  });

  /* Idle while the hero is off screen rather than cycling to nobody. */
  function start() {
    if (running) return;
    running = true;
    if (current < 0) show(0, false);
    else timer = setTimeout(next, DWELL);
  }
  function stop() {
    running = false;
    if (timer) { clearTimeout(timer); timer = null; }
  }

  if (typeof IntersectionObserver === "function") {
    new IntersectionObserver(function (entries) {
      entries.some(function (e) { return e.isIntersecting; }) ? start() : stop();
    }, { rootMargin: "80px" }).observe(root);
  } else {
    start();
  }
})();
