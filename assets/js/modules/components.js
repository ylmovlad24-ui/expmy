/**
 * Компоненты шапки и подвала
 * Загружает header.html и footer.html на все страницы
 */
(function () {
  "use strict";

  var globalClickHandler = null;

  function getBasePath() {
    var path = window.location.pathname;
    if (path.indexOf("/pages/services/") !== -1) return "../../../";
    if (path.indexOf("/pages/") !== -1) return "../";
    if (path.indexOf("/vnesudebnaya/") !== -1) return "../";
    if (path.indexOf("/recenziya/") !== -1) return "../";
    if (path.indexOf("/sudebnaya/") !== -1) return "../";
    if (path.indexOf("/faq/") !== -1) return "../";
    if (path.indexOf("/avtotehnicheskaya/") !== -1) {
      var depth = (path.match(/\//g) || []).length;
      return depth >= 3 ? "../../" : "../";
    }
    if (path.indexOf("/avtotovarovedcheskaya/") !== -1) {
      var depth2 = (path.match(/\//g) || []).length;
      return depth2 >= 3 ? "../../" : "../";
    }
    if (path.indexOf("/ceny/") !== -1) return "../";
    if (path.indexOf("/diplomy/") !== -1) return "../";
    if (path.indexOf("/dosudebnye-dlya-yurfirmy/") !== -1) return "../";
    if (path.indexOf("/eksperty/") !== -1) return "../";
    if (path.indexOf("/keysy/") !== -1) return "../";
    if (path.indexOf("/kontakty/") !== -1) return "../";
    if (path.indexOf("/o-kompanii/") !== -1) return "../";
    if (path.indexOf("/oferta/") !== -1) return "../";
    if (path.indexOf("/partners/") !== -1) return "../";
    if (path.indexOf("/politika/") !== -1) return "../";
    if (path.indexOf("/recenzii-dlya-yuristov/") !== -1) return "../";
    if (path.indexOf("/spasibo/") !== -1) return "../";
    if (path.indexOf("/tovarovedcheskaya-b2b/") !== -1) return "../";
    if (path.indexOf("/uzly-i-agregaty/") !== -1) return "../";
    if (path.indexOf("/yuristam/") !== -1) return "../";
    return "";
  }

  function loadComponent(filePath, containerId) {
    var basePath = getBasePath();
    var url = basePath + "components/" + filePath;

    fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("Failed to load " + filePath);
        return response.text();
      })
      .then(function (html) {
        var container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = html;
          adaptPathsForGitHubPages(container);
          if (filePath === "header.html") {
            initHeader();
            if (typeof window.BurgerMenu !== "undefined" && window.BurgerMenu.init) {
              window.BurgerMenu.init();
            }
          }
        }
      })
      .catch(function (error) {
        console.warn("Component load error:", error);
      });
  }

  function adaptPathsForGitHubPages(container) {
    var host = window.location.host;
    if (host.indexOf("github.io") === -1) return;

    var pathParts = window.location.pathname.split("/");
    var repoName = pathParts[1];
    if (!repoName) return;

    var prefix = "/" + repoName + "/";
    var allLinks = container.querySelectorAll("a[href]");
    allLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        href.startsWith("#") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("javascript:")
      )
        return;

      if (href.startsWith("/") && !href.startsWith("//")) {
        var newHref = prefix + href.substring(1);
        link.setAttribute("href", newHref);
      }
    });
  }

  function initHeader() {
    var header = document.querySelector(".header");
    if (!header) return;

    // Desktop mega-menu dropdowns — hover + click
    var desktopToggles = header.querySelectorAll(".header__nav-link--dropdown");
    desktopToggles.forEach(function (toggle) {
      // Click to toggle
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var dropdown = this.closest(".header__nav-dropdown");
        if (!dropdown) return;
        var menu = dropdown.querySelector(".header__mega-menu, .header__simple-menu");
        var isExpanded = this.getAttribute("aria-expanded") === "true";

        header.querySelectorAll(".header__nav-dropdown").forEach(function (d) {
          if (d !== dropdown) {
            var btn = d.querySelector(".header__nav-link--dropdown");
            var m = d.querySelector(".header__mega-menu, .header__simple-menu");
            if (btn) btn.setAttribute("aria-expanded", "false");
            if (m) m.classList.remove("is-open");
          }
        });

        this.setAttribute("aria-expanded", String(!isExpanded));
        menu.classList.toggle("is-open", !isExpanded);
      });

      // Hover to open
      var dropdown = toggle.closest(".header__nav-dropdown");
      if (dropdown) {
        dropdown.addEventListener("mouseenter", function () {
          header.querySelectorAll(".header__nav-dropdown").forEach(function (d) {
            var btn = d.querySelector(".header__nav-link--dropdown");
            var m = d.querySelector(".header__mega-menu, .header__simple-menu");
            if (btn) btn.setAttribute("aria-expanded", "false");
            if (m) m.classList.remove("is-open");
          });
          toggle.setAttribute("aria-expanded", "true");
          var menu = dropdown.querySelector(".header__mega-menu, .header__simple-menu");
          if (menu) menu.classList.add("is-open");
        });

        dropdown.addEventListener("mouseleave", function () {
          header.querySelectorAll(".header__nav-dropdown").forEach(function (d) {
            var btn = d.querySelector(".header__nav-link--dropdown");
            var m = d.querySelector(".header__mega-menu, .header__simple-menu");
            if (btn) btn.setAttribute("aria-expanded", "false");
            if (m) m.classList.remove("is-open");
          });
        });
      }

      toggle.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
        if (e.key === "Escape") {
          var dropdown = this.closest(".header__nav-dropdown");
          var menu = dropdown.querySelector(".header__mega-menu, .header__simple-menu");
          this.setAttribute("aria-expanded", "false");
          menu.classList.remove("is-open");
          this.blur();
        }
      });
    });

    // Close desktop dropdowns when clicking outside
    globalClickHandler = function (e) {
      if (!header.contains(e.target)) {
        header.querySelectorAll(".header__nav-dropdown").forEach(function (d) {
          var btn = d.querySelector(".header__nav-link--dropdown");
          var m = d.querySelector(".header__mega-menu, .header__simple-menu");
          if (btn) btn.setAttribute("aria-expanded", "false");
          if (m) m.classList.remove("is-open");
        });
      }
    };
    document.addEventListener("click", globalClickHandler);

    // Mobile accordion
    var accordions = header.querySelectorAll(".header__menu-accordion__toggle");
    accordions.forEach(function (toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accordion = this.closest(".header__menu-accordion");
        if (!accordion) return;
        var isOpen = accordion.classList.contains("open");

        this.setAttribute("aria-expanded", String(!isOpen));
        accordion.classList.toggle("open", !isOpen);
      });

      toggle.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
        if (e.key === "Escape") {
          var accordion = this.closest(".header__menu-accordion");
          this.setAttribute("aria-expanded", "false");
          accordion.classList.remove("open");
          this.blur();
        }
      });
    });
  }

  // Cleanup function
  var _destroyed = false;
  function cleanup() {
    if (_destroyed) return;
    _destroyed = true;
    if (globalClickHandler) {
      document.removeEventListener("click", globalClickHandler);
      globalClickHandler = null;
    }
  }

  // Sticky nav shadow for yuristam page
  function initYuristamNav() {
    var nav = document.querySelector(".yuristam-nav");
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle("scrolled", window.scrollY > 64);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header.html", "header-container");
    loadComponent("footer.html", "footer-container");
    initYuristamNav();
  });

  // Export for cleanup
  if (typeof window.ComponentsLoader !== "undefined") {
    console.warn("ComponentsLoader already loaded");
  } else {
    window.ComponentsLoader = {
      cleanup: cleanup,
    };
  }
})();
