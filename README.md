# ONG Esperança Viva — Plataforma Web

Single Page Application (SPA) desenvolvida como projeto acadêmico para uma plataforma de gestão de atividades, projetos e voluntariado de uma ONG fictícia.

## 🚀 Tecnologias

- **HTML5** — estrutura semântica
- **CSS3** — Design System com custom properties, Grid, Flexbox e responsividade mobile-first
- **JavaScript (Vanilla)** — SPA com roteamento por hash, templates dinâmicos, validação de formulário e persistência via `localStorage`
- **[IMask](https://imask.js.org/)** — máscara de input para CPF, telefone e CEP (via CDN)

## 📁 Estrutura do Projeto

ong-esperanca-viva/
├── html/
│ └── index.html # ponto de entrada único da SPA
├── css/
│ └── style.css # design system e todos os componentes visuais
├── imagens/
│ └── projetos/ # imagens usadas na página de projetos
└── js/
├── templates.js # dados + geração de HTML (renderização)
├── storage.js # persistência via localStorage
├── validacao.js # validação de formulário e máscaras de input
└── router.js # roteamento por hash (#/rota)


## ▶️ Como Executar

1. Clone o repositório: `git clone https://github.com/gabrielarodri69-rgb/ong-esperanca-viva.git`
2. Abra a pasta `html/index.html` com a extensão **Live Server** do VS Code (recomendado), ou dê duplo clique no arquivo para abrir via `file://`.

## ✨ Funcionalidades

- Navegação entre 3 views (Início, Projetos, Cadastro) sem recarregamento de página
- Formulário de cadastro de voluntários com validação em tempo real e feedback visual
- Persistência dos cadastros no `localStorage` do navegador
- Menu responsivo com hambúrguer (100% CSS, sem JavaScript)
- Componentes reutilizáveis: badges, alertas (info/sucesso/aviso/erro), cards

## 🌱 Fluxo de Branches (GitFlow)

- `main` — versões estáveis, prontas para entrega
- `develop` — integração contínua do desenvolvimento
- `feature/*` — desenvolvimento isolado de cada funcionalidade nova

## 🧭 Estratégia de Roteamento em Produção

A aplicação usa **hash routing** (`#/rota`) em vez de roteamento por caminho real (`/rota`). Isso é o que garante que o GitHub Pages funcione corretamente mesmo com links diretos para uma tela interna: o fragmento após o `#` nunca é enviado ao servidor, então toda requisição — seja para `/`, seja para uma rota interna — pede ao servidor apenas o arquivo `index.html`. O JavaScript então lê `window.location.hash` no carregamento e renderiza a view correta no lado do cliente, sem exigir nenhuma configuração de fallback/404 no servidor.

**Como validar:** cole uma URL com uma rota interna diretamente na barra de endereço do navegador (sem passar pela navegação do site), por exemplo:
`https://gabrielarodri69-rgb.github.io/ong-esperanca-viva/html/index.html#/cadastro`
A página deve carregar já exibindo a tela de Cadastro, comprovando que o roteamento funciona mesmo no primeiro acesso direto, não só ao navegar pelo menu.

## 👤 Autoria

Projeto desenvolvido para a disciplina de Desenvolvimento Front-End (ADS).