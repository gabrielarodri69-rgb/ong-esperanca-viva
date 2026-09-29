/* --- Fontes de dados: arrays que alimentam os templates repetitivos --- */

const projetosData = [
  {
    titulo: "Horta Comunitária Urbana",
    descricao: "Cultivo sustentável de hortaliças e alimentos orgânicos para distribuição gratuita a famílias em situação de vulnerabilidade nutricional.",
  },
  {
    titulo: "Reforço Escolar e Inclusão Digital",
    descricao: "Aulas de apoio pedagógico, incentivo à leitura e noções básicas de informática para crianças e adolescentes da rede pública.",
  },
];

const voluntariadoData = [
  {
    imagem: "../imagens/projetos/ensino-acessivel300.jpg",
    alt: "Atividade do projeto de ensino acessível",
    titulo: "Apoio Pedagógico",
    descricao: "Atuação no acompanhamento escolar de crianças aos sábados.",
  },
  {
    imagem: "../imagens/projetos/nossas-voluntarias300.jpg",
    alt: "Equipe de voluntárias reunida em uma ação do projeto",
    titulo: "Logística e Triagem",
    descricao: "Organização de doações e preparação de cestas de alimentos.",
  },
  {
    imagem: "../imagens/projetos/projeto-300.png",
    alt: "Foto das atividades do projeto",
    titulo: "Ações de Campo",
    descricao: "Participação direta nos dias de mutirão e eventos comunitários.",
  },
];

const doacoesData = [
  {
    badge: "sazonal",
    rotulo: "Sazonal",
    titulo: "Campanha do Agasalho",
    descricao: "Arrecadação e distribuição de mantas e roupas de frio nos meses de outono/inverno.",
  },
  {
    badge: "continua",
    rotulo: "Contínua",
    titulo: "Arrecadação de Alimentos e Itens de Higiene",
    descricao: "Recebimento de insumos em nossos pontos de coleta parceiros.",
  },
  {
    badge: "financeira",
    rotulo: "Financeira",
    titulo: "Contribuições Financeiras",
    descricao: "Apoio recorrente ou pontual destinado à manutenção física da sede e aquisição de materiais pedagógicos.",
  },
];

/* --- Sub-templates: cada função converte UM objeto de dados em UM trecho de HTML --- */

function renderCardProjeto(projeto) {
  return `
    <article class="card">
      <h3>${projeto.titulo}</h3>
      <p>${projeto.descricao}</p>
    </article>
  `;
}

function renderItemVoluntariado(item) {
  return `
    <li class="volunteer-list__item">
      <img src="${item.imagem}" alt="${item.alt}" class="volunteer-list__img">
      <p><strong>${item.titulo}:</strong> ${item.descricao}</p>
    </li>
  `;
}

function renderItemDoacao(item) {
  return `
    <li>
      <span class="badge badge--${item.badge}">${item.rotulo}</span>
      <strong>${item.titulo}:</strong> ${item.descricao}
    </li>
  `;
}



/* ==========================================================================
   TEMPLATES — geração de HTML para cada "página" da SPA
   ========================================================================== */

function renderHome() {
  return `
    <section class="hero">
      <div class="hero__content">
        <p class="hero__kicker">Terceiro setor &middot; São Paulo</p>
        <h2 class="hero__title">Transformar realidades começa com um gesto simples.</h2>
        <p class="hero__lead">A ONG Esperança Viva trabalha transformando vidas por meio de ações comunitárias, educação e apoio social.</p>
        <div class="hero__actions">
          <a href="#/cadastro" class="button button--primary" data-route>Seja voluntário</a>
          <a href="#/projetos" class="button button--ghost" data-route>Conheça os projetos</a>
        </div>
      </div>
    </section>

    <section class="section section--tinted">
      <div class="section__inner">
        <h2>Sobre a Nossa ONG</h2>
        <p>A ONG Esperança Viva trabalha transformando vidas por meio de ações comunitárias, educação e apoio social.</p>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2>Nossa Missão, Visão e Valores</h2>
        <p>Promover a inclusão social e garantir dignidade para famílias em situação de vulnerabilidade.</p>
      </div>
    </section>

    <section class="section section--tinted">
      <div class="section__inner">
        <h2>Fale Conosco</h2>
        <p>Entre em contato com a nossa equipe para tirar dúvidas ou saber como ajudar:</p>
        <ul class="contact-list">
          <li><strong>E-mail:</strong> contato@ongesperancaviva.org</li>
          <li><strong>Telefone:</strong> (11) 99999-8888</li>
          <li><strong>Endereço:</strong> Rua da Solidariedade, 123 - São Paulo, SP</li>
          <li><strong>Horário de Atendimento:</strong> Segunda a Sexta, das 08h às 17h</li>
        </ul>
      </div>
    </section>
  `;
}

