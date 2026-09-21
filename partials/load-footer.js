const footerHTML = `
  <footer id="rodape-principal" class="secao-rodape">
    <div class="container-padrao">
      <div class="grade-rodape">
        
        <!-- Coluna 1: Sobre -->
        <div class="coluna-rodape-sobre">
          <a href="index.html" class="logo-rodape">
            <img src="assets/logo_mscrew.jpg" alt="MSCREW Logo" />
            <span class="texto-logo">MSCREW</span>
          </a>
          <p class="texto-rodape">
            Excelência em Crew Management. Conectamos os melhores profissionais marítimos às maiores operações globais.
          </p>
        </div>

        <!-- Coluna 2: Links Úteis -->
        <div class="coluna-rodape-links">
          <h4 class="titulo-coluna">Navegação</h4>
          <ul class="lista-links">
            <li><a href="index.html" class="link-rodape">Início</a></li>
            <li><a href="servicos.html" class="link-rodape">Serviços</a></li>
            <li><a href="sobre.html" class="link-rodape">Sobre Nós</a></li>
            <li><a href="contato.html" class="link-rodape">Contato</a></li>
          </ul>
        </div>

        <!-- Coluna 3: Contato -->
        <div class="coluna-rodape-contato">
          <h4 class="titulo-coluna">Escritório</h4>
          <ul class="lista-contato">
            <li class="item-contato">
              <svg class="icone-contato" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span class="texto-endereco">Av. Rio Branco, Centro<br/>Rio de Janeiro - RJ, Brasil</span>
            </li>
            <li class="item-contato">
              <svg class="icone-contato" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href="mailto:contato@mscrew.com.br" class="link-email">contato@mscrew.com.br</a>
            </li>
          </ul>
        </div>

        <!-- Coluna 4: Plantão 24/7 -->
        <div class="coluna-rodape-plantao">
          <h4 class="titulo-coluna">Atendimento</h4>
          <ul class="lista-contato">
            <li class="item-contato">
              <svg class="icone-contato" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <a href="tel:+5521999999999" class="link-email">
                +55 (21) 99999-9999
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="linha-inferior-rodape">
        <p class="texto-direitos">
          &copy; 2026 MSCREW Crew Management. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
`;

const footerPlaceholder = document.getElementById("footer-placeholder");
if (footerPlaceholder) {
  footerPlaceholder.innerHTML = footerHTML;
}
