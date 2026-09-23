/* Hero loop.
 *
 * The figure eight used to be a comet on a nine second CSS animation, with each
 * node lit by its own `animation-delay`. That read as a process running, and
 * nothing in it ever went wrong, which is a strange thing for a page whose
 * headline is that the systems check themselves.
 *
 * So the light now gets stopped. It reaches Verify, is held, runs backwards to
 * Build to be redone, and only passes on the second attempt. A delay-based
 * schedule cannot follow that, because after a reversal the clock and the head
 * disagree. Here the head's arc position is read every frame and a node lights
 * because the light actually reached it, which is what the old comment in
 * style.css said it wanted. Redrawing the path therefore cannot silently break
 * the causality; only the five arc positions below would need recomputing.
 *
 * Verify sits on the crossing of the figure eight, the one stretch of track every
 * pass crosses twice, which is why the send-back is drawn there rather than
 * anywhere else on the path.
 */
(function () {
  "use strict";

  var stage = document.getElementById("hero-loop");
  var path = document.getElementById("loopPath");
  var glow = document.getElementById("loop-glow");
  var trail = document.getElementById("loop-trail");
  if (!stage || !path || !glow || !trail || !path.getTotalLength) return;

  /* The animation is the whole point of the element, so with reduced motion it is
     left at rest rather than run slowly. */
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (still && still.matches) return;

  var LENGTH = path.getTotalLength();
  var LAP_SECONDS = 9;
  var SPEED = LENGTH / LAP_SECONDS;
  /* 240 - 125.9: how far the dim body trails behind the bright head. */
  var TRAIL_LAG = 114.1;
  /* Close enough to count as reached. Below the head's own length, so a node
     cannot be passed over between two frames on a slow device. */
  var ARRIVED = 9;

  /* Seconds into a lap at which the head reaches each node, from its arc position. */
  var NODES = [
    { name: "verify", at: 0.82 },
    { name: "deploy", at: 2.54 },
    { name: "support", at: 4.52 },
    { name: "diagnose", at: 6.09 },
    { name: "build", at: 8.09 }
  ].map(function (n) {
    return {
      name: n.name,
      distance: n.at * SPEED,
      el: stage.querySelector('[data-node="' + n.name + '"]'),
      near: false
    };
  }).filter(function (n) { return n.el; });

  var verify = NODES.filter(function (n) { return n.name === "verify"; })[0];
  var build = NODES.filter(function (n) { return n.name === "build"; })[0];
  if (!verify || !build) return;

  /* Build to Verify, forwards: how far the head is sent back. */
  var SEND_BACK = verify.distance - build.distance + LENGTH;

  var travelled = 0;
  var lastFrame = null;
  var verifyArrivals = 0;
  var phase = "run";
  var phaseSeconds = 0;
  var heldAt = 0;
  var wasSentBack = false;
  var running = false;
  var clearVerdict = null;

  function verdict(which) {
    stage.classList.remove("show-sent", "show-ok");
    if (which) stage.classList.add(which);
  }

  function resetNode(node) {
    node.el.classList.remove("is-lit", "is-caught", "is-pass");
  }

  function advance(seconds) {
    if (phase === "run") {
      travelled += SPEED * seconds;
      return;
    }
    phaseSeconds += seconds;
    if (phase === "hold" && phaseSeconds > 0.55) {
      phase = "back";
      phaseSeconds = 0;
      heldAt = travelled;
      wasSentBack = true;
      stage.classList.add("is-reversing");
      verdict("show-sent");
    } else if (phase === "back") {
      var k = Math.min(phaseSeconds / 0.9, 1);
      var eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      travelled = heldAt - SEND_BACK * eased;
      if (k >= 1) { phase = "redo"; phaseSeconds = 0; }
    } else if (phase === "redo" && phaseSeconds > 0.45) {
      phase = "run";
      phaseSeconds = 0;
      stage.classList.remove("is-reversing");
      verdict(null);
    }
  }

  function arriveAt(node) {
    if (node !== verify) {
      node.el.classList.add("is-lit");
      return;
    }
    verifyArrivals += 1;
    /* The first arrival is a send-back, so nobody has to wait three laps to see
       the thing the whole animation exists for; after that, every third lap. */
    if (phase === "run" && verifyArrivals % 3 === 1) {
      phase = "hold";
      phaseSeconds = 0;
      node.el.classList.add("is-caught");
      return;
    }
    node.el.classList.add("is-pass");
    if (wasSentBack) {
      wasSentBack = false;
      verdict("show-ok");
      if (clearVerdict) clearTimeout(clearVerdict);
      clearVerdict = setTimeout(function () { verdict(null); }, 1200);
    }
  }

  function frame(now) {
    if (!running) return;
    if (lastFrame === null) lastFrame = now;
    /* Clamped so a backgrounded tab does not resume with one enormous step. */
    advance(Math.min((now - lastFrame) / 1000, 0.05));
    lastFrame = now;

    var offset = ((travelled % LENGTH) + LENGTH) % LENGTH;
    glow.style.strokeDashoffset = -offset;
    trail.style.strokeDashoffset = TRAIL_LAG - offset;

    NODES.forEach(function (node) {
      var ahead = (((travelled - node.distance) % LENGTH) + LENGTH) % LENGTH;
      var gap = Math.abs(((ahead + LENGTH / 2) % LENGTH) - LENGTH / 2);
      if (gap < ARRIVED) {
        if (!node.near) { node.near = true; arriveAt(node); }
      } else if (gap > ARRIVED * 3) {
        if (node.near) { node.near = false; }
        if (phase === "run") resetNode(node);
      }
    });

    requestAnimationFrame(frame);
  }

  /* Idle while the hero is off screen: this runs on every page load. */
  if (typeof IntersectionObserver === "function") {
    new IntersectionObserver(function (entries) {
      var visible = entries.some(function (e) { return e.isIntersecting; });
      if (visible && !running) {
        running = true;
        lastFrame = null;
        requestAnimationFrame(frame);
      } else if (!visible) {
        running = false;
      }
    }, { rootMargin: "120px" }).observe(stage);
  } else {
    running = true;
    requestAnimationFrame(frame);
  }
})();
