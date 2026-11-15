/**
 * Scroll Animations Module
 * Добавляет анимации при скролле: fade-in, slide-in, stagger эффекты
 */

(function () {
  "use strict";

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Device capability detection
  const isTouch = "ontouchstart" in window;
  const isLowEnd = (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
                   (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

  if (prefersReducedMotion) {
    // If user prefers reduced motion, just show all elements immediately
    const allRevealSelectors = [
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .stagger-item",
      ".reveal-scale, .reveal-clip-horizontal, .reveal-split, .reveal-stack"
    ].join(",");

    document.querySelectorAll(allRevealSelectors).forEach(function (el) {
      el.classList.add("revealed");
      el.style.opacity = "1";
    });
    return;
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        // Add stagger delay for sibling items
        if (entry.target.classList.contains("stagger-item")) {
          const siblings = Array.from(entry.target.parentElement.children).filter(function (el) {
            return el.classList.contains("stagger-item");
          });
          const index = siblings.indexOf(entry.target);
          entry.target.style.animationDelay = index * 0.15 + "s";
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-reveal elements
  document
    .querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .stagger-item")
    .forEach(function (el) {
      observer.observe(el);
    });

  // Observe new block reveal types
  document
    .querySelectorAll(".reveal-scale, .reveal-clip-horizontal, .reveal-split, .reveal-stack")
    .forEach(function (el) {
      observer.observe(el);
    });

  // Back to top button is handled by main.js (dedicated module)
  // Removed duplicate creation to prevent double buttons

  // Animated counters
  function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ""), 10);
    if (isNaN(target)) return;

    const duration = 2000;
    const startTime = performance.now();

    function updateCurrentTime(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = Math.floor(easedProgress * target);

      // Format number with spaces
      element.textContent = currentNumber.toLocaleString("ru-RU");

      if (progress < 1) {
        requestAnimationFrame(updateCurrentTime);
      } else {
        element.textContent = target.toLocaleString("ru-RU");
      }
    }

    requestAnimationFrame(updateCurrentTime);
  }

  // Observe stat numbers for counter animation
  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-card__number, .stat-number").forEach(function (el) {
    counterObserver.observe(el);
  });

  // Parallax effect for hero sections
  if (!prefersReducedMotion) {
    window.addEventListener(
      "scroll",
      function () {
        const heroSections = document.querySelectorAll(".hero, .service-hero");
        const scrollY = window.pageYOffset;

        heroSections.forEach(function (hero) {
          const rect = hero.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const speed = 0.3;
            const yPos = -(scrollY * speed);
            hero.style.transform = "translateY(" + yPos * 0.1 + "px)";
          }
        });
      },
      { passive: true }
    );
  }

  // GSAP-powered block reveals (enhanced animations)
  function initGSAPBlockReveals() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var scrollTriggers = [];

    // Scale reveal with GSAP
    gsap.set(".reveal-scale", { opacity: 0, scale: 0.9 });
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: ".reveal-scale",
        start: "top 80%",
        onEnter: function () {
          gsap.to(".reveal-scale", { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 });
        },
        once: true
      })
    );

    // Clip horizontal reveal with GSAP
    gsap.set(".reveal-clip-horizontal", { clipPath: "inset(0 100% 0 0)" });
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: ".reveal-clip-horizontal",
        start: "top 80%",
        onEnter: function () {
          gsap.to(".reveal-clip-horizontal", { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" });
        },
        once: true
      })
    );

    // Split reveal with GSAP
    gsap.set(".reveal-split > *", { opacity: 0 });
    gsap.set(".reveal-split > *:nth-child(odd)", { x: -40 });
    gsap.set(".reveal-split > *:nth-child(even)", { x: 40 });
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: ".reveal-split",
        start: "top 80%",
        onEnter: function () {
          gsap.to(".reveal-split > *", { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 });
        },
        once: true
      })
    );

    // Stack reveal with GSAP
    gsap.set(".reveal-stack > *", { opacity: 0, y: 30 });
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: ".reveal-stack",
        start: "top 80%",
        onEnter: function () {
          gsap.to(".reveal-stack > *", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 });
        },
        once: true
      })
    );

    // Cleanup on page unload
    window.addEventListener("beforeunload", function () {
      scrollTriggers.forEach(function (st) { st.kill(); });
      ScrollTrigger.refresh();
    });
  }

  // Initialize GSAP reveals if GSAP is available
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    initGSAPBlockReveals();
  } else if (typeof GSAPLoader !== "undefined" && GSAPLoader.ready) {
    GSAPLoader.ready().then(function () {
      initGSAPBlockReveals();
    });
  }
})();
