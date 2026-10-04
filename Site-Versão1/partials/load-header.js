const headerHTML = `
  <header id="cabecalho-principal" class="secao-cabecalho" role="banner">
    <div class="container-padrao">
      <div class="cabecalho-container">

        <!-- Logo -->
        <a href="index.html" class="logo-link group" aria-label="MSCREW — Página Inicial">
          <img src="assets/logo_mscrew.jpg" alt="MSCREW Logo" class="imagem-logo" />
        </a>

        <!-- Navegação Desktop -->
        <nav class="navegacao-desktop" aria-label="Navegação Principal">
          <a href="index.html" class="link-navegacao nav-link">Início</a>
          <a href="servicos.html" class="link-navegacao nav-link">Serviços</a>
          <a href="index.html#vagas" class="link-navegacao nav-link">Vagas</a>
          <a href="sobre.html" class="link-navegacao nav-link">Sobre Nós</a>
          <a href="index.html#vagas" id="botao-portal-vagas" class="link-navegacao nav-link">Trabalhe Conosco</a>
          <a href="contato.html" id="botao-cadastrar-cv" class="link-navegacao nav-link">Contato</a>
        </nav>

        <!-- CTAs Desktop (Botões principais) -->
        <div class="botoes-desktop">
          <!-- Idioma Desktop -->
          <div class="seletor-idioma">
            <button class="btn-idioma pt" title="Português">
              <img src="https://flagcdn.com/w20/br.png" alt="Bandeira do Brasil">
              <span>PT</span>
            </button>
            <button class="btn-idioma en" title="English">
              <img src="https://flagcdn.com/w20/us.png" alt="Bandeira dos EUA">
              <span>EN</span>
            </button>
          </div>
        </div>

        <!-- Hamburguer Mobile (Botão do menu) -->
        <button
          id="botao-menu-mobile"
          aria-label="Abrir menu de navegação"
          aria-expanded="false"
          aria-controls="menu-mobile-container"
        >
          <span class="linha-hamburguer hamburger-line"></span>
          <span class="linha-hamburguer hamburger-line"></span>
          <span class="linha-hamburguer hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Menu Mobile (Lista de links) -->
    <div id="menu-mobile-container" role="navigation" aria-label="Menu Mobile">
      <div class="menu-mobile-conteudo">
        <a href="index.html" class="link-menu-mobile mobile-nav-link">Início</a>
        <a href="servicos.html" class="link-menu-mobile mobile-nav-link">Serviços</a>
        <a href="index.html#vagas" class="link-menu-mobile mobile-nav-link">Vagas</a>
        <a href="sobre.html" class="link-menu-mobile mobile-nav-link">Sobre</a>
        <a href="contato.html" class="link-menu-mobile mobile-nav-link">Contato</a>
        <div class="seletor-idioma">
          <button class="btn-idioma pt" title="Português">
            <img src="https://flagcdn.com/w20/br.png" alt="Bandeira do Brasil">
            <span>PT</span>
          </button>
          <button class="btn-idioma en" title="English">
            <img src="https://flagcdn.com/w20/us.png" alt="Bandeira dos EUA">
            <span>EN</span>
          </button>
        </div>
        <div class="menu-mobile-botoes">
          <a href="index.html#vagas" class="botao-menu-vagas">Trabalhe Conosco</a>
          <a href="contato.html" class="botao-menu-cv">Contato</a>
        </div>
      </div>
    </div>
  </header>
`;

const headerPlaceholder = document.getElementById("header-placeholder");
if (headerPlaceholder) {
  headerPlaceholder.innerHTML = headerHTML;

  // Lógica do menu mobile e scroll, movida do script.js
  document.addEventListener("DOMContentLoaded", () => {
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

    const header = document.getElementById('cabecalho-principal');
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if(header) {
            header.classList.toggle('header-scrolled', window.scrollY > 60);
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  });
}
