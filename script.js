// ===== Matrix rain background =====
(function () {
  const canvas = document.getElementById('matrixRain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let columns, drops, colors;
  const chars = "01";
  const fontSize = 16;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
    colors = Array(columns).fill(0).map(() => (Math.random() > 0.78 ? "#ff2ea6" : "#00ff9c"));
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = "rgba(5,8,7,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = colors[i];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        colors[i] = Math.random() > 0.78 ? "#ff2ea6" : "#00ff9c";
      }
      drops[i]++;
    }
  }
  setInterval(draw, 45);
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
