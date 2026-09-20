// ===== Background canvas: matrix rain (dark) / dot network (light) =====
(function () {
  const canvas = document.getElementById('matrixRain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const fontSize = 16;

  // Dark-mode matrix rain state
  let columns, drops, dropColors;
  const chars = "01";

  // Light-mode dot network state
  let particles = [];
  const maxLinkDist = 130;

  function isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
    dropColors = Array(columns).fill(0).map(() => (Math.random() > 0.78 ? "#ff2ea6" : "#00ff9c"));

    const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
    // Match the matrix rain's per-tick pace: rain drops advance one
    // fontSize (16px) each draw call, so give dots the same order of speed.
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * fontSize * 0.3,
      vy: -(fontSize * (0.15 + Math.random() * 0.15))
    }));
  }
  resize();
  window.addEventListener('resize', resize);

  function drawMatrixRain() {
    ctx.fillStyle = "rgba(5,8,7,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = dropColors[i];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        dropColors[i] = Math.random() > 0.78 ? "#ff2ea6" : "#00ff9c";
      }
      drops[i]++;
    }
  }

  function drawDotNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxLinkDist) {
          ctx.strokeStyle = `rgba(4,120,87,${0.14 * (1 - dist / maxLinkDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = "rgba(4,120,87,0.45)";
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function draw() {
    if (isLight()) drawDotNetwork();
    else drawMatrixRain();
  }
  setInterval(draw, 45);
})();

// ===== Light / dark theme toggle =====
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    toggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  // Sync button state with whatever the inline head script already set
  applyTheme(currentTheme());

  toggle.addEventListener('click', () => {
    applyTheme(currentTheme() === 'light' ? 'dark' : 'light');
  });
})();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== Role cycling text in hero =====
const roles = [
  'Software Developer',
  'Web Developer',
  'Problem Solver',
  'Lifelong Learner'
];
let roleIndex = 0;
const roleEl = document.getElementById('roleCycle');

setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleEl.style.opacity = 0;
  setTimeout(() => {
    roleEl.textContent = roles[roleIndex];
    roleEl.style.opacity = 1;
  }, 300);
}, 2600);
roleEl.style.transition = 'opacity 0.3s ease';

// ===== Scroll reveal animation =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Animated stat counters =====
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

// ===== Back to top button =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});

// ===== Active nav link highlight on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
  });
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
