(function () {
  "use strict";

  var storageKey = "retro-mode";
  var button = document.getElementById("retro-mode-toggle");

  function update(enabled) {
    document.body.classList.toggle("retro-mode", enabled);
    button.setAttribute("aria-pressed", enabled ? "true" : "false");
    button.textContent = enabled ? "Light mode" : "Dark mode";
  }

  var enabled = false;

  try {
    enabled = window.localStorage.getItem(storageKey) === "true";
  } catch (error) {
    enabled = false;
  }

  update(enabled);

  button.addEventListener("click", function () {
    enabled = !document.body.classList.contains("retro-mode");
    update(enabled);

    try {
      window.localStorage.setItem(storageKey, enabled ? "true" : "false");
    } catch (error) {
      // The mode still works when local storage is unavailable.
    }
  });
}());
