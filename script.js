// 1. Header scroll
(function () {
  const header = document.getElementById('cabecalho-principal');
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if(header) {
          header.classList.toggle('header-scrolled', window.scrollY > 60);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}());

// 2. Menu mobile
(function () {
  const toggle = document.getElementById('botao-menu-mobile');
  const menu   = document.getElementById('menu-mobile-container');
  
  if(toggle && menu) {
    const lines  = toggle.querySelectorAll('.hamburger-line');
    let isOpen   = false;

    function setMenu(open) {
      isOpen = open;
      toggle.setAttribute('aria-expanded', open);
      menu.classList.toggle('open', open);
      if(lines.length >= 3) {
        lines[0].style.transform = open ? 'translateY(8px) rotate(45deg)'  : '';
        lines[1].style.opacity   = open ? '0'                               : '';
        lines[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
        lines[2].style.width     = open ? '24px'                            : '';
      }
    }

    toggle.addEventListener('click', function () { setMenu(!isOpen); });
    document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () { if (isOpen) setMenu(false); });
    });
  }
}());

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
