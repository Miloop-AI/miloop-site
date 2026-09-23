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

  /* Read from the stylesheet rather than repeated here, so moving the dot moves
     the trigger with it. Narrow screens drop the spine and lay the dot inline, so
     there is no offset to apply there. */
  function nodeOffset(band) {
    if (!spine.offsetParent) return 0;
    var t = parseFloat(window.getComputedStyle(band, "::before").top);
    return isNaN(t) ? 0 : t;
  }

  function openBand(band) {
    band.classList.add("is-in");
  }

  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if ((still && still.matches) || typeof IntersectionObserver !== "function") {
    bands.forEach(function (band) { band.classList.add("is-in"); });
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
      /* The node on the spine, not the band's middle. That dot is what the light
         arrives at and it sits 2.4rem below the band's top, so opening on the
         middle meant waiting for the light to travel half the band's height
         first: measured, 380 to 400px of scrolling after the band's top had
         already come into view, and worse the taller the band. */
      if (r.top + nodeOffset(band) <= line) openBand(band);
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