function renderProjetos() {
  return `
    <section class="page-intro">
      <div class="page-intro__inner">
        <h2>Nossos projetos, o seu apoio</h2>
        <p>Do plantio à sala de aula, cada frente de atuação conta com voluntários e doações para continuar de pé.</p>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2>Nossas Frentes de Atuação</h2>
        <p>Conheça os projetos contínuos desenvolvidos para transformar a realidade da nossa comunidade:</p>
        <div class="card-grid">
          ${projetosData.map(renderCardProjeto).join("")}
        </div>
      </div>
    </section>

    <section class="section section--tinted">
      <div class="section__inner">
        <h2>Atividades de Voluntariado</h2>
        <p>O trabalho voluntário é o motor das nossas ações. Oferecemos diferentes modalidades de participação de acordo com o seu perfil e disponibilidade:</p>
        <article class="volunteer-block">
          <h3>Como Funciona o Engajamento Voluntário</h3>
          <ul class="volunteer-list">
            ${voluntariadoData.map(renderItemVoluntariado).join("")}
          </ul>
          <p class="volunteer-block__cta">Pronto para fazer a diferença? <a href="#/cadastro" data-route>Acesse nossa página de cadastro e junte-se à equipe!</a></p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2>Campanhas de Doação</h2>
        <p>Conduzimos campanhas transparentes e focadas em suprir as necessidades mais urgentes dos nossos assistidos:</p>
        <article class="donation-block">
          <h3>Como a ONG Conduz as Campanhas</h3>
          <p>Nossas campanhas são divididas entre arrecadações contínuas e ações sazonais mobilizadas ao longo do ano:</p>
          <ul class="donation-list">
            ${doacoesData.map(renderItemDoacao).join("")}
          </ul>
        </article>
      </div>
    </section>
  `;
}

function renderCadastro() {
  return `
    <section class="section form-section">
      <div class="section__inner section__inner--narrow">
        <h2>Cadastro de Colaboradores</h2>
        <p>Preencha os dados abaixo para fazer parte da nossa rede solidária:</p>

        <div class="alert alert--info" role="status">
          <span aria-hidden="true">ℹ️</span>
          <p>Seus dados são usados apenas para fins de cadastro voluntário e não são compartilhados com terceiros.</p>
        </div>

        <form id="form-cadastro" class="form-cadastro" novalidate>
          <fieldset class="form-cadastro__group">
            <legend>Dados Pessoais</legend>
            <p class="form-field">
              <label for="nome">Nome Completo:</label>
              <input type="text" id="nome" name="nome" required minlength="3">
              <input type="text" id="nome" name="nome" required minlength="3" aria-describedby="erro-nome">
              <span class="form-field__error" id="erro-nome" role="alert"></span>
            </p>
            <p class="form-field">
              <label for="email">E-mail:</label>
              <input type="email" id="email" name="email" required>
              <input type="email" id="email" name="email" required aria-describedby="erro-email">
              <span class="form-field__error" id="erro-email" role="alert"></span>
            </p>
            <p class="form-field">
              <label for="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" maxlength="14" required>
              <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" maxlength="14" required aria-describedby="erro-cpf">
              <span class="form-field__error" id="erro-cpf" role="alert"></span>
            </p>
          </fieldset>

          <fieldset class="form-cadastro__group">
            <legend>Contato e Endereço</legend>
            <div class="alert alert--warning">
              <span aria-hidden="true">⚠️</span>
              <p>Preencha telefone e CEP exatamente no formato indicado nos campos, incluindo pontuação.</p>
            </div>
            <p class="form-field">
              <label for="telefone">Telefone:</label>
              <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" maxlength="15" required>
              <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" maxlength="15" required aria-describedby="erro-telefone">
              <span class="form-field__error" id="erro-telefone" role="alert"></span>
            </p>
            <p class="form-field">
              <label for="cep">CEP:</label>
              <input type="text" id="cep" name="cep" placeholder="00000-000" maxlength="9" required>
              <input type="text" id="cep" name="cep" placeholder="00000-000" maxlength="9" required aria-describedby="erro-cep">
              <span class="form-field__error" id="erro-cep" role="alert"></span>
            </p>
          </fieldset>

          <button type="submit" class="button button--primary">Enviar Cadastro</button>
        </form>

        <div id="mensagem-cadastro" role="status"></div>
        <div id="lista-cadastros"></div>
      </div>
    </section>
  `;
}






