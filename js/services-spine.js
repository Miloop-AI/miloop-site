/* Services spine.
 *
 * The hero's loop, unrolled. A light walks down the line beside the five services
 * as the page is read, and a band opens because the light reached it. The five are
 * one path in order, Diagnose to Support, and nothing in the old tabbed panel
 * carried that; this is the connective tissue.
 *
 * Progressive enhancement is deliberate. The stylesheet leaves every band visible,
 * and the waiting state only applies under .js-on, which is added here. If this
 * file fails to load or throws before that line, the section is plain and complete
 * rather than five empty frames.
 */
(function () {
  "use strict";

  var stack = document.getElementById("services-stack");
  if (!stack) return;

  var bands = [].slice.call(stack.querySelectorAll(".sv-band"));
  var spine = stack.querySelector(".sv-spine");
  var lit = stack.querySelector(".sv-spine-lit");
  var head = stack.querySelector(".sv-spine-head");
  if (!bands.length || !spine || !lit || !head) return;

  function openBand(band) {
    if (band.classList.contains("is-in")) return;
    band.classList.add("is-in");
    var body = band.querySelector(".sv-panel-body");
    if (!body) return;
    /* The copy lands first and the panel plays its own beat just behind it. Short
       on purpose: while this is pending the panel is a frame with nothing in it,
       and an empty frame is worse than no stagger at all. */
    setTimeout(function () { body.classList.add("is-run"); }, 180);
    /* Second beat, for the one panel that has one: the rejected draft is rewritten
       and published, so the diagram resolves instead of freezing on the failure. */
    setTimeout(function () { body.classList.add("is-done"); }, 2300);
  }

  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if ((still && still.matches) || typeof IntersectionObserver !== "function") {
    bands.forEach(function (band) {
      band.classList.add("is-in");
      var body = band.querySelector(".sv-panel-body");
      if (body) { body.classList.add("is-run"); body.classList.add("is-done"); }
    });
    return;
  }

  stack.classList.add("js-on");

  function paint() {
    var box = spine.getBoundingClientRect();
    /* The reading line. A band opens as its middle crosses it, which puts the band
       in the lower half of the screen at that moment rather than already read. */
    var line = window.innerHeight * 0.78;
    var progress = Math.max(0, Math.min(1, (line - box.top) / box.height));
    lit.style.height = progress * 100 + "%";
    head.style.top = progress * 100 + "%";
    stack.classList.toggle("is-moving", progress > 0.001 && progress < 0.999);

    bands.forEach(function (band) {
      if (band.classList.contains("is-in")) return;
      var r = band.getBoundingClientRect();
      if (r.top + r.height / 2 <= line) openBand(band);
    });
  }

  /* A frame loop rather than a scroll listener: scroll fires on whichever element
     actually scrolls, which is not always the window. The loop only runs while the
     section is on screen, so it costs nothing the rest of the time. */
  var running = false;
  function tick() {
    if (!running) return;
    paint();
    requestAnimationFrame(tick);
  }

  new IntersectionObserver(function (entries) {
    var visible = entries.some(function (e) { return e.isIntersecting; });
    if (visible && !running) {
      running = true;
      requestAnimationFrame(tick);
    } else if (!visible) {
      running = false;
    }
  }, { rootMargin: "200px" }).observe(stack);

  /* Paint once immediately: anything already at or above the reading line on load
     is open before the first frame, so the section is never a row of empty frames. */
  paint();
})();
