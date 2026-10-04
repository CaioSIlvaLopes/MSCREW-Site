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
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
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
