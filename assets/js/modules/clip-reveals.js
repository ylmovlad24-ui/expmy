/**
 * Clip-path Reveals & Text Reveal Module
 * Показывает элементы с анимацией: clip-path, blur, text (words/letters/lines)
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = "ontouchstart" in window;
  const isLowEnd = (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
                   (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

  // Show all elements immediately for reduced motion
  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal-clip, .reveal-blur, .reveal-text, .text-reveal-words, .text-reveal-lines").forEach(function (el) {
      el.classList.add("revealed");
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("filter", "none", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("clip-path", "none", "important");
    });
    return;
  }

  // Show all elements immediately — no delays
  function showAllElements() {
    document.querySelectorAll(".reveal-clip, .reveal-blur, .reveal-text, .text-reveal-words, .text-reveal-lines").forEach(function (el) {
      el.classList.add("revealed");
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("filter", "none", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("clip-path", "none", "important");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showAllElements);
  } else {
    showAllElements();
  }

  // ============================================
  // Text Reveal: Words
  // ============================================
  function initTextRevealWords() {
    var elements = document.querySelectorAll(".text-reveal-words");
    if (!elements.length) return;

    elements.forEach(function (el) {
      // Skip if already processed
      if (el.dataset.textRevealProcessed) return;
      el.dataset.textRevealProcessed = "true";

      var text = el.textContent.trim();
      var words = text.split(/\s+/);
      el.innerHTML = "";

      words.forEach(function (word, i) {
        var span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        span.style.transitionDelay = (i * 0.05) + "s";
        el.appendChild(span);

        if (i < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });
    });
  }

  // ============================================
  // Text Reveal: Letters
  // ============================================
  function initTextRevealLetters() {
    // Skip on mobile or low-end devices
    if (isTouch || isLowEnd) return;

    var elements = document.querySelectorAll(".text-reveal-letters");
    if (!elements.length) return;

    elements.forEach(function (el) {
      // Skip if already processed
      if (el.dataset.textRevealProcessed) return;
      el.dataset.textRevealProcessed = "true";

      var text = el.textContent;
      el.innerHTML = "";

      text.split("").forEach(function (char, i) {
        var span = document.createElement("span");
        span.className = "letter";
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.transitionDelay = (i * 0.02) + "s";
        el.appendChild(span);
      });
    });
  }

  // ============================================
  // Text Reveal: Lines
  // ============================================
  function initTextRevealLines() {
    var elements = document.querySelectorAll(".text-reveal-lines");
    if (!elements.length) return;

    elements.forEach(function (el) {
      // Skip if already processed
      if (el.dataset.textRevealProcessed) return;
      el.dataset.textRevealProcessed = "true";

      var lines = el.textContent.split(/\n/);
      el.innerHTML = "";

      lines.forEach(function (line, i) {
        var span = document.createElement("span");
        span.className = "line";
        span.textContent = line.trim();
        span.style.transitionDelay = (i * 0.15) + "s";
        el.appendChild(span);
      });
    });
  }

  // ============================================
  // GSAP-powered text reveals
  // ============================================
  function initGSAPTextReveals() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var scrollTriggers = [];

    // Words reveal with GSAP
    gsap.set(".text-reveal-words .word", { opacity: 0, y: 30 });
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: ".text-reveal-words",
        start: "top 80%",
        onEnter: function () {
          gsap.to(".text-reveal-words .word", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05
          });
        },
        once: true
      })
    );

    // Lines reveal with GSAP
    gsap.set(".text-reveal-lines .line", { clipPath: "inset(0 100% 0 0)" });
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: ".text-reveal-lines",
        start: "top 80%",
        onEnter: function () {
          gsap.to(".text-reveal-lines .line", {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15
          });
        },
        once: true
      })
    );

    // Cleanup
    window.addEventListener("beforeunload", function () {
      scrollTriggers.forEach(function (st) { st.kill(); });
      ScrollTrigger.refresh();
    });
  }

  // Initialize GSAP reveals if available
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    initGSAPTextReveals();
  } else if (typeof GSAPLoader !== "undefined" && GSAPLoader.ready) {
    GSAPLoader.ready().then(function () {
      initGSAPTextReveals();
    });
  }

  // ============================================
  // Public API
  // ============================================
  window.TextReveal = {
    init: function () {
      initTextRevealWords();
      initTextRevealLetters();
      initTextRevealLines();
    }
  };

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.TextReveal.init();
    });
  } else {
    window.TextReveal.init();
  }
})();
