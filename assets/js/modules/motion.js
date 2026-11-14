/**
 * Motion Design - Universal Premium Animations
 * GSAP + ScrollTrigger — единый для vnesudebnaya, sudebnaya, recenziya
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal, .reveal-entrance, .reveal-exit, .reveal-stagger > *").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.clipPath = "none";
    });
    return;
  }

  // Track ScrollTriggers for cleanup
  var scrollTriggers = [];

  function cleanupTriggers() {
    scrollTriggers.forEach(function (st) {
      st.kill();
    });
    scrollTriggers = [];
    ScrollTrigger.refresh();
  }
  window.addEventListener("beforeunload", cleanupTriggers);

  function init() {
    try {
      if (window.GSAPLoader && window.GSAPLoader.ready) {
        window.GSAPLoader.ready()
          .then(function () {
            if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
              console.warn("Motion: GSAP not available");
              showAllElements();
              return;
            }
            gsap.registerPlugin(ScrollTrigger);
            hideAnimatedElements();
            requestAnimationFrame(function () {
              initProgressBar();
              initHeroAnimation();
              initHeroUseCards();
              initStepsProgressLine();
              initMagneticButtons();
              initSectionReveal();
              initCardAnimations();
              initPinningSection();
              initFooterReveal();
            });
            setTimeout(function () {
              if (typeof gsap === "undefined") {
                console.warn("Motion: GSAP not loaded after 3s, showing all elements");
                showAllElements();
              }
            }, 3000);
          })
          .catch(function (err) {
            console.warn("Motion init error:", err);
            showAllElements();
          });
      } else {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          hideAnimatedElements();
          requestAnimationFrame(function () {
            initProgressBar();
            initHeroAnimation();
            initHeroUseCards();
            initStepsProgressLine();
            initMagneticButtons();
            initSectionReveal();
            initCardAnimations();
            initPinningSection();
            initFooterReveal();
          });
        } else {
          console.warn("Motion: GSAP not available, showing all elements");
          showAllElements();
        }
      }
    } catch (e) {
      console.error("Motion init error:", e.message || e);
    }
  }

  function showAllElements() {
    var all = document.querySelectorAll(
      ".vnesud-hero, .vnesud-hero__title, .vnesud-hero__actions .btn--primary, .vnesud-hero-use, " +
        ".vnesud-direction, .vnesud-case, .vnesud-step, " +
        ".sudeb-hero, .sudeb-hero__title, .sudeb-hero__actions .btn--primary, .sudeb-hero-use, " +
        ".sudeb-direction, .sudeb-case, .sudeb-animate-hidden, " +
        ".recz-hero, .recz-hero__title, .recz-hero-use, " +
        ".recz-direction, .recz-case, .recz-animate-hidden, " +
        ".category-hero, .category-hero__title, " +
        "section.reveal, .footer"
    );
    all.forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }

  function hideAnimatedElements() {
    var hero = document.querySelector(".vnesud-hero, .sudeb-hero, .recz-hero, .category-hero");
    if (hero) hero.style.opacity = "0";
    var btn = document.querySelector(".vnesud-hero__actions .btn--primary, .sudeb-hero__actions .btn--primary");
    if (btn) btn.style.opacity = "0";
    var useCards = document.querySelectorAll(".vnesud-hero-use, .sudeb-hero-use, .recz-hero-use");
    useCards.forEach(function (c) {
      c.style.opacity = "0";
    });
    var dirs = document.querySelectorAll(".vnesud-direction, .sudeb-direction, .recz-direction");
    dirs.forEach(function (c) {
      c.style.opacity = "0";
    });
    var guar = document.querySelectorAll(".guarantee-card");
    guar.forEach(function (c) {
      c.style.opacity = "0";
    });
    var cases = document.querySelectorAll(".vnesud-case, .sudeb-case, .recz-case");
    cases.forEach(function (c) {
      c.style.opacity = "0";
    });
    var steps = document.querySelectorAll(".vnesud-step");
    steps.forEach(function (c) {
      c.style.opacity = "0";
    });
    var footer = document.querySelector(".footer");
    if (footer) footer.style.opacity = "0";

    setTimeout(function () {
      var hidden = 0;
      var all = document.querySelectorAll(
        ".vnesud-hero, .sudeb-hero, .recz-hero, .vnesud-direction, .sudeb-direction, .recz-direction, .vnesud-case, .sudeb-case, .recz-case, .vnesud-step, .guarantee-card, .footer"
      );
      all.forEach(function (el) {
        if (getComputedStyle(el).opacity === "0") {
          hidden++;
        }
      });
      if (hidden > 10 && typeof gsap === "undefined") {
        console.warn("Motion: " + hidden + " elements still hidden and GSAP not available");
        showAllElements();
      }
    }, 1000);
  }

  function initProgressBar() {
    try {
      var bar = document.querySelector(".progress-bar");
      if (!bar) return;
      if (!CSS.supports("animation-timeline", "scroll()")) {
        window.addEventListener(
          "scroll",
          function () {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            bar.style.width = (st / dh) * 100 + "%";
          },
          { passive: true }
        );
      }
    } catch (e) {
      console.error("ProgressBar error:", e.message || e);
    }
  }

  function initHeroAnimation() {
    try {
      var hero = document.querySelector(".vnesud-hero, .sudeb-hero, .recz-hero, .category-hero");
      var title = document.querySelector(
        ".vnesud-hero__title, .sudeb-hero__title, .recz-hero__title, .category-hero__title"
      );

      if (!title) return;

      if (hero) gsap.set(hero, { opacity: 1, y: 0 });

      var words = title.textContent.trim().split(/\s+/);
      if (words.length <= 1) {
        gsap.set(title, { opacity: 1, y: 0 });
        return;
      }

      var heroEl = document.querySelector(".vnesud-hero, .sudeb-hero, .recz-hero, .category-hero");
      var keyword = "";
      if (heroEl && heroEl.classList.contains("vnesud-hero")) keyword = "внесудебная";
      else if (heroEl && heroEl.classList.contains("sudeb-hero")) keyword = "судебная";
      else if (heroEl && heroEl.classList.contains("recz-hero")) keyword = "рецензия";
      else if (heroEl && heroEl.classList.contains("category-hero")) keyword = "экспертиза";

      var lowerText = title.textContent.toLowerCase();
      var keywordIndex = keyword ? lowerText.indexOf(keyword) : -1;

      var html = "";
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var lowerWord = word.toLowerCase();

        if (keyword && keywordIndex !== -1 && lowerWord === keyword) {
          html += '<span class="word keyword-wrap" style="display:inline-block;position:relative;">';
          html += word;
          html +=
            '<span class="keyword-stroke" style="position:absolute;bottom:-4px;left:0;right:0;height:8px;overflow:visible;">';
          html += '<svg viewBox="0 0 100 12" preserveAspectRatio="none" style="width:100%;height:100%;display:block;">';
          html +=
            '<path d="M 2 8 Q 25 2, 50 6 T 98 4" fill="none" stroke="#e8731a" stroke-width="2" stroke-linecap="round" class="stroke-path" style="stroke-dasharray: 120; stroke-dashoffset: 120;"/>';
          html += "</svg></span></span>";
          keywordIndex = -1;
        } else {
          html += '<span class="word" style="display:inline-block">' + word + "</span>";
        }
        if (i < words.length - 1) html += " ";
      }
      title.innerHTML = html;
      var spans = title.querySelectorAll(".word");
      gsap.set(spans, { opacity: 0, y: 60 });

      var tl = gsap.timeline({ delay: 0.3 });
      tl.to(spans, { opacity: 1, y: 0, duration: 0.7, stagger: 0.075, ease: "expo.out" });

      var strokePath = title.querySelector(".stroke-path");
      if (strokePath) {
        var totalDelay = 0.3 + words.length * 0.075 + 0.3;
        tl.to(strokePath, { strokeDashoffset: 0, duration: 1, ease: "power2.out" }, totalDelay);
      }

      var btn = document.querySelector(".vnesud-hero__actions .btn--primary, .sudeb-hero__actions .btn--primary");
      if (btn) {
        gsap.set(btn, { opacity: 0, y: 20 });
        var btnDelay = 0.3 + words.length * 0.075 + 0.3;
        tl.to(btn, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, btnDelay);
      }
    } catch (e) {
      console.error("Hero animation error:", e.message || e);
    }
  }

  function initHeroUseCards() {
    try {
      var cards = document.querySelectorAll(".vnesud-hero-use, .sudeb-hero-use, .recz-hero-use");
      if (cards.length === 0) return;
      var st = ScrollTrigger.create({
        trigger: ".vnesud-hero-uses, .sudeb-hero-uses, .recz-hero-uses",
        start: "top 80%",
        onEnter: function () {
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
        },
        once: true,
      });
      scrollTriggers.push(st);
    } catch (e) {
      console.error("Hero use cards error:", e.message || e);
    }
  }

  function initStepsProgressLine() {
    try {
      var line = document.querySelector(".steps-progress-line");
      if (!line) return;
      var section = document.querySelector("#how-we-work");
      if (!section) return;
      gsap.set(line, { height: 0 });
      var st = gsap.to(line, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.3,
        },
      });
      scrollTriggers.push(st.scrollTrigger);
    } catch (e) {
      console.error("Steps progress line error:", e.message || e);
    }
  }

  function initMagneticButtons() {
    try {
      if ("ontouchstart" in window) return;
      var buttons = document.querySelectorAll(".btn--primary");
      buttons.forEach(function (btn) {
        var radius = 70;
        var maxOffset = 10;
        var rafId = null;
        var pendingX = 0,
          pendingY = 0;

        btn.addEventListener("mousemove", function (e) {
          var rect = btn.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          var dist = Math.sqrt(x * x + y * y);
          pendingX = x;
          pendingY = y;
          if (!rafId) rafId = requestAnimationFrame(updateMagnetic);
        });

        function updateMagnetic() {
          var rect = btn.getBoundingClientRect();
          var x = pendingX;
          var y = pendingY;
          var dist = Math.sqrt(x * x + y * y);
          if (dist < radius) {
            var factor = (1 - dist / radius) * maxOffset;
            var moveX = (x / (dist || 1)) * factor;
            var moveY = (y / (dist || 1)) * factor;
            gsap.to(btn, { x: moveX, y: moveY, duration: 0.3, ease: "power2.out" });
          }
          rafId = null;
        }

        btn.addEventListener("mouseleave", function () {
          gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
        });
      });
    } catch (e) {
      console.error("Magnetic buttons error:", e.message || e);
    }
  }

  function initSectionReveal() {
    try {
      var secs = document.querySelectorAll("section.reveal");
      secs.forEach(function (sec) {
        gsap.set(sec, { opacity: 0, y: 40 });
        var st = ScrollTrigger.create({
          trigger: sec,
          start: "top 85%",
          onEnter: function () {
            gsap.to(sec, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
          },
          once: true,
        });
        scrollTriggers.push(st);
      });
    } catch (e) {
      console.error("Section reveal error:", e.message || e);
    }
  }

  // Helper: generic card group animation
  function initCardGroup(containerSelector, directionClass, caseClass, stepClass) {
    var container = document.querySelector(containerSelector);
    if (!container) return;

    var cards = container.querySelectorAll(directionClass);
    if (cards.length > 0) {
      var st = ScrollTrigger.create({
        trigger: container,
        start: "top 75%",
        onEnter: function () {
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "power2.out" });
        },
        once: true,
      });
      scrollTriggers.push(st);

      cards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
          gsap.to(cards, { opacity: 0.6, duration: 0.3, ease: "power2.out", overwrite: true });
          gsap.to(card, {
            opacity: 1,
            y: -6,
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        });
        card.addEventListener("mouseleave", function () {
          gsap.to(cards, { opacity: 1, y: 0, boxShadow: "none", duration: 0.3, ease: "power2.out", overwrite: true });
        });
      });
    }

    var caseCards = container.querySelectorAll(caseClass);
    if (caseCards.length > 0) {
      var st2 = ScrollTrigger.create({
        trigger: container,
        start: "top 75%",
        onEnter: function () {
          gsap.to(caseCards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" });
        },
        once: true,
      });
      scrollTriggers.push(st2);
    }

    if (stepClass) {
      var steps = container.querySelectorAll(stepClass);
      if (steps.length > 0) {
        var st3 = ScrollTrigger.create({
          trigger: container,
          start: "top 75%",
          onEnter: function () {
            gsap.to(steps, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
          },
          once: true,
        });
        scrollTriggers.push(st3);
      }
    }
  }

  function initCardAnimations() {
    try {
      initCardGroup(".vnesud-directions", ".vnesud-direction", ".vnesud-case");
      initCardGroup(".sudeb-directions", ".sudeb-direction", ".sudeb-case");
      initCardGroup(".recz-directions", ".recz-direction", ".recz-case");

      // guarantees
      var guar = document.querySelector(".guarantees-grid");
      if (guar) {
        var gc = guar.querySelectorAll(".guarantee-card");
        var st = ScrollTrigger.create({
          trigger: guar,
          start: "top 75%",
          onEnter: function () {
            gsap.to(gc, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" });
          },
          once: true,
        });
        scrollTriggers.push(st);
      }

      // vnesud-steps
      initCardGroup(".vnesud-steps", ".vnesud-step", null, ".vnesud-step");
    } catch (e) {
      console.error("Card animations error:", e.message || e);
    }
  }

  function initPinningSection() {
    try {
      var ps = document.querySelector("#guarantees");
      if (!ps) return;
      var cards = ps.querySelectorAll(".guarantee-card");
      if (cards.length === 0) return;
      var st = ScrollTrigger.create({
        trigger: ps,
        start: "top 75%",
        onEnter: function () {
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" });
        },
        once: true,
      });
      scrollTriggers.push(st);
    } catch (e) {
      console.error("Pinning section error:", e.message || e);
    }
  }

  function initFooterReveal() {
    try {
      var footer = document.querySelector(".footer");
      if (!footer) return;
      var st = ScrollTrigger.create({
        trigger: "main",
        start: "bottom 80%",
        onEnter: function () {
          gsap.to(footer, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
        },
        once: true,
      });
      scrollTriggers.push(st);
    } catch (e) {
      console.error("Footer reveal error:", e.message || e);
    }
  }

  var motionInitialized = false;

  function safeInit() {
    if (motionInitialized) return;
    motionInitialized = true;
    init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", safeInit);
  } else {
    safeInit();
  }
})();
