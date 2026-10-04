/**
 * load-footer.js — Rodapé global (partial injetado em todas as páginas).
 *
 * Bloco BEM: .site-footer  (+ .brand--inverse)
 * Regra de marca: o rodapé usa fundo na cor institucional, portanto
 * aplica-se a versão BRANCA da logomarca, mantendo o arejamento de 10%.
 */
(function initSiteFooter() {
  'use strict';

  const ICON = {
    pin: '<svg class="site-footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg class="site-footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    phone: '<svg class="site-footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    clock: '<svg class="site-footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  };

  const year = new Date().getFullYear();

  const footerHTML = `
    <footer class="site-footer" id="site-footer">
      <div class="container">
        <div class="site-footer__grid">

          <div class="site-footer__about">
            <a href="index.html" class="brand brand--inverse" aria-label="MS CREW Serviços Marítimos — Voltar ao início">
              <img class="brand__logo" src="assets/logo-mscrew-white.png" alt="MS CREW Serviços Marítimos" width="666" height="447" loading="lazy" />
            </a>
            <p class="site-footer__text">
              Soluções globais em tripulação e gestão aquaviária. Conectamos armadores aos profissionais
              mais qualificados do Offshore, da Cabotagem, do Longo Curso e da Navegação Interior.
            </p>
          </div>

          <nav class="site-footer__col" aria-label="Institucional">
            <h2 class="site-footer__title">Institucional</h2>
            <ul class="site-footer__list">
              <li><a class="site-footer__link" href="index.html">Início</a></li>
              <li><a class="site-footer__link" href="servicos.html">Serviços</a></li>
              <li><a class="site-footer__link" href="sobre.html">Sobre Nós</a></li>
              <li><a class="site-footer__link" href="trabalhe-conosco.html">Portal do Marítimo</a></li>
              <li><a class="site-footer__link" href="contato.html">Contato</a></li>
            </ul>
          </nav>

          <nav class="site-footer__col" aria-label="Segmentos atendidos">
            <h2 class="site-footer__title">Segmentos</h2>
            <ul class="site-footer__list">
              <li><a class="site-footer__link" href="contato.html?perfil=armador&amp;segmento=offshore#formulario">Offshore · Apoio Marítimo</a></li>
              <li><a class="site-footer__link" href="contato.html?perfil=armador&amp;segmento=cabotagem#formulario">Cabotagem e Longo Curso</a></li>
              <li><a class="site-footer__link" href="contato.html?perfil=armador&amp;segmento=interior#formulario">Navegação Interior</a></li>
            </ul>
          </nav>

          <div class="site-footer__col">
            <h2 class="site-footer__title">Atendimento</h2>
            <ul class="site-footer__list">
              <li><span class="site-footer__link">${ICON.pin}Av. Rio Branco, Centro<br />Rio de Janeiro – RJ, Brasil</span></li>
              <li><a class="site-footer__link" href="mailto:contato@mscrew.com.br">${ICON.mail}contato@mscrew.com.br</a></li>
              <li><a class="site-footer__link" href="tel:+5521999999999">${ICON.phone}+55 (21) 99999-9999</a></li>
              <li><span class="site-footer__link">${ICON.clock}Plantão operacional 24h</span></li>
            </ul>
          </div>

        </div>

        <div class="site-footer__bottom">
          <p>&copy; ${year} MS CREW Serviços Marítimos LTDA. Todos os direitos reservados.</p>
          <p>Crew Management · Recrutamento Aquaviário · Gestão de Tripulação</p>
        </div>
      </div>
    </footer>
  `;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) placeholder.outerHTML = footerHTML;
}());
