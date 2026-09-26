/* ==========================================================================
   STORAGE — persistência de dados via localStorage
   ========================================================================== */

const CHAVE_STORAGE = "ong-esperanca-viva:cadastros";

function obterCadastros() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Erro ao ler cadastros do localStorage:", erro);
    return [];
  }
}

function salvarCadastro(cadastro) {
  const cadastros = obterCadastros();
  cadastros.push({
    ...cadastro,
    id: Date.now(),
    enviadoEm: new Date().toLocaleString("pt-BR"),
  });
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(cadastros));
  } catch (erro) {
    console.error("Erro ao salvar cadastro no localStorage:", erro);
  }
}

function renderListaCadastros() {
  const container = document.getElementById("lista-cadastros");
  if (!container) return;

  const cadastros = obterCadastros();

  if (cadastros.length === 0) {
    container.innerHTML = "";
    return;
  }

  const itens = cadastros
    .map(
      (c) => `
        <li>
          <strong>${c.nome}</strong> — ${c.email}
          <span class="badge badge--continua">${c.enviadoEm}</span>
        </li>`
    )
    .join("");

  container.innerHTML = `
    <h3>Cadastros salvos neste navegador (${cadastros.length})</h3>
    <p>Estes dados ficam guardados no localStorage do seu navegador — continuam aqui mesmo se você fechar e abrir a página de novo.</p>
    <ul class="contact-list">${itens}</ul>
  `;
}