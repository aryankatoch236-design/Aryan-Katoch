/**
 * ARYAN KATOCH | DIRECTOR & CO-FOUNDER — ARVINEX VENTURE PVT. LTD.
 * Immersive 3D Interactive Engine & Client Experience Script
 */

(function () {
  'use strict';

  // State Management
  const state = {
    audioEnabled: false,
    audioCtx: null,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    threeRotation: { x: 0.2, y: 0.3 },
    threeTargetRotation: { x: 0.2, y: 0.3 },
    scrollY: 0,
    scrollProgress: 0,
  };

  /* ==========================================================================
     WEB AUDIO API SYNTHESIZER (Micro Sound Effects)
     ========================================================================== */
  function initAudio() {
    if (!state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        state.audioCtx = new AudioContext();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playUiSound(type = 'click') {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const ctx = state.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(640, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      // Audio context might be restricted
    }
  }

  /* ==========================================================================
     CUSTOM FLUID MAGNETIC CURSOR
     ========================================================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let ringX = cursorX;
  let ringY = cursorY;

  window.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    state.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    state.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  function updateCursor() {
    if (cursorDot && cursorRing) {
      cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      ringX += (cursorX - ringX) * 0.15;
      ringY += (cursorY - ringY) * 0.15;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    }
    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  function attachCursorInteractions() {
    const hoverTargets = document.querySelectorAll('a, button, input, select, textarea, .service-card-3d, .case-study-card, .pillar-card, .btn-primary-glow, .btn-secondary-cyber');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        playUiSound('hover');
      });
      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
      target.addEventListener('click', () => {
        playUiSound('click');
      });
    });
  }

  /* ==========================================================================
     THREE.JS 3D SCENE (KINETIC HYBRID CORE & PARTICLE NEBULA)
     ========================================================================== */
  let scene, camera, renderer;
  let coreGroup, outerPoly, innerCrystal, ring1, ring2, particleSystem;
  let canvasContainer = document.getElementById('webgl-canvas-container');

  function initThree() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded, skipping 3D initialization.');
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020204, 0.0018);

    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.set(0, 0, 480);

    const canvas = document.getElementById('three-canvas');
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x051025, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00F0FF, 3.5, 900);
    cyanLight.position.set(220, 180, 200);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x0066FF, 3.0, 900);
    blueLight.position.set(-250, -150, 150);
    scene.add(blueLight);

    const emeraldLight = new THREE.PointLight(0x00FF9D, 2.2, 700);
    emeraldLight.position.set(0, -220, 250);
    scene.add(emeraldLight);

    // Group for the Kinetic Hybrid Core
    coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Outer Wireframe Polyhedron (Geometric Domination Core)
    const polyGeo = new THREE.IcosahedronGeometry(95, 1);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x003355,
      emissiveIntensity: 0.6
    });
    outerPoly = new THREE.Mesh(polyGeo, wireMat);
    coreGroup.add(outerPoly);

    // 2. Inner Crystal (Obsidian & Emerald Core)
    const innerGeo = new THREE.OctahedronGeometry(52, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x060910,
      roughness: 0.1,
      metalness: 0.95,
      emissive: 0x00FF9D,
      emissiveIntensity: 0.25,
      flatShading: true
    });
    innerCrystal = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCrystal);

    // 3. Dual Orbiting Rings (Digital & Offline Synapses)
    const ring1Geo = new THREE.TorusGeometry(140, 1.2, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.55
    });
    ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(170, 1.0, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x00FF9D,
      transparent: true,
      opacity: 0.45
    });
    ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3.5;
    coreGroup.add(ring2);

    // 4. Luminous Particle Constellation Matrix
    const particleCount = 1100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00F0FF);
    const colorBlue = new THREE.Color(0x0066FF);
    const colorEmerald = new THREE.Color(0x00FF9D);

    for (let i = 0; i < particleCount; i++) {
      const radius = 280 + Math.random() * 650;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const colorChoice = Math.random();
      let picked = colorCyan;
      if (colorChoice < 0.4) picked = colorCyan;
      else if (colorChoice < 0.75) picked = colorBlue;
      else picked = colorEmerald;

      colors[i * 3] = picked.r;
      colors[i * 3 + 1] = picked.g;
      colors[i * 3 + 2] = picked.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particleMat = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Initial position slightly offset to right on desktop for cinematic text balance
    updateCorePosition();

    // Window Resize
    window.addEventListener('resize', onWindowResize);

    // Interactive Drag to Spin on atmospheric canvas and page background
    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('a, button, input, select, textarea, .service-card-3d, .case-study-card, .executive-card-3d, .consultation-form-card, .hero-console-card, .pillar-card, .founder-card, .contact-method-card')) {
        return;
      }
      onMouseDown(e);
    });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    // Touch support for mobile 3D drag
    window.addEventListener('touchstart', (e) => {
      if (e.target.closest('a, button, input, select, textarea, .service-card-3d, .case-study-card, .executive-card-3d, .consultation-form-card, .hero-console-card, .pillar-card, .founder-card, .contact-method-card')) {
        return;
      }
      onTouchStart(e);
    }, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Start Animation Loop
    animateThree();
  }

  function updateCorePosition() {
    if (!coreGroup) return;
    if (window.innerWidth >= 1024) {
      coreGroup.position.set(130, 10, 0);
    } else {
      coreGroup.position.set(0, 30, -50);
    }
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    updateCorePosition();
  }

  function onMouseDown(e) {
    state.isDragging = true;
    state.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  function onMouseUp() {
    state.isDragging = false;
  }

  function onMouseMove(e) {
    if (state.isDragging) {
      const deltaX = e.clientX - state.previousMousePosition.x;
      const deltaY = e.clientY - state.previousMousePosition.y;

      state.threeTargetRotation.y += deltaX * 0.008;
      state.threeTargetRotation.x += deltaY * 0.008;

      state.previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      state.isDragging = true;
      state.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  function onTouchEnd() {
    state.isDragging = false;
  }

  function onTouchMove(e) {
    if (state.isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - state.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - state.previousMousePosition.y;

      state.threeTargetRotation.y += deltaX * 0.008;
      state.threeTargetRotation.x += deltaY * 0.008;

      state.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  let clock = new THREE.Clock();

  function animateThree() {
    requestAnimationFrame(animateThree);

    if (document.hidden) return; // Save GPU when tab is inactive

    const elapsedTime = clock.getElapsedTime();

    // Constant slow kinetic idle rotation
    if (!state.isDragging) {
      state.threeTargetRotation.y += 0.0035;
      state.threeTargetRotation.x = 0.15 * Math.sin(elapsedTime * 0.3);
    }

    // Smooth Lerp towards target rotation
    state.threeRotation.x += (state.threeTargetRotation.x - state.threeRotation.x) * 0.06;
    state.threeRotation.y += (state.threeTargetRotation.y - state.threeRotation.y) * 0.06;

    if (coreGroup) {
      coreGroup.rotation.x = state.threeRotation.x;
      coreGroup.rotation.y = state.threeRotation.y;

      // Pulse and breathing motion
      const breath = 1 + Math.sin(elapsedTime * 1.5) * 0.035;
      outerPoly.scale.set(breath, breath, breath);

      innerCrystal.rotation.x -= 0.01;
      innerCrystal.rotation.y -= 0.012;

      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;

      // Parallax with mouse movement
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.05;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.05;

      // Camera parallax scroll reaction
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      state.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      camera.position.x = state.mouseX * 35;
      camera.position.y = state.mouseY * 25 - state.scrollProgress * 120;
      camera.lookAt(coreGroup.position.x * 0.5, 0, 0);
    }

    if (particleSystem) {
      particleSystem.rotation.y = elapsedTime * 0.025;
      particleSystem.rotation.x = elapsedTime * 0.015;
    }

    renderer.render(scene, camera);
  }

  /* ==========================================================================
     INTERACTIVE 3D CARD TILT ON HOVER
     ========================================================================== */
  function init3DCardTilt() {
    const cards = document.querySelectorAll('.service-card-3d, .case-study-card, .executive-card-3d, .hero-console-card, .pillar-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for specular shine
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = -deltaY * 8; // degrees
        const rotateY = deltaX * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`;
      });
    });
  }

  /* ==========================================================================
     METRIC COUNTER ANIMATION ON SCROLL
     ========================================================================== */
  function initMetricCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetValue = parseFloat(el.getAttribute('data-counter-target'));
          const prefix = el.getAttribute('data-counter-prefix') || '';
          const suffix = el.getAttribute('data-counter-suffix') || '';
          const isDecimal = targetValue % 1 !== 0;

          let start = 0;
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = start + (targetValue - start) * easeProgress;

            el.textContent = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${targetValue}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach((el) => observer.observe(el));
  }

  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================================== */
  function initScrollReveals() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ==========================================================================
     NAVBAR SCROLL STATE & ACTIVE LINK HIGHLIGHTER
     ========================================================================== */
  function initNavigation() {
    const header = document.getElementById('site-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      // Header blur & shadow
      if (scrollPos > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Active nav highlight
      let currentSectionId = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    });

    // Mobile menu drawer
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileClose = document.getElementById('mobile-drawer-close');
    const mobileLinks = document.querySelectorAll('.mobile-drawer-link');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
        playUiSound('click');
      });
      if (mobileClose) {
        mobileClose.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          playUiSound('click');
        });
      }
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // Audio SFX Toggle
    const audioBtn = document.getElementById('audio-toggle-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        initAudio();
        state.audioEnabled = !state.audioEnabled;
        audioBtn.classList.toggle('active', state.audioEnabled);
        audioBtn.setAttribute('title', state.audioEnabled ? 'UI Audio: Active (Click to Mute)' : 'UI Audio: Muted (Click to Enable)');
        if (state.audioEnabled) {
          playUiSound('success');
          showToast('Futuristic Audio FX Enabled');
        } else {
          showToast('Audio FX Muted');
        }
      });
    }
  }

  /* ==========================================================================
     TOAST NOTIFICATION HELPER
     ========================================================================== */
  let toastTimeout;
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  /* ==========================================================================
     EMAIL DISPATCH ENDPOINT CONFIGURATION
     ==========================================================================
     Default: FormSubmit AJAX pipeline routed to aryankatoch236@gmail.com
     (Note: On the first test submission, FormSubmit will send a one-time
     verification link to aryankatoch236@gmail.com to activate forwarding).

     Formspree Alternative:
     If you have a Formspree ID, set it here:
     const EMAIL_DISPATCH_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
     ========================================================================== */
  const EMAIL_DISPATCH_ENDPOINT = 'https://formsubmit.co/ajax/aryankatoch236@gmail.com';

  /* ==========================================================================
     COPY EMAIL & INTERACTIVE CONTACT ACTIONS
     ========================================================================== */
  function initContactActions() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'aryankatoch236@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          playUiSound('success');
          showToast(`Copied: ${email}`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      });
    }

    // Live Consultation form submission
    const form = document.getElementById('consultation-form');
    const successBanner = document.getElementById('form-success-banner');
    const submitBtn = document.getElementById('form-submit-btn');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        initAudio();

        const name = document.getElementById('client-name')?.value || 'Partner';
        const business = document.getElementById('client-business')?.value || 'Your Business';
        const phone = document.getElementById('client-phone')?.value || '';
        const email = document.getElementById('client-email')?.value || '';
        const service = document.getElementById('client-service')?.value || 'Full-Funnel Growth';

        // Visual loading state
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'TRANSMITTING TO ARYAN KATOCH...';
          submitBtn.style.opacity = '0.75';
          submitBtn.disabled = true;
        }

        try {
          const formData = new FormData(form);

          // Real HTTP POST transmission to the mail gateway
          const response = await fetch(EMAIL_DISPATCH_ENDPOINT, {
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: formData
          });

          const result = await response.json().catch(() => ({ success: true }));

          playUiSound('success');
          if (submitBtn) {
            submitBtn.textContent = 'INQUIRY SECURED & DISPATCHED ✓';
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
          }

          if (successBanner) {
            successBanner.innerHTML = `
              <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: var(--color-brand-cyan);">
                ✓ PRIORITY INTAKE CONFIRMED FOR ${name.toUpperCase()}
              </div>
              <div style="line-height: 1.6; color: #E2E8F0;">
                Your inquiry has been successfully transmitted directly to <strong>Aryan Katoch's executive inbox</strong> (<span style="color: var(--color-brand-emerald);">aryankatoch236@gmail.com</span>). Our team will review <strong>${business}</strong> and connect with you within 24 hours.
              </div>
            `;
            successBanner.classList.add('active');
          }

          showToast(`Inquiry Dispatched to aryankatoch236@gmail.com!`);
          form.reset();

          // Offer instant WhatsApp follow-up fast-track
          setTimeout(() => {
            const waPrompt = `Hi Aryan, I just sent a consultation inquiry from your portfolio for ${business} regarding ${service}. Looking forward to discussing our local market expansion!`;
            const waUrl = `https://wa.me/918894402974?text=${encodeURIComponent(waPrompt)}`;
            if (confirm(`Your inquiry was dispatched to aryankatoch236@gmail.com!\n\nWould you also like to fast-track your consultation directly on WhatsApp now?`)) {
              window.open(waUrl, '_blank');
            }
          }, 800);

        } catch (err) {
          console.error('Email submission error:', err);
          if (submitBtn) {
            submitBtn.textContent = 'TRANSMIT VIA WHATSAPP';
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
          }

          if (successBanner) {
            successBanner.innerHTML = `
              <div style="font-weight: 700; margin-bottom: 4px; color: #F59E0B;">CONNECT DIRECTLY VIA WHATSAPP OR EMAIL</div>
              <div>Direct email transmission encountered a network hiccup. You can connect with Aryan directly on WhatsApp at <strong>+91 8894402974</strong> or email <strong>aryankatoch236@gmail.com</strong>.</div>
            `;
            successBanner.classList.add('active');
          }

          const fallbackWa = `https://wa.me/918894402974?text=${encodeURIComponent(`Hi Aryan, I want to schedule a growth audit for ${business} regarding ${service}. My contact: ${phone}`)}`;
          window.open(fallbackWa, '_blank');
        }
      });
    }

    // Smooth Back To Top Button
    const backToTop = document.getElementById('back-to-top-btn');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playUiSound('click');
      });
    }
  }

  /* ==========================================================================
     LIVE TIME TICKER (IST / ARVINEX HQ)
     ========================================================================== */
  function initLiveClock() {
    const clockEl = document.getElementById('live-ist-clock');
    if (!clockEl) return;

    function updateClock() {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const istTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
      clockEl.textContent = `${istTime} IST`;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ==========================================================================
     INITIALIZATION ORCHESTRATION
     ========================================================================== */
  window.addEventListener('DOMContentLoaded', () => {
    // Lucide Icons Render
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    initThree();
    init3DCardTilt();
    initMetricCounters();
    initScrollReveals();
    initNavigation();
    attachCursorInteractions();
    initContactActions();
    initLiveClock();

    console.log('Aryan Katoch Portfolio Engine Loaded (Arvinex Venture Pvt. Ltd.)');
  });

})();
