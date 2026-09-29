/* ==========================================================================
   VALIDAÇÃO — regras de validação e feedback do formulário de cadastro
   ========================================================================== */


function aplicarMascarasDeInput() {
  if (!window.IMask) return;
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");
  if (cpf) IMask(cpf, { mask: "000.000.000-00" });
  if (telefone) IMask(telefone, { mask: "(00) 00000-0000" });
  if (cep) IMask(cep, { mask: "00000-000" });
}

function initFormValidation() {
  const form = document.getElementById("form-cadastro");
  if (!form) return;

  renderListaCadastros(); // mostra cadastros já salvos ao entrar na página
  aplicarMascarasDeInput(); // formata CPF, telefone e CEP enquanto o usuário digita
}

  const validadores = {
    nome: (v) => v.trim().length >= 3 || "Digite seu nome completo (mínimo 3 letras).",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Digite um e-mail válido, ex: nome@exemplo.com.",
    cpf: (v) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) || "CPF deve seguir o formato 000.000.000-00.",
    telefone: (v) => /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(v) || "Telefone deve seguir o formato (00) 00000-0000.",
    cep: (v) => /^\d{5}-\d{3}$/.test(v) || "CEP deve seguir o formato 00000-000.",
  };

  function validarCampo(input) {
    const regra = validadores[input.name];
    if (!regra) return true;

    const resultado = regra(input.value);
    const erroEl = document.getElementById("erro-" + input.name);

if (resultado === true) {
  input.classList.remove("form-field__input--invalid");
  input.classList.add("form-field__input--valid");
  input.setAttribute("aria-invalid", "false");
  if (erroEl) erroEl.textContent = "";
  return true;
}

input.classList.add("form-field__input--invalid");
input.classList.remove("form-field__input--valid");
input.setAttribute("aria-invalid", "true");
if (erroEl) erroEl.textContent = resultado;
return false;

  Object.keys(validadores).forEach((nome) => {
    const input = form.elements[nome];
    if (!input) return;
    input.addEventListener("blur", () => validarCampo(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("form-field__input--invalid")) validarCampo(input);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formularioValido = true;
    Object.keys(validadores).forEach((nome) => {
      const input = form.elements[nome];
      if (input && !validarCampo(input)) formularioValido = false;
    });

    const mensagem = document.getElementById("mensagem-cadastro");

    if (!formularioValido) {
      mensagem.innerHTML = `
        <div class="alert alert--error" role="alert">
          <span aria-hidden="true">⛔</span>
          <p>Corrija os campos destacados antes de enviar.</p>
        </div>`;
      const primeiroInvalido = form.querySelector(".form-field__input--invalid");
      if (primeiroInvalido) primeiroInvalido.focus();
      return;
    }

    const dadosCadastro = {
      nome: form.elements.nome.value.trim(),
      email: form.elements.email.value.trim(),
      cpf: form.elements.cpf.value.trim(),
      telefone: form.elements.telefone.value.trim(),
      cep: form.elements.cep.value.trim(),
    };
    salvarCadastro(dadosCadastro);
    renderListaCadastros();

    mensagem.innerHTML = `
      <div class="alert alert--success" role="status">
        <span aria-hidden="true">✅</span>
        <p>Cadastro enviado com sucesso! Em breve nossa equipe entrará em contato.</p>
      </div>`;

    form.reset();
    form.querySelectorAll("input").forEach((i) =>
      i.classList.remove("form-field__input--valid", "form-field__input--invalid")
    );
  });
}