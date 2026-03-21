/* ============================================================
   EleMeSolutions — main.js
   Handles: navbar scroll, scroll animations, mobile menu,
            hero canvas, smooth scroll, contact form
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   1. NAVBAR — transparent → solid on scroll
   ---------------------------------------------------------- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const hero = document.getElementById('hero');

  const observer = new IntersectionObserver(
    function(entries) {
      const heroVisible = entries[0].isIntersecting;
      navbar.classList.toggle('scrolled', !heroVisible);
    },
    { threshold: 0.1, rootMargin: '-72px 0px 0px 0px' }
  );

  if (hero) {
    observer.observe(hero);
  }

  // Fallback scroll listener for older browsers
  window.addEventListener('scroll', function() {
    if (!('IntersectionObserver' in window)) {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
  }, { passive: true });
})();


/* ----------------------------------------------------------
   2. MOBILE MENU — hamburger toggle
   ---------------------------------------------------------- */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  const mobileLinks = mobileNav.querySelectorAll('a');

  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function() {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ----------------------------------------------------------
   3. SCROLL ANIMATIONS — IntersectionObserver fade-up
   ---------------------------------------------------------- */
(function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    document.querySelectorAll('.fade-up').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(function(el) {
    observer.observe(el);
  });
})();


/* ----------------------------------------------------------
   4. SMOOTH SCROLL — nav links
   ---------------------------------------------------------- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')
      ) || 72;

      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();


/* ----------------------------------------------------------
   5. HERO CANVAS — animated data grid / network
   ---------------------------------------------------------- */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  const GOLD = '#C9A84C';
  const GOLD_DIM = 'rgba(201, 168, 76, ';

  let width, height, animId;
  let nodes = [];
  let lines = [];

  const NODE_COUNT_BASE = 35;

  function resize() {
    width  = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width  = width;
    canvas.height = height;
    initNodes();
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function initNodes() {
    const count = Math.floor(NODE_COUNT_BASE * (width / 1440));
    nodes = Array.from({ length: Math.max(16, count) }, function() {
      return {
        x:  rand(0, width),
        y:  rand(0, height),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.12, 0.12),
        r:  rand(1.2, 2.5),
        opacity: rand(0.3, 0.8)
      };
    });
  }

  function updateNodes() {
    nodes.forEach(function(n) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20)     { n.x = width  + 20; }
      if (n.x > width + 20)  { n.x = -20; }
      if (n.y < -20)     { n.y = height + 20; }
      if (n.y > height + 20) { n.y = -20; }
    });
  }

  function buildLines() {
    lines = [];
    const MAX_DIST = Math.min(width * 0.18, 240);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          lines.push({ a: i, b: j, dist: dist, max: MAX_DIST });
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    buildLines();

    // Draw connections
    lines.forEach(function(l) {
      const alpha = (1 - l.dist / l.max) * 0.35;
      ctx.beginPath();
      ctx.strokeStyle = GOLD_DIM + alpha + ')';
      ctx.lineWidth = 0.6;
      ctx.moveTo(nodes[l.a].x, nodes[l.a].y);
      ctx.lineTo(nodes[l.b].x, nodes[l.b].y);
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(function(n) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = GOLD_DIM + n.opacity + ')';
      ctx.fill();
    });

    // Subtle grid overlay
    drawGrid();

    updateNodes();
    animId = requestAnimationFrame(draw);
  }

  function drawGrid() {
    const spacing = 80;
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.03)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // Initialize
  resize();
  draw();

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      cancelAnimationFrame(animId);
      resize();
      draw();
    }, 200);
  }, { passive: true });

  // Pause when tab not visible
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      draw();
    }
  });
})();


/* ----------------------------------------------------------
   6. CONTACT FORM — mailto fallback
   ---------------------------------------------------------- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = form.querySelector('#form-name')?.value.trim()    || '';
    const email   = form.querySelector('#form-email')?.value.trim()   || '';
    const message = form.querySelector('#form-message')?.value.trim() || '';

    if (!name || !email || !message) {
      showFormMessage('Por favor preencha todos os campos.', 'error');
      return;
    }

    const subject = encodeURIComponent('Pedido de contacto — ' + name);
    const body    = encodeURIComponent(
      'Nome: '    + name    + '\n' +
      'Email: '   + email   + '\n\n' +
      'Mensagem:\n' + message
    );

    window.location.href =
      'mailto:lucasgomes@elemesolutions.pt?subject=' + subject + '&body=' + body;

    showFormMessage('A abrir o seu cliente de email...', 'success');
  });

  function showFormMessage(text, type) {
    let msg = form.querySelector('.form-message');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'form-message';
      form.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.cssText =
      'margin-top: 1rem; font-size: 0.875rem; padding: 0.75rem 1rem; border-radius: 4px; ' +
      (type === 'success'
        ? 'color: #C9A84C; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3);'
        : 'color: #e05555; background: rgba(224,85,85,0.1); border: 1px solid rgba(224,85,85,0.3);');
  }
})();


/* ----------------------------------------------------------
   7. ACTIVE NAV LINK — highlight based on scroll position
   ---------------------------------------------------------- */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navAnchors.length) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(function(a) {
            a.style.color = a.getAttribute('href') === '#' + id
              ? 'var(--gold)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(function(s) { observer.observe(s); });
})();
