/**
 * 3D Card Transforms — Tilt эффект по курсору
 * WCAG 2.3.3: Respects prefers-reduced-motion
 * FIX: Proper cleanup on page unload to prevent memory leaks
 */
(function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Only on non-touch devices
  if ('ontouchstart' in window) return;

  class Card3D {
    constructor(element, options) {
      this.el = element;
      this.maxTilt = (options && options.maxTilt) || 8;
      this.perspective = (options && options.perspective) || 1000;
      this.scale = (options && options.scale) || 1.02;
      this.speed = (options && options.speed) || 400;
      this.transitionEasing = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      this.bounds = null;
      this.isHovering = false;

      // Bind methods to prevent memory leaks
      this.handleEnter = this.handleEnter.bind(this);
      this.handleMove = this.handleMove.bind(this);
      this.handleLeave = this.handleLeave.bind(this);

      this.init();
    }

    init() {
      this.el.style.perspective = this.perspective + 'px';
      this.el.style.transformStyle = 'preserve-3d';

      // Add depth layers
      var icon = this.el.querySelector('.card__icon, .card__image, .service-card__icon');
      if (icon) icon.style.transform = 'translateZ(30px)';

      var title = this.el.querySelector('.card__title, .service-card__title');
      if (title) title.style.transform = 'translateZ(20px)';

      var desc = this.el.querySelector('.card__desc, .service-card__desc');
      if (desc) desc.style.transform = 'translateZ(10px)';

      // Events
      this.el.addEventListener('mouseenter', this.handleEnter);
      this.el.addEventListener('mousemove', this.handleMove);
      this.el.addEventListener('mouseleave', this.handleLeave);
    }

    handleEnter() {
      this.isHovering = true;
      this.bounds = this.el.getBoundingClientRect();
      this.el.style.transition = 'transform ' + this.speed + 'ms ' + this.transitionEasing;
      this.el.style.transform = 'scale(' + this.scale + ')';
      this.el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
    }

    handleMove(e) {
      if (!this.isHovering || !this.bounds) return;

      var mouseX = e.clientX - this.bounds.left;
      var mouseY = e.clientY - this.bounds.top;
      var centerX = this.bounds.width / 2;
      var centerY = this.bounds.height / 2;

      var rotateX = ((mouseY - centerY) / centerY) * -this.maxTilt;
      var rotateY = ((mouseX - centerX) / centerX) * this.maxTilt;

      this.el.style.transform = 'scale(' + this.scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    }

    handleLeave() {
      this.isHovering = false;
      this.el.style.transition = 'transform ' + this.speed + 'ms ' + this.transitionEasing;
      this.el.style.transform = 'scale(1) rotateX(0) rotateY(0)';
      this.el.style.boxShadow = '';
    }

    // FIX: Cleanup method to prevent memory leaks
    destroy() {
      this.el.removeEventListener('mouseenter', this.handleEnter);
      this.el.removeEventListener('mousemove', this.handleMove);
      this.el.removeEventListener('mouseleave', this.handleLeave);
    }
  }

  // Initialize on all cards
  var cards = document.querySelectorAll('.service-card, .vnesud-direction, .sudeb-direction, .recz-direction, .category-card, .guarantee-card');
  var cardInstances = [];

  cards.forEach(function(card) {
    cardInstances.push(new Card3D(card));
  });

  // FIX: Cleanup on page unload to prevent memory leaks
  window.addEventListener('beforeunload', function() {
    cardInstances.forEach(function(instance) {
      instance.destroy();
    });
  });

  console.log('Motion: 3D cards initialized');
})();
