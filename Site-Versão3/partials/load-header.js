/**
 * load-header.js — Cabeçalho global (partial injetado em todas as páginas).
 *
 * Blocos BEM: .skip-link · .site-header · .brand · .site-nav
 *
 * Responsabilidades:
 *  1. Injetar o markup do cabeçalho substituindo o #header-placeholder
 *     (substituir — e não aninhar — mantém o position: sticky funcional).
 *  2. Destacar o link da página atual (aria-current="page").
 *  3. Menu mobile acessível (aria-expanded, Esc, clique fora, foco).
 *  4. Estado "scrolled" do cabeçalho.
 */
(function initSiteHeader() {
  'use strict';

  const ICON = {
    phone: '<svg class="site-header__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg class="site-header__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    clock: '<svg class="site-header__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    arrow: '<svg class="btn__icon btn__icon--end" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };

  const NAV_ITEMS = [
    { href: 'index.html', label: 'Início', match: ['', 'index.html'] },
    { href: 'servicos.html', label: 'Serviços', match: ['servicos.html'] },
    { href: 'index.html#segmentos', label: 'Segmentos', match: [] },
    { href: 'sobre.html', label: 'Sobre Nós', match: ['sobre.html'] },
    { href: 'trabalhe-conosco.html', label: 'Portal do Marítimo', match: ['trabalhe-conosco.html'] }
  ];

  const currentPage = decodeURIComponent(window.location.pathname.split('/').pop() || '');

  const navLinks = NAV_ITEMS.map((item) => {
    const isActive = item.match.includes(currentPage);
    return `
      <li class="site-nav__item">
        <a href="${item.href}" class="site-nav__link${isActive ? ' site-nav__link--active' : ''}"${isActive ? ' aria-current="page"' : ''}>${item.label}</a>
      </li>`;
  }).join('');

  const headerHTML = `
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header class="site-header" id="site-header">
      <div class="site-header__topbar">
        <div class="container site-header__topbar-inner">
          <p class="site-header__tagline">Crew Management · Offshore · Cabotagem · Longo Curso · Navegação Interior</p>
          <ul class="site-header__contacts">
            <li><a class="site-header__contact-link" href="tel:+5521999999999">${ICON.phone}+55 (21) 99999-9999</a></li>
            <li><a class="site-header__contact-link" href="mailto:contato@mscrew.com.br">${ICON.mail}contato@mscrew.com.br</a></li>
            <li><span class="site-header__contact-link">${ICON.clock}Plantão operacional 24h</span></li>
            <li class="site-header__lang" style="display: flex; align-items: center; gap: 0.5rem; margin-left: 1rem; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 1rem;">
              <a href="#" aria-label="Português" style="display: flex; align-items: center;">
                <img src="https://flagcdn.com/br.svg" width="20" alt="Brasil" style="border-radius: 2px;">
              </a>
              <a href="#" aria-label="English" style="display: flex; align-items: center; opacity: 0.5; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">
                <img src="https://flagcdn.com/us.svg" width="20" alt="Estados Unidos" style="border-radius: 2px;">
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="site-header__main">
        <div class="container site-header__inner">
          <a href="index.html" class="brand" aria-label="MS CREW Serviços Marítimos — Página inicial">
            <img class="brand__logo" src="assets/logo-mscrew-color.png" alt="MS CREW Serviços Marítimos" width="666" height="447" />
          </a>

          <nav class="site-nav" id="site-nav" aria-label="Navegação principal">
            <ul class="site-nav__list">${navLinks}</ul>
            <div class="site-nav__actions">
              <a href="contato.html" class="btn btn--primary btn--block">Contato ${ICON.arrow}</a>
              <a href="trabalhe-conosco.html" class="btn btn--secondary btn--block">Cadastrar no Portal do Marítimo</a>
              
              <!-- Idiomas no Mobile -->
              <div style="display: flex; justify-content: center; align-items: center; gap: 1.5rem; margin-top: 0.5rem; padding-top: 1.25rem; border-top: 1px solid var(--color-line);">
                <a href="#" aria-label="Português" style="display: flex; align-items: center;">
                  <img src="https://flagcdn.com/br.svg" width="26" alt="Brasil" style="border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                </a>
                <a href="#" aria-label="English" style="display: flex; align-items: center; opacity: 0.5; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">
                  <img src="https://flagcdn.com/us.svg" width="26" alt="Estados Unidos" style="border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                </a>
              </div>
            </div>
          </nav>

          <a href="contato.html" class="btn btn--primary btn--sm site-header__cta">Contato ${ICON.arrow}</a>

          <button class="site-header__toggle" type="button" aria-label="Abrir menu de navegação" aria-expanded="false" aria-controls="site-nav">
            <span class="site-header__toggle-bar"></span>
            <span class="site-header__toggle-bar"></span>
            <span class="site-header__toggle-bar"></span>
          </button>
        </div>
      </div>
    </header>
  `;

  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;
  placeholder.outerHTML = headerHTML;

  const header = document.getElementById('site-header');
  const nav = document.getElementById('site-nav');
  const toggle = header.querySelector('.site-header__toggle');
  const desktopQuery = window.matchMedia('(min-width: 960px)');

  // ── Menu mobile ────────────────────────────────────────────────────────────
  function setMenu(open, { returnFocus = false } = {}) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    nav.classList.toggle('site-nav--open', open);
    document.body.classList.toggle('is-locked', open);

    if (open) {
      const firstLink = nav.querySelector('.site-nav__link');
      if (firstLink) firstLink.focus({ preventScroll: true });
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setMenu(!isOpen()));

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a') && isOpen()) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setMenu(false, { returnFocus: true });
  });

  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target)) setMenu(false);
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches && isOpen()) setMenu(false);
  });

  // ── Estado "scrolled" ─────────────────────────────────────────────────────
  let ticking = false;
  let isScrolled = false;
  function updateScrolled() {
    const scrollY = window.scrollY;
    // Adiciona a classe ao descer além de 120px
    if (!isScrolled && scrollY > 120) {
      isScrolled = true;
      header.classList.add('site-header--scrolled');
    } 
    // Remove a classe apenas quando voltar para menos de 80px
    else if (isScrolled && scrollY < 80) {
      isScrolled = false;
      header.classList.remove('site-header--scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrolled);
      ticking = true;
    }
  }, { passive: true });

  updateScrolled();
}());
