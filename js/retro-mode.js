(function () {
  "use strict";

  var storageKey = "retro-mode";
  var button = document.getElementById("retro-mode-toggle");

  if (!button) {
    button = document.createElement("button");
    button.id = "retro-mode-toggle";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");

    var header = document.querySelector(".header");

    if (header) {
      header.appendChild(button);
    } else {
      document.body.insertBefore(button, document.body.firstChild);
    }
  }

  function normalizeFooter() {
    var menus = document.querySelectorAll(".pure-menu-horizontal ul");
    var footerMenu = menus.length ? menus[menus.length - 1] : null;

    if (!footerMenu) {
      return;
    }

    footerMenu.innerHTML =
      '<li><a href="/">Home</a></li>' +
      '<li><a href="/portfolio">Portfolio</a></li>' +
      '<li><a href="/blog">Blog</a></li>' +
      '<li><a href="/talks">Talks</a></li>' +
      '<li><a href="/contact">Contact</a></li>';

    var candidates = document.querySelectorAll("p, pre");
    var contact = null;

    for (var i = 0; i < candidates.length; i += 1) {
      if (candidates[i].textContent.indexOf("ramos.gaston") !== -1) {
        contact = candidates[i];
        break;
      }
    }

    var contactText = document.createElement("p");
    contactText.className = "site-contact";
    contactText.innerHTML =
      'If you want to contact me, email ' +
      '<a href="mailto:ramos.gaston@gmail.com">ramos.gaston@gmail.com</a>.';

    if (contact) {
      contact.parentNode.replaceChild(contactText, contact);
    } else {
      var footer = footerMenu.closest(".content");
      footer.insertBefore(contactText, footer.firstChild);
    }
  }

  normalizeFooter();

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
