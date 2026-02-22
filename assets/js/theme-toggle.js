(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var ATTR = "data-theme";

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "system";
    } catch (e) {
      return "system";
    }
  }

  function setStored(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // private browsing or storage unavailable
    }
  }

  function resolveTheme(preference) {
    if (preference === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return preference;
  }

  function applyTheme(resolved) {
    document.documentElement.setAttribute(ATTR, resolved);
  }

  function updateButtonIcon(resolved) {
    var lightIcon = document.querySelector(".theme-toggle__icon--light");
    var darkIcon = document.querySelector(".theme-toggle__icon--dark");
    if (!lightIcon || !darkIcon) return;

    if (resolved === "dark") {
      lightIcon.style.display = "none";
      darkIcon.style.display = "block";
    } else {
      lightIcon.style.display = "block";
      darkIcon.style.display = "none";
    }
  }

  function updateMenuChecks(preference) {
    var options = document.querySelectorAll(".theme-toggle__option");
    for (var i = 0; i < options.length; i++) {
      var checked =
        options[i].getAttribute("data-theme-value") === preference;
      options[i].setAttribute("aria-checked", checked ? "true" : "false");
    }
  }

  function init() {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    var button = toggle.querySelector(".theme-toggle__button");
    var menu = toggle.querySelector(".theme-toggle__menu");
    var options = toggle.querySelectorAll(".theme-toggle__option");

    var preference = getStored();
    var resolved = resolveTheme(preference);

    applyTheme(resolved);
    updateButtonIcon(resolved);
    updateMenuChecks(preference);

    // Toggle menu open/close
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      var expanded = menu.classList.contains("is-visible");
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    function openMenu() {
      menu.classList.add("is-visible");
      button.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      menu.classList.remove("is-visible");
      button.setAttribute("aria-expanded", "false");
    }

    // Handle option selection
    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener("click", function (e) {
        e.stopPropagation();
        var value = this.getAttribute("data-theme-value");
        preference = value;
        setStored(value);
        resolved = resolveTheme(value);
        applyTheme(resolved);
        updateButtonIcon(resolved);
        updateMenuChecks(value);
        closeMenu();
      });
    }

    // Close on outside click
    document.addEventListener("click", function () {
      closeMenu();
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    // Listen for OS theme changes when "system" is selected
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function () {
        if (getStored() === "system") {
          var newResolved = resolveTheme("system");
          applyTheme(newResolved);
          updateButtonIcon(newResolved);
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
