/**
 * contato.js — Lógica exclusiva da página de contato.
 *
 * Responsabilidades:
 *  1. Atualizar label do input de upload de currículo
 *  2. Gerenciar envio do formulário de contato
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. FEEDBACK DE UPLOAD DE CURRÍCULO ─────────────────────────
  const inputCurriculo = document.getElementById('fc-curriculo');
  const uploadTexto    = document.getElementById('upload-texto');

  if (inputCurriculo && uploadTexto) {
    inputCurriculo.addEventListener('change', () => {
      uploadTexto.textContent = inputCurriculo.files.length > 0
        ? `Currículo selecionado: ${inputCurriculo.files[0].name}`
        : 'Anexe seu Currículo (PDF) — opcional';
    });
  }


  // ── 2. ENVIO DO FORMULÁRIO DE CONTATO ──────────────────────────
  const form   = document.getElementById('formulario-contato');
  const btnEnviar = document.getElementById('btn-enviar-contato');

  if (!form || !btnEnviar) return;

  form.addEventListener('submit', handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const textoOriginal = btnEnviar.innerHTML;

    // Estado: enviando
    btnEnviar.classList.add('btn-enviar--enviado');
    btnEnviar.innerHTML = 'Mensagem Enviada! ✓';

    setTimeout(() => {
      // Restaura estado original
      btnEnviar.classList.remove('btn-enviar--enviado');
      btnEnviar.innerHTML = textoOriginal;
      form.reset();

      if (uploadTexto) {
        uploadTexto.textContent = 'Anexe seu Currículo (PDF) — opcional';
      }
    }, 4500);
  }

});
