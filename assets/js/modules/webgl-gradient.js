/**
 * WebGL Liquid Gradient — Hero Background
 * ТЗ: моушн-дизайн v1.0, п.3.1
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Check WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  // Check device capability
  const deviceMemory = navigator.deviceMemory || 4;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  if (deviceMemory < 2 && hardwareConcurrency < 4) return;

  const isMobile = window.innerWidth < 768;

  const heroSection = document.querySelector('.vnesud-hero');
  if (!heroSection) return;

  // Create WebGL container
  const webglContainer = document.createElement('div');
  webglContainer.className = 'webgl-gradient';
  webglContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
  `;
  
  const canvasEl = document.createElement('canvas');
  canvasEl.style.cssText = `
    width: 100%;
    height: 100%;
    display: block;
  `;
  webglContainer.appendChild(canvasEl);

  // Noise overlay
  const noiseOverlay = document.createElement('div');
  noiseOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
  `;
  webglContainer.appendChild(noiseOverlay);

  heroSection.style.position = 'relative';
  heroSection.insertBefore(webglContainer, heroSection.firstChild);

  // Set canvas size
  function resizeCanvas() {
    const rect = heroSection.getBoundingClientRect();
    const scale = isMobile ? 0.5 : 1.0;
    canvasEl.width = rect.width * scale;
    canvasEl.height = rect.height * scale;
  }
  resizeCanvas();

  // WebGL Shaders
  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    // Simplex 2D noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      float aspect = u_resolution.x / u_resolution.y;
      vec2 uvAspect = uv;
      uvAspect.x *= aspect;
      
      // Mouse influence with lag
      vec2 mouse = u_mouse / u_resolution;
      mouse.x *= aspect;
      
      float time = u_time * 0.04;
      
      // Multiple gradient blobs
      float blob1 = snoise(vec2(uvAspect * 2.0 + time));
      float blob2 = snoise(vec2(uvAspect * 2.5 - time * 0.7 + 10.0));
      float blob3 = snoise(vec2(uvAspect * 1.8 + time * 0.5 + 20.0));
      
      // Mouse attraction
      float mouseDist = length(uvAspect - mouse);
      float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;
      
      // Colors: brand dark blue base + orange accent + warm sand
      vec3 colorBase = vec3(0.16, 0.23, 0.40);  // Dark blue #2A5B9A base
      vec3 color1 = vec3(0.91, 0.45, 0.10);     // Orange #e8731a
      vec3 color2 = vec3(0.96, 0.82, 0.56);     // Warm sand
      
      // Blend blobs
      float t1 = smoothstep(-0.3, 0.5, blob1) + mouseInfluence;
      float t2 = smoothstep(-0.3, 0.5, blob2);
      float t3 = smoothstep(-0.3, 0.5, blob3);
      
      vec3 gradient = mix(colorBase, color1, t1 * 0.15);
      gradient = mix(gradient, color2, t2 * 0.08);
      gradient = mix(gradient, colorBase, t3 * 0.1);
      
      // Vignette
      float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5));
      gradient *= mix(0.85, 1.0, vignette);
      
      gl_FragColor = vec4(gradient, 1.0);
    }
  `;

  // Compile shaders
  function compileShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('WebGL shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('WebGL program link error');
    return;
  }

  gl.useProgram(program);

  // Buffer setup
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Uniforms
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

  // State
  let mouseX = canvasEl.width / 2;
  let mouseY = canvasEl.height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;
  let isVisible = true;
  let animationId = null;
  let startTime = performance.now();

  // Mouse tracking
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    targetMouseX = (e.clientX - rect.left) * (isMobile ? 0.5 : 1.0);
    targetMouseY = canvasEl.height - (e.clientY - rect.top) * (isMobile ? 0.5 : 1.0);
  });

  // Visibility check
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationId) {
        animate();
      } else if (!isVisible && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  }, { threshold: 0 });

  visibilityObserver.observe(heroSection);

  // Resize observer
  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
    gl.viewport(0, 0, canvasEl.width, canvasEl.height);
  });
  resizeObserver.observe(heroSection);

  // Render loop
  function animate() {
    if (!isVisible) return;

    const time = (performance.now() - startTime) * 0.001;

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    gl.uniform1f(timeLocation, time);
    gl.uniform2f(resolutionLocation, canvasEl.width, canvasEl.height);
    gl.uniform2f(mouseLocation, mouseX, mouseY);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationId = requestAnimationFrame(animate);
  }

  // Start if visible
  if (isVisible) {
    animate();
  }
})();
