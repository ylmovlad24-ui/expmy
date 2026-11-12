/**
 * 3D Card Transforms — Tilt эффект по курсору
 */
(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

      this.init();
    }

    init() {
      this.el.style.perspective = this.perspective + 'px';
      this.el.style.transformStyle = 'preserve-3d';

      // Add depth layers
      const icon = this.el.querySelector('.card__icon, .card__image, .service-card__icon');
      if (icon) icon.style.transform = 'translateZ(30px)';

      const title = this.el.querySelector('.card__title, .service-card__title');
      if (title) title.style.transform = 'translateZ(20px)';

      const desc = this.el.querySelector('.card__desc, .service-card__desc');
      if (desc) desc.style.transform = 'translateZ(10px)';

      // Events
      this.el.addEventListener('mouseenter', this.handleEnter.bind(this));
      this.el.addEventListener('mousemove', this.handleMove.bind(this));
      this.el.addEventListener('mouseleave', this.handleLeave.bind(this));
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

      const mouseX = e.clientX - this.bounds.left;
      const mouseY = e.clientY - this.bounds.top;
      const centerX = this.bounds.width / 2;
      const centerY = this.bounds.height / 2;

      const rotateX = ((mouseY - centerY) / centerY) * -this.maxTilt;
      const rotateY = ((mouseX - centerX) / centerX) * this.maxTilt;

      this.el.style.transform = 'scale(' + this.scale + ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    }

    handleLeave() {
      this.isHovering = false;
      this.el.style.transition = 'transform ' + this.speed + 'ms ' + this.transitionEasing;
      this.el.style.transform = 'scale(1) rotateX(0) rotateY(0)';
      this.el.style.boxShadow = '';
    }
  }

  // Initialize on all cards
  document.querySelectorAll('.service-card, .vnesud-direction, .sudeb-direction, .recz-direction, .category-card, .guarantee-card').forEach(function(card) {
    new Card3D(card);
  });

  console.log('Motion: 3D cards initialized');
})();
