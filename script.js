/* ===== KWIBUKA WEBSITE — INTERACTIVE SCRIPTS ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close mobile menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el, index) => {
      el.style.transitionDelay = `${index % 3 * 0.1}s`;
      observer.observe(el);
    });
  } else {
    // Fallback: make everything visible
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // ===== COUNTDOWN TIMER =====
  const eventDate = new Date('2026-04-07T17:00:00-04:00'); // April 7, 2026 5:00 PM ET

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  const updateCountdown = () => {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minutesEl.textContent = '0';
      secondsEl.textContent = '0';

      // Change the countdown section to show it's happening
      const countdownContainer = document.getElementById('countdown');
      if (countdownContainer && !countdownContainer.dataset.updated) {
        countdownContainer.dataset.updated = 'true';
        countdownContainer.innerHTML = '<p style="color: var(--accent-gold); font-family: var(--font-heading); font-size: 1.3rem; letter-spacing: 2px;">The Commemoration Has Begun 🕯️</p>';
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== HIDE SCROLL INDICATOR ON SCROLL =====
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }, { passive: true });
  }

});
