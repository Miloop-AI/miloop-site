/* ==========================================================================
   Miloop AI: lead-intake.js
   Open/close mechanics plus the language pre-fill step for the
   "Start a conversation" side panel. Question flow and API calls are
   added separately.
   ========================================================================== */

(function () {
  var startButtons = document.querySelectorAll(".js-start-conversation");
  var overlay = document.getElementById("lead-panel-overlay");
  var panel = document.getElementById("lead-panel");
  var closeButton = document.getElementById("lead-panel-close");
  var langOptions = document.querySelectorAll(".lead-panel__option");
  var continueButton = document.getElementById("lead-lang-continue");
  var lastTrigger = null;
  var selectedLang = "en";

  if (!overlay || !panel || !closeButton || !startButtons.length) return;

  function applyStoredLanguage() {
    var stored = "en";
    try { stored = localStorage.getItem("miloop-lang") || "en"; } catch (e) { /* ignore */ }
    selectedLang = stored;
    langOptions.forEach(function (button) {
      var isSelected = button.getAttribute("data-lang") === selectedLang;
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function openPanel(event) {
    lastTrigger = event ? event.currentTarget : null;
    applyStoredLanguage();
    overlay.classList.add("is-open");
    panel.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (continueButton) continueButton.focus();
  }

  function closePanel() {
    overlay.classList.remove("is-open");
    panel.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    (lastTrigger || startButtons[0]).focus();
  }

  startButtons.forEach(function (btn) {
    btn.addEventListener("click", openPanel);
  });
  closeButton.addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panel.classList.contains("is-open")) {
      closePanel();
    }
  });

  langOptions.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedLang = button.getAttribute("data-lang");
      langOptions.forEach(function (option) {
        option.setAttribute("aria-pressed", String(option === button));
      });
      /* Keep the main site (nav dropdown, page copy) in sync with a
         language choice made inside the panel, rather than tracking a
         second, disconnected language state. */
      if (window.miloopSetLanguage) window.miloopSetLanguage(selectedLang);
    });
  });

  if (continueButton) {
    continueButton.addEventListener("click", function () {
      // next step: advance the state machine to question 1 using selectedLang
      console.log("continuing with language", selectedLang);
    });
  }
})();
