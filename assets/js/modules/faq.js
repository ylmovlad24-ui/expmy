/**
 * FAQ Accordion module
 * WCAG 2.1.1: Keyboard accessible (Enter/Space)
 * WCAG 4.1.2: ARIA attributes (aria-expanded, aria-controls, aria-hidden)
 */
var FaqAccordion = (function () {
  "use strict";

  function toggleItem(btn, group) {
    var item = btn.closest(".faq-item");
    var answer = item.querySelector(".faq-item__answer");
    if (!answer) return;
    var isOpen = btn.getAttribute("aria-expanded") === "true";

    // Close all siblings in this group
    group.querySelectorAll(".faq-item").forEach(function (el) {
      var b = el.querySelector(".faq-item__question");
      var a = el.querySelector(".faq-item__answer");
      if (b) b.setAttribute("aria-expanded", "false");
      if (a) {
        a.setAttribute("aria-hidden", "true");
        a.hidden = true;
      }
      el.classList.remove("open");
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      answer.setAttribute("aria-hidden", "false");
      answer.hidden = false;
    }
  }

  function init() {
    // Delegate to each .faq-group
    document.querySelectorAll(".faq-group").forEach(function (group) {
      // Click handler
      group.addEventListener("click", function (e) {
        var btn = e.target.closest(".faq-item__question");
        if (!btn) return;
        toggleItem(btn, group);
      });

      // Keyboard handler — Enter/Space
      group.addEventListener("keydown", function (e) {
        var btn = e.target.closest(".faq-item__question");
        if (!btn) return;

        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleItem(btn, group);
        }

        // Arrow keys — navigate between questions
        if (e.key === "ArrowDown") {
          var next = btn.closest(".faq-item").nextElementSibling;
          if (next) {
            var nextBtn = next.querySelector(".faq-item__question");
            if (nextBtn) nextBtn.focus();
          }
        }
        if (e.key === "ArrowUp") {
          var prev = btn.closest(".faq-item").previousElementSibling;
          if (prev) {
            var prevBtn = prev.querySelector(".faq-item__question");
            if (prevBtn) prevBtn.focus();
          }
        }
        if (e.key === "Home") {
          var firstBtn = group.querySelector(".faq-item__question");
          if (firstBtn) firstBtn.focus();
        }
        if (e.key === "End") {
          var items = group.querySelectorAll(".faq-item__question");
          if (items.length > 0) items[items.length - 1].focus();
        }
      });
    });

    // Also handle .faq-main-item (inline FAQ on index.html)
    document.querySelectorAll(".faq-main-item").forEach(function (item) {
      var questionEl = item.querySelector(".faq-main-item__question");
      if (!questionEl) return;

      // Only convert divs to buttons if not already buttons
      if (questionEl.tagName !== "BUTTON") {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faq-main-item__question";
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", questionEl.textContent.trim());
        btn.innerHTML = questionEl.innerHTML;
        questionEl.replaceWith(btn);
        questionEl = btn;
      }

      var answer = item.querySelector(".faq-main-item__answer");
      if (answer) {
        answer.setAttribute("role", "region");
        answer.setAttribute("aria-hidden", "true");
        answer.hidden = true;
      }

      questionEl.addEventListener("click", function () {
        var isExpanded = questionEl.getAttribute("aria-expanded") === "true";
        questionEl.setAttribute("aria-expanded", String(!isExpanded));
        if (answer) {
          answer.setAttribute("aria-hidden", String(isExpanded));
          answer.hidden = isExpanded;
        }
        item.classList.toggle("open", !isExpanded);
      });

      questionEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          questionEl.click();
        }
      });
    });
  }

  return {
    init: init,
  };
})();
