/* ==========================================================================
   Miloop AI: lead-intake.js
   Open/close mechanics for the "Start a conversation" side panel.
   Step logic, language pre-fill, and API calls are added separately.
   ========================================================================== */

(function () {
  var startButtons = document.querySelectorAll(".js-start-conversation");
  var overlay = document.getElementById("lead-panel-overlay");
  var panel = document.getElementById("lead-panel");
  var closeButton = document.getElementById("lead-panel-close");
  var lastTrigger = null;

  if (!overlay || !panel || !closeButton || !startButtons.length) return;

  function openPanel(event) {
    lastTrigger = event ? event.currentTarget : null;
    overlay.classList.add("is-open");
    panel.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var firstOption = panel.querySelector(".lead-panel__option");
    if (firstOption) firstOption.focus();
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
})();
