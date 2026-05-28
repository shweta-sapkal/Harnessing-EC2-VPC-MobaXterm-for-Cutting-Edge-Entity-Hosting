/* ============================================================
   NEWEL CONSTRUCTION — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────
     1. NAVBAR — scroll state + active link
  ────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    // Scroll state
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === #${current});
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ──────────────────────────────────────────────
     2. MOBILE MENU
  ────────────────────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobLinks    = document.querySelectorAll('.mob-link');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ──────────────────────────────────────────────
     3. HERO REVEAL
  ────────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  // Trigger immediately with staggered delay
  reveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 300 + i * 200);
  });

  /* ──────────────────────────────────────────────
     4. SCROLL-TRIGGERED ANIMATIONS
  ────────────────────────────────────────────── */
  // Add data-scroll to key sections on load
  const scrollTargets = [
    '.about-grid',
    '.benefits-grid',
    '.services-layout',
    '.projects-slider-wrap',
    '.stats-grid',
    '.testimonials-slider',
    '.contact-grid',
    '.footer-grid'
  ];

  scrollTargets.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute('data-scroll', '');
  });

  // Also tag individual benefit cards with delay
  document.querySelectorAll('.benefit-card').forEach((card, i) => {
    card.setAttribute('data-scroll', '');
    card.setAttribute('data-scroll-delay', i + 1);
  });

  document.querySelectorAll('.stat-item').forEach((item, i) => {
    item.setAttribute('data-scroll', '');
    item.setAttribute('data-scroll-delay', i + 1);
  });

  const scrollEls = document.querySelectorAll('[data-scroll]');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-scroll-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 80);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  scrollEls.forEach(el => scrollObserver.observe(el));

  /* ──────────────────────────────────────────────
     5. PROJECTS SLIDER
  ────────────────────────────────────────────── */
  const track       = document.getElementById('projectsTrack');
  const prevBtn     = document.getElementById('prevBtn');
  const nextBtn     = document.getElementById('nextBtn');
  const dotsWrap    = document.getElementById('sliderDots');
  const cards       = document.querySelectorAll('.project-card');

  let currentIndex  = 0;
  let cardsVisible  = getCardsVisible();
  const totalSlides = Math.ceil(cards.length - cardsVisible + 1);

  function getCardsVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 's-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goToSlide(index) {
    cardsVisible = getCardsVisible();
    const maxIndex = Math.max(0, cards.length - cardsVisible);
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const cardW = cards[0].offsetWidth + 24; // 24 = gap
    track.style.transform = translateX(-${currentIndex * cardW}px);

    document.querySelectorAll('.s-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });

  // Touch/swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToSlide(currentIndex + (diff > 0 ? 1 : -1));
  }, { passive: true });

  buildDots();

  window.addEventListener('resize', () => {
    cardsVisible = getCardsVisible();
    goToSlide(currentIndex);
  });

  /* ──────────────────────────────────────────────
     6. SERVICES — interactive list
  ────────────────────────────────────────────── */
  const serviceItems  = document.querySelectorAll('.service-item');
  const serviceImages = [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80'
  ];
  const servicesCover = document.getElementById('servicesCover');

  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      serviceItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const idx = parseInt(item.getAttribute('data-index'));
      if (servicesCover && serviceImages[idx]) {
        servicesCover.style.opacity = '0';
        setTimeout(() => {
          servicesCover.src = serviceImages[idx];
          servicesCover.style.opacity = '1';
        }, 250);
        servicesCover.style.transition = 'opacity .25s';
      }
    });
  });

  // Play button (open lightbox or play video)
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      // Create a modal with embed video
      openVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });
  }

  /* ──────────────────────────────────────────────
     7. VIDEO MODAL
  ────────────────────────────────────────────── */
  function openVideoModal(src) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="vm-overlay"></div>
      <div class="vm-inner">
        <button class="vm-close"><i class="fa fa-times"></i></button>
        <iframe src="${src}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Inject styles
    if (!document.getElementById('vm-style')) {
      const style = document.createElement('style');
      style.id = 'vm-style';
      style.textContent = `
        .video-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;animation:vmIn .3s ease both}
        @keyframes vmIn{from{opacity:0}to{opacity:1}}
        .vm-overlay{position:absolute;inset:0;background:rgba(0,0,0,.85);cursor:pointer}
        .vm-inner{position:relative;width:min(900px,92vw);aspect-ratio:16/9;z-index:1}
        .vm-inner iframe{width:100%;height:100%}
        .vm-close{position:absolute;top:-44px;right:0;background:none;border:none;color:#fff;font-size:22px;cursor:pointer;opacity:.7;transition:opacity .2s}
        .vm-close:hover{opacity:1}
      `;
      document.head.appendChild(style);
    }

    function closeModal() {
      modal.style.animation = 'vmIn .2s ease reverse both';
      setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 200);
    }

    modal.querySelector('.vm-overlay').addEventListener('click', closeModal);
    modal.querySelector('.vm-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', esc); }
    });
  }

  /* ──────────────────────────────────────────────
     8. TESTIMONIALS SLIDER
  ────────────────────────────────────────────── */
  const testiCards = document.querySelectorAll('.testi-card');
  const testiDots  = document.querySelectorAll('.t-dot');
  let currentTesti = 0;
  let testiTimer;

  function showTesti(index) {
    testiCards[currentTesti].classList.remove('active');
    testiDots[currentTesti].classList.remove('active');
    currentTesti = (index + testiCards.length) % testiCards.length;
    testiCards[currentTesti].classList.add('active');
    testiDots[currentTesti].classList.add('active');
  }

  testiDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(testiTimer);
      showTesti(i);
      startTestiTimer();
    });
  });

  function startTestiTimer() {
    testiTimer = setInterval(() => showTesti(currentTesti + 1), 5000);
  }
  startTestiTimer();

  /* ──────────────────────────────────────────────
     9. STATS COUNTER
  ────────────────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(num => statsObserver.observe(num));

  /* ──────────────────────────────────────────────
     10. CONTACT FORM
  ────────────────────────────────────────────── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('.submit-btn');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate submission delay
    setTimeout(() => {
      btn.style.display = 'none';
      formSuccess.classList.add('show');

      // Reset after 5s
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Submit';
        btn.disabled = false;
        btn.style.display = 'inline-flex';
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1200);
  });

  /* ──────────────────────────────────────────────
     11. BACK TO TOP
  ────────────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ──────────────────────────────────────────────
     12. SMOOTH ANCHOR LINKS with offset
  ────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────────
     13. PROJECT IMAGE LIGHTBOX
  ────────────────────────────────────────────── */
  const projViewBtns = document.querySelectorAll('.proj-view');
  projViewBtns.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const card   = btn.closest('.project-card');
      const imgSrc = card.querySelector('img').src;
      const title  = card.querySelector('h3').textContent;
      openImageModal(imgSrc, title);
    });
  });

  function openImageModal(src, caption) {
    const modal = document.createElement('div');
    modal.className = 'img-modal';
    modal.innerHTML = `
      <div class="im-overlay"></div>
      <div class="im-inner">
        <button class="im-close"><i class="fa fa-times"></i></button>
        <img src="${src}" alt="${caption}" />
        <p class="im-caption">${caption}</p>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    if (!document.getElementById('im-style')) {
      const style = document.createElement('style');
      style.id = 'im-style';
      style.textContent = `
        .img-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;animation:vmIn .3s ease both}
        .im-overlay{position:absolute;inset:0;background:rgba(0,0,0,.9);cursor:pointer}
        .im-inner{position:relative;max-width:min(900px,92vw);z-index:1}
        .im-inner img{width:100%;max-height:80vh;object-fit:contain;display:block}
        .im-caption{text-align:center;color:rgba(255,255,255,.65);font-family:'Barlow Condensed',sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;padding:14px 0 0}
        .im-close{position:absolute;top:-44px;right:0;background:none;border:none;color:#fff;font-size:22px;cursor:pointer;opacity:.7;transition:opacity .2s}
        .im-close:hover{opacity:1}
      `;
      document.head.appendChild(style);
    }

    function closeModal() {
      modal.style.animation = 'vmIn .2s ease reverse both';
      setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 200);
    }

    modal.querySelector('.im-overlay').addEventListener('click', closeModal);
    modal.querySelector('.im-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', esc); }
    });
  }

  /* ──────────────────────────────────────────────
     14. PARALLAX on hero image (subtle)
  ────────────────────────────────────────────── */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroImg.style.transform = scale(1) translateY(${scrolled * 0.3}px);
    }, { passive: true });
  }

}); // end DOMContentLoaded
