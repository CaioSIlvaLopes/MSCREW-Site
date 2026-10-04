// 3. Scroll Reveal
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { obs.observe(el); });
}());

// 4. Scroll suave em âncoras
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    var header = document.getElementById('cabecalho-principal');
    var headerH = header ? header.offsetHeight : 0;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerH - 8, behavior: 'smooth' });
  });
});

// 5. Carrossel de Serviços
(function() {
  const track = document.getElementById('servicos-track');
  const btnPrev = document.getElementById('servicos-prev');
  const btnNext = document.getElementById('servicos-next');
  const dotsContainer = document.getElementById('servicos-dots');
  
  if (!track || !btnPrev || !btnNext || !dotsContainer) return;

  const cards = Array.from(track.querySelectorAll('.servico-card'));
  const totalCards = cards.length;
  let currentIndex = 0;
  let visibleCards = 3;

  function updateCarousel() {
    // Definir cards visíveis baseado na largura da tela
    if (window.innerWidth <= 768) visibleCards = 1;
    else if (window.innerWidth <= 1024) visibleCards = 2;
    else visibleCards = 3;

    // Ajustar o index caso a tela mude e o index passe do limite
    const maxIndex = Math.max(0, totalCards - visibleCards);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    // Calcular o gap: tem 1.5rem de margin-right
    // A largura do card + gap é calculada baseada em % no CSS, então podemos usar %
    const translatePercentage = currentIndex * (100 / visibleCards);
    track.style.transform = `translateX(-${translatePercentage}%)`;

    renderDots(maxIndex);
    updateButtons(maxIndex);
  }

  function renderDots(maxIndex) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateButtons(maxIndex) {
    btnPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    btnPrev.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    
    btnNext.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    btnNext.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';
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

  window.addEventListener('resize', updateCarousel);
  
  // Inicialização
  updateCarousel();
})();
