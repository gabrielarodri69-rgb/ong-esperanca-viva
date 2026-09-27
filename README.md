# ONG Esperança Viva — Plataforma Web

Single Page Application (SPA) desenvolvida como projeto acadêmico para uma plataforma de gestão de atividades, projetos e voluntariado de uma ONG fictícia.

## 🚀 Tecnologias

- **HTML5** — estrutura semântica
- **CSS3** — Design System com custom properties, Grid, Flexbox e responsividade mobile-first
- **JavaScript (Vanilla)** — SPA com roteamento por hash, templates dinâmicos, validação de formulário e persistência via `localStorage`
- **[IMask](https://imask.js.org/)** — máscara de input para CPF, telefone e CEP (via CDN)

## 🔧 Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge ou Opera atualizados).
- [Git](https://git-scm.com/) instalado, para clonar o repositório e acompanhar o histórico de versões.
- [VS Code](https://code.visualstudio.com/) com a extensão **Live Server** (recomendado), para servir os arquivos localmente sem problemas de caminho relativo.
- Conexão com a internet, apenas para carregar as fontes do Google Fonts e a biblioteca IMask via CDN.

## 📦 Instalação de Dependências

Este projeto **não utiliza gerenciador de pacotes** (npm/yarn) nem etapa de build — é uma aplicação estática em HTML5, CSS3 e JavaScript vanilla, sem transpilação ou empacotamento. A única dependência externa (IMask) é carregada diretamente via CDN no `<head>` do `index.html`, não exigindo instalação local.

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

Não há comando de build nem suíte de testes automatizados configurada — a validação do projeto é feita manualmente, testando a navegação, o formulário e a responsividade diretamente no navegador.


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

## 👤 Autoria

Projeto desenvolvido para a disciplina de Desenvolvimento Front-End (ADS).