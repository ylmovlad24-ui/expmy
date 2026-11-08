/**
 * Scroll Animations Module
 * Добавляет анимации при скролле: fade-in, slide-in, stagger эффекты
 */

(function() {
  'use strict';

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // If user prefers reduced motion, just show all elements immediately
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .stagger-item').forEach(function(el) {
      el.classList.add('revealed');
      el.style.opacity = '1';
    });
    return;
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Add stagger delay for sibling items
        if (entry.target.classList.contains('stagger-item')) {
          const siblings = Array.from(entry.target.parentElement.children)
            .filter(function(el) { return el.classList.contains('stagger-item'); });
          const index = siblings.indexOf(entry.target);
          entry.target.style.animationDelay = (index * 0.15) + 's';
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-reveal elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .stagger-item').forEach(function(el) {
    observer.observe(el);
  });

  // Scroll progress bar
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(scrollProgress);

  let ticking = false;
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.setProperty('--scroll-width', scrollPercent + '%');
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Back to top button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Наверх');
  backToTop.setAttribute('title', 'Наверх');
  document.body.appendChild(backToTop);

  let backToTopVisible = false;
  
  window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 500 && !backToTopVisible) {
      backToTop.classList.add('visible');
      backToTopVisible = true;
    } else if (scrollY <= 500 && backToTopVisible) {
      backToTop.classList.remove('visible');
      backToTopVisible = false;
    }
  }, { passive: true });

  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animated counters
  function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''), 10);
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
      element.textContent = currentNumber.toLocaleString('ru-RU');
      
      if (progress < 1) {
        requestAnimationFrame(updateCurrentTime);
      } else {
        element.textContent = target.toLocaleString('ru-RU');
      }
    }
    
    requestAnimationFrame(updateCurrentTime);
  }

  // Observe stat numbers for counter animation
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-card__number, .stat-number').forEach(function(el) {
    counterObserver.observe(el);
  });

  // Parallax effect for hero sections
  if (!prefersReducedMotion) {
    window.addEventListener('scroll', function() {
      const heroSections = document.querySelectorAll('.hero, .service-hero');
      const scrollY = window.pageYOffset;
      
      heroSections.forEach(function(hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const speed = 0.3;
          const yPos = -(scrollY * speed);
          hero.style.transform = 'translateY(' + (yPos * 0.1) + 'px)';
        }
      });
    }, { passive: true });
  }

})();