/* ==========================================================================
   TEMPLATES — geração de HTML para cada "página" da SPA
   ========================================================================== */

function renderHome() {
  return `
    <section class="hero">
      <div class="hero__content">
        <p class="hero__kicker">Terceiro setor &middot; São Paulo</p>
        <h2 class="hero__title">Transformar realidades começa com um gesto simples.</h2>
        <p class="hero__lead">A ONG Esperança Viva trabalha transformando vidas por meio de ações comunitárias, educação e apoio social.</p>
        <div class="hero__actions">
          <a href="#/cadastro" class="button button--primary" data-route>Seja voluntário</a>
          <a href="#/projetos" class="button button--ghost" data-route>Conheça os projetos</a>
        </div>
      </div>
    </section>

    <section class="section section--tinted">
      <div class="section__inner">
        <h2>Sobre a Nossa ONG</h2>
        <p>A ONG Esperança Viva trabalha transformando vidas por meio de ações comunitárias, educação e apoio social.</p>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2>Nossa Missão, Visão e Valores</h2>
        <p>Promover a inclusão social e garantir dignidade para famílias em situação de vulnerabilidade.</p>
      </div>
    </section>

    <section class="section section--tinted">
      <div class="section__inner">
        <h2>Fale Conosco</h2>
        <p>Entre em contato com a nossa equipe para tirar dúvidas ou saber como ajudar:</p>
        <ul class="contact-list">
          <li><strong>E-mail:</strong> contato@ongesperancaviva.org</li>
          <li><strong>Telefone:</strong> (11) 99999-8888</li>
          <li><strong>Endereço:</strong> Rua da Solidariedade, 123 - São Paulo, SP</li>
          <li><strong>Horário de Atendimento:</strong> Segunda a Sexta, das 08h às 17h</li>
        </ul>
      </div>
    </section>
  `;
}

