/* Tests js/hero-panels.js by loading the real file against a stubbed DOM and a
 * clock we control.
 *
 * Why not a browser: the panel only cycles while the hero is on screen, and the
 * IntersectionObserver that decides this never fires in a tab that reports
 * document.visibilityState === "hidden", which is what automation tabs report.
 * Every timing assertion made that way passes for the wrong reason, because
 * nothing was running in the first place.
 *
 * Run: node tools/test_hero_panels.js
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function el(cls) {
  const set = new Set((cls || "").split(" ").filter(Boolean));
  return {
    classList: {
      add: (...c) => c.forEach((x) => set.add(x)),
      remove: (...c) => c.forEach((x) => set.delete(x)),
      contains: (c) => set.has(c),
      toggle: (c, on) => (on ? set.add(c) : set.delete(c)),
    },
    style: {},
    scrollHeight: 300,
    offsetWidth: 500,
    addEventListener(type, fn) { (this._h ||= {})[type] = fn; },
    dispatch(type, arg) { this._h && this._h[type] && this._h[type](arg); },
    contains: () => false,
    querySelector: () => null,
    querySelectorAll: () => [],
    getBoundingClientRect: () => ({ top: 0, bottom: 300, height: 300, width: 500 }),
  };
}

function harness() {
  const scenes = [el("is-on"), el(), el(), el(), el()];
  const dots = [el("is-act"), el(), el(), el(), el()];
  const caps = [el("is-act"), el(), el(), el(), el()];
  const body = el("hp-body");
  const root = el();
  root.querySelector = (s) => (s === ".hp-body" ? body : null);
  root.querySelectorAll = (s) =>
    s === ".hp-scene" ? scenes : s === ".hp-dot-btn" ? dots : s === ".hp-cap" ? caps : [];

  let observerCb = null;
  const clock = { now: 0, id: 1, jobs: new Map() };

  const sandbox = {
    document: { getElementById: (id) => (id === "hero-panels" ? root : null), fonts: null },
    window: {
      matchMedia: (q) => ({ matches: q === "(hover: hover)" }),
      addEventListener: () => {},
    },
    IntersectionObserver: function (cb) {
      observerCb = cb;
      this.observe = () => {};
    },
    setTimeout: (fn, ms) => {
      const id = clock.id++;
      clock.jobs.set(id, { fn, at: clock.now + ms });
      return id;
    },
    clearTimeout: (id) => clock.jobs.delete(id),
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, "..", "js", "hero-panels.js"), "utf8"),
    sandbox
  );

  return {
    root, scenes, dots,
    onScreen: (yes) => observerCb([{ isIntersecting: yes }]),
    advance(ms) {
      const end = clock.now + ms;
      for (;;) {
        let next = null;
        for (const [id, j] of clock.jobs) if (j.at <= end && (!next || j.at < next.j.at)) next = { id, j };
        if (!next) break;
        clock.now = next.j.at;
        clock.jobs.delete(next.id);
        next.j.fn();
      }
      clock.now = end;
    },
    active: () => dots.findIndex((d) => d.classList.contains("is-act")),
  };
}

let failed = 0;
function check(name, got, want) {
  const ok = got === want;
  if (!ok) failed++;
  console.log(`${ok ? "pass" : "FAIL"}  ${name}${ok ? "" : `  (got ${got}, want ${want})`}`);
}

// baseline: it cycles once the hero is on screen
let h = harness();
h.onScreen(true);
check("shows the first scene on arrival", h.active(), 0);
h.advance(9000);
check("advances after the dwell", h.active(), 1);

// hover holds, and releasing starts a fresh dwell
h = harness();
h.onScreen(true);
h.advance(1000);
h.root.dispatch("mouseenter");
h.advance(30000);
check("hovering holds the panel still", h.active(), 0);
h.root.dispatch("mouseleave");
h.advance(7000);
check("a fresh dwell starts on leave, not the remainder", h.active(), 0);
h.advance(2000);
check("and it advances once that dwell is up", h.active(), 1);

// keyboard focus holds it the same way
h = harness();
h.onScreen(true);
h.root.dispatch("focusin");
h.advance(30000);
check("focus holds the panel still", h.active(), 0);
h.root.dispatch("focusout", { relatedTarget: null });
h.advance(9000);
check("blur releases it", h.active(), 1);

// scrolling away while held, then back
h = harness();
h.onScreen(true);
h.root.dispatch("mouseenter");
h.onScreen(false);
h.root.dispatch("mouseleave");
h.advance(30000);
check("off screen it stays put however the pointer moved", h.active(), 0);
h.onScreen(true);
h.advance(9000);
check("and resumes when it comes back", h.active(), 1);

// the bug this file was written to catch: arriving on screen under the pointer
h = harness();
h.onScreen(true);
h.advance(9000);
check("precondition: it moved", h.active(), 1);
h.root.dispatch("mouseenter");
h.onScreen(false);
h.onScreen(true);
h.advance(30000);
check("coming back on screen under the pointer does not restart it", h.active(), 1);

process.exit(failed ? 1 : 0);
