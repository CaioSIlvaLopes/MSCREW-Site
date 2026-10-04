/**
 * main.js — Lógica principal compartilhada por todas as páginas.
 *
 * Responsabilidades:
 *  1. Scroll Reveal (IntersectionObserver)
 *  2. Scroll suave em âncoras internas
 *  3. Carrossel de Serviços (apenas na index.html)
 */

'use strict';

// ── 1. SCROLL REVEAL ─────────────────────────────────────────────────────────
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.02, rootMargin: '0px 0px 0px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}());


// ── 2. SCROLL SUAVE EM ÂNCORAS ───────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function handleAnchorClick(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const header = document.getElementById('cabecalho-principal');
    const headerHeight = header ? header.offsetHeight : 0;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 8,
      behavior: 'smooth',
    });
  });
});


// ── 3. CARROSSEL DE SERVIÇOS (index.html) ────────────────────────────────────
(function initCarrosselServicos() {
  const track = document.getElementById('servicos-track');
  const btnPrev = document.getElementById('servicos-prev');
  const btnNext = document.getElementById('servicos-next');
  const dotsContainer = document.getElementById('servicos-dots');

  if (!track || !btnPrev || !btnNext || !dotsContainer) return;

  const cards = Array.from(track.querySelectorAll('.servico-card'));
  const totalCards = cards.length;
  let currentIndex = 0;
  let visibleCards = 3;

  function getVisibleCards() {
    if (window.innerWidth < 768) return 1;   /* Mobile: 1 card */
    if (window.innerWidth < 1024) return 2;  /* Tablet: 2 cards */
    return 3;                                /* Desktop: 3 cards */
  }

  function renderDots(maxIndex) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot${i === currentIndex ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateButtonStates(maxIndex) {
    btnPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    btnPrev.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

    btnNext.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    btnNext.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';
  }

  function updateCarousel() {
    visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, totalCards - visibleCards);

    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const translatePercentage = currentIndex * (100 / visibleCards);
    track.style.transform = `translateX(-${translatePercentage}%)`;

    renderDots(maxIndex);
    updateButtonStates(maxIndex);
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  btnNext.addEventListener('click', () => {
    const maxIndex = Math.max(0, totalCards - visibleCards);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel, { passive: true });

  // Inicialização
  updateCarousel();
}());


// ── 4. CARROSSEL DA HERO (index.html) ────────────────────────────────────────
(function initHeroCarousel() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll('.hero__slide'));
  const captions = Array.from(hero.querySelectorAll('.hero__caption'));
  const dots = Array.from(hero.querySelectorAll('.hero__dot'));
  
  const btnPrev = hero.querySelector('[data-hero-prev]');
  const btnNext = hero.querySelector('[data-hero-next]');
  
  if (!slides.length) return;

  let currentIndex = 0;
  const total = slides.length;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 6000; // Troca a cada 6 segundos

  function goToSlide(index) {
    // Esconde o atual
    slides[currentIndex].classList.remove('hero__slide--active');
    slides[currentIndex].setAttribute('aria-hidden', 'true');
    
    if (captions[currentIndex]) {
      captions[currentIndex].classList.remove('hero__caption--active');
    }
    
    if (dots[currentIndex]) {
      dots[currentIndex].classList.remove('hero__dot--active');
      dots[currentIndex].removeAttribute('aria-current');
    }

    // Calcula novo index
    currentIndex = (index + total) % total;

    // Mostra o novo
    slides[currentIndex].classList.add('hero__slide--active');
    slides[currentIndex].removeAttribute('aria-hidden');
    
    if (captions[currentIndex]) {
      captions[currentIndex].classList.add('hero__caption--active');
    }
    
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('hero__dot--active');
      dots[currentIndex].setAttribute('aria-current', 'true');
    }

    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  if (btnPrev) btnPrev.addEventListener('click', prevSlide);
  if (btnNext) btnNext.addEventListener('click', nextSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Inicia automático
  startAutoplay();
}());