function renderProjetos() {
  return `
    <section class="page-intro">
      <div class="page-intro__inner">
        <h2>Nossos projetos, o seu apoio</h2>
        <p>Do plantio à sala de aula, cada frente de atuação conta com voluntários e doações para continuar de pé.</p>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2>Nossas Frentes de Atuação</h2>
        <p>Conheça os projetos contínuos desenvolvidos para transformar a realidade da nossa comunidade:</p>
        <div class="card-grid">
          <article class="card">
            <h3>Horta Comunitária Urbana</h3>
            <p>Cultivo sustentável de hortaliças e alimentos orgânicos para distribuição gratuita a famílias em situação de vulnerabilidade nutricional.</p>
          </article>
          <article class="card">
            <h3>Reforço Escolar e Inclusão Digital</h3>
            <p>Aulas de apoio pedagógico, incentivo à leitura e noções básicas de informática para crianças e adolescentes da rede pública.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--tinted">
      <div class="section__inner">
        <h2>Atividades de Voluntariado</h2>
        <p>O trabalho voluntário é o motor das nossas ações. Oferecemos diferentes modalidades de participação de acordo com o seu perfil e disponibilidade:</p>
        <article class="volunteer-block">
          <h3>Como Funciona o Engajamento Voluntário</h3>
          <ul class="volunteer-list">
            <li class="volunteer-list__item">
              <img src="../imagens/projetos/ensino-acessivel300.jpg" alt="Atividade do projeto de ensino acessível" class="volunteer-list__img">
              <p><strong>Apoio Pedagógico:</strong> Atuação no acompanhamento escolar de crianças aos sábados.</p>
            </li>
            <li class="volunteer-list__item">
              <img src="../imagens/projetos/nossas-voluntarias300.jpg" alt="Equipe de voluntárias reunida em uma ação do projeto" class="volunteer-list__img">
              <p><strong>Logística e Triagem:</strong> Organização de doações e preparação de cestas de alimentos.</p>
            </li>
            <li class="volunteer-list__item">
              <img src="../imagens/projetos/projeto-300.png" alt="Foto das atividades do projeto" class="volunteer-list__img">
              <p><strong>Ações de Campo:</strong> Participação direta nos dias de mutirão e eventos comunitários.</p>
            </li>
          </ul>
          <p class="volunteer-block__cta">Pronto para fazer a diferença? <a href="#/cadastro" data-route>Acesse nossa página de cadastro e junte-se à equipe!</a></p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <h2>Campanhas de Doação</h2>
        <p>Conduzimos campanhas transparentes e focadas em suprir as necessidades mais urgentes dos nossos assistidos:</p>
        <article class="donation-block">
          <h3>Como a ONG Conduz as Campanhas</h3>
          <p>Nossas campanhas são divididas entre arrecadações contínuas e ações sazonais mobilizadas ao longo do ano:</p>
          <ul class="donation-list">
            <li><span class="badge badge--sazonal">Sazonal</span><strong>Campanha do Agasalho:</strong> Arrecadação e distribuição de mantas e roupas de frio nos meses de outono/inverno.</li>
            <li><span class="badge badge--continua">Contínua</span><strong>Arrecadação de Alimentos e Itens de Higiene:</strong> Recebimento de insumos em nossos pontos de coleta parceiros.</li>
            <li><span class="badge badge--financeira">Financeira</span><strong>Contribuições Financeiras:</strong> Apoio recorrente ou pontual destinado à manutenção física da sede e aquisição de materiais pedagógicos.</li>
          </ul>
        </article>
      </div>
    </section>
  `;
}

function renderCadastro() {
  return `
    <section class="section form-section">
      <div class="section__inner section__inner--narrow">
        <h2>Cadastro de Colaboradores</h2>
        <p>Preencha os dados abaixo para fazer parte da nossa rede solidária:</p>

        <div class="alert alert--info" role="status">
          <span aria-hidden="true">ℹ️</span>
          <p>Seus dados são usados apenas para fins de cadastro voluntário e não são compartilhados com terceiros.</p>
        </div>

        <form id="form-cadastro" class="form-cadastro" novalidate>
          <fieldset class="form-cadastro__group">
            <legend>Dados Pessoais</legend>
            <p class="form-field">
              <label for="nome">Nome Completo:</label>
              <input type="text" id="nome" name="nome" required minlength="3">
              <span class="form-field__error" id="erro-nome" role="alert"></span>
            </p>
            <p class="form-field">
              <label for="email">E-mail:</label>
              <input type="email" id="email" name="email" required>
              <span class="form-field__error" id="erro-email" role="alert"></span>
            </p>
            <p class="form-field">
              <label for="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" maxlength="14" required>
              <span class="form-field__error" id="erro-cpf" role="alert"></span>
            </p>
          </fieldset>

          <fieldset class="form-cadastro__group">
            <legend>Contato e Endereço</legend>
            <div class="alert alert--warning">
              <span aria-hidden="true">⚠️</span>
              <p>Preencha telefone e CEP exatamente no formato indicado nos campos, incluindo pontuação.</p>
            </div>
            <p class="form-field">
              <label for="telefone">Telefone:</label>
              <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" maxlength="15" required>
              <span class="form-field__error" id="erro-telefone" role="alert"></span>
            </p>
            <p class="form-field">
              <label for="cep">CEP:</label>
              <input type="text" id="cep" name="cep" placeholder="00000-000" maxlength="9" required>
              <span class="form-field__error" id="erro-cep" role="alert"></span>
            </p>
          </fieldset>

          <button type="submit" class="button button--primary">Enviar Cadastro</button>
        </form>

        <div id="mensagem-cadastro" role="status"></div>
        <div id="lista-cadastros"></div>
      </div>
    </section>
  `;
}