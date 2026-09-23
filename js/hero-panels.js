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
  var buttons = [].slice.call(root.querySelectorAll(".hp-go"));
  var name = root.querySelector(".hp-name");
  var foot = root.querySelector(".hp-foot");
  if (scenes.length < 2 || !name || !foot) return;

  var DWELL = 8000;          /* long enough to read a scene */
  var DWELL_AFTER_CLICK = 14000;   /* someone who chose a scene wants to finish it */
  var current = -1;
  var timer = null;
  var running = false;

  var body = root.querySelector(".hp-body");

  /* The panel holds a fixed height so it does not jump as the scenes cycle, but the
     right height is not a number anyone can write down: the scenes differ, the three
     languages differ, and text reflows once the webfont lands. So it is measured. A
     stylesheet value would clip whichever scene happened to be longest that day. */
  function fit() {
    if (!body) return;
    var tallest = 0;
    scenes.forEach(function (s) {
      var showing = s.classList.contains("is-on");
      if (!showing) { s.style.display = "block"; s.style.visibility = "hidden"; }
      if (s.scrollHeight > tallest) tallest = s.scrollHeight;
      if (!showing) { s.style.display = ""; s.style.visibility = ""; }
    });
    if (tallest) body.style.height = tallest + "px";
  }

  function label(i) {
    name.innerHTML = scenes[i].getAttribute("data-name") || "";
    foot.textContent = scenes[i].getAttribute("data-foot") || "";
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
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { scene.classList.add("is-run"); });
    });
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
