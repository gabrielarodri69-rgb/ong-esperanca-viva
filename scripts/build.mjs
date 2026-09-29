/* ==========================================================================
   BUILD DE PRODUÇÃO — ONG Esperança Viva
   ==========================================================================
   Ferramentas: esbuild (bundle + minificação de JS e CSS), html-minifier-terser
   (minificação de HTML) e sharp (compressão de imagens).
   Uso: npm run build   ->   gera a pasta dist/ e imprime um relatório.
   ========================================================================== */

import { transform } from "esbuild";
import { minify as minificarHtml } from "html-minifier-terser";
import sharp from "sharp";
import { readFile, writeFile, mkdir, rm, readdir } from "node:fs/promises";
import { join, extname, dirname } from "node:path";

const DIST = "dist";

// Ordem de dependência: quem é usado por outros vem primeiro.
// (templates e storage não dependem de ninguém; validacao usa storage; router usa todos)
const ORDEM_JS = ["templates", "storage", "validacao", "router"];

const relatorio = [];
const registrar = (grupo, nome, antes, depois) =>
  relatorio.push({ grupo, nome, antes, depois });

async function salvar(caminho, conteudo) {
  await mkdir(dirname(caminho), { recursive: true });
  await writeFile(caminho, conteudo);
}

/* 1. CSS: remove comentários, espaços e quebras de linha */
async function buildCss() {
  const codigo = await readFile("css/style.css", "utf8");
  const { code } = await transform(codigo, { loader: "css", minify: true, charset: "utf8" });
  await salvar(join(DIST, "css", "style.css"), code);
  registrar("codigo", "css/style.css", Buffer.byteLength(codigo), Buffer.byteLength(code));
}

/* 2. JS: junta os 4 módulos em UM arquivo (bundle) e minifica.
      Como são scripts clássicos que compartilham o escopo global, basta
      concatená-los na ordem de dependência. */
async function buildJs() {
  let antes = 0;
  const partes = [];
  for (const nome of ORDEM_JS) {
    const codigo = await readFile(join("js", `${nome}.js`), "utf8");
    antes += Buffer.byteLength(codigo);
    partes.push(codigo);
  }
  const { code } = await transform(partes.join("\n;\n"), { loader: "js", minify: true, charset: "utf8" });
  await salvar(join(DIST, "js", "app.min.js"), code);
  registrar("codigo", `js/*.js (${ORDEM_JS.length} arquivos -> app.min.js)`, antes, Buffer.byteLength(code));
}

/* 3. HTML: troca as 4 tags <script> por uma só e minifica */
async function buildHtml() {
  const original = await readFile("html/index.html", "utf8");

  const scriptsProprios = /<script src="\.\.\/js\/(?:templates|storage|validacao|router)\.js"><\/script>\s*/g;
  const encontradas = original.match(scriptsProprios) ?? [];
  if (encontradas.length !== ORDEM_JS.length) {
    throw new Error(
      `Esperava ${ORDEM_JS.length} tags <script> dos módulos em html/index.html ` +
        `(../js/templates.js, storage.js, validacao.js, router.js), mas encontrei ${encontradas.length}.`
    );
  }
  let html = original.replace(scriptsProprios, "");
  html = html.replace("</body>", '<script src="../js/app.min.js"></script></body>');

  const minificado = await minificarHtml(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  });
  await salvar(join(DIST, "html", "index.html"), minificado);
  registrar("codigo", "html/index.html", Buffer.byteLength(original), Buffer.byteLength(minificado));

  await salvar(
    join(DIST, "index.html"),
    '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">' +
      '<meta http-equiv="refresh" content="0; url=html/index.html">' +
      "<title>ONG Esperança Viva</title></head>" +
      '<body><a href="html/index.html">Abrir a aplicação</a></body></html>'
  );
}

/* 4. Imagens: redimensiona para o tamanho máximo de exibição, recomprime
      e gera uma versão .webp de cada uma. */
async function buildImagens() {
  const LARGURA_MAXIMA = 800; // ~2x o maior tamanho exibido no layout (370px, 3 colunas)

  async function percorrer(pasta) {
    for (const entrada of await readdir(pasta, { withFileTypes: true })) {
      const origem = join(pasta, entrada.name);
      if (entrada.isDirectory()) {
        await percorrer(origem);
        continue;
      }
      const ext = extname(entrada.name).toLowerCase();
      if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

      const original = await readFile(origem);
      const metadata = await sharp(original).metadata();

      let base = sharp(original).rotate();
      if (metadata.width > LARGURA_MAXIMA) {
        base = base.resize({ width: LARGURA_MAXIMA });
      }

      let otimizada;
      if (ext === ".jpg" || ext === ".jpeg") {
        otimizada = await base.clone().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      } else {
        otimizada = await base.clone().png({ compressionLevel: 9 }).toBuffer();
      }
      const final = otimizada.length < original.length ? otimizada : original;
      await salvar(join(DIST, origem), final);
      registrar("imagens", origem.replaceAll("\\", "/"), original.length, final.length);

      const webp = await base.clone().webp({ quality: 80 }).toBuffer();
      const caminhoWebp = origem.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      await salvar(join(DIST, caminhoWebp), webp);
      registrar("imagens", caminhoWebp.replaceAll("\\", "/") + " (novo)", original.length, webp.length);
    }
  }
  await percorrer("imagens");
}

/* 5. Relatório */
const kb = (bytes) => (bytes / 1024).toFixed(1).padStart(8) + " KB";
const pct = (antes, depois) =>
  (antes === 0 ? 0 : ((antes - depois) / antes) * 100).toFixed(1).padStart(6) + " %";

function imprimirRelatorio() {
  const linha = (nome, antes, depois) =>
    `${nome.padEnd(48)}${kb(antes)}${kb(depois)}${pct(antes, depois)}`;

  console.log("\n" + "ARQUIVO".padEnd(48) + "   ANTES".padStart(11) + "   DEPOIS".padStart(11) + "   REDUÇÃO");
  console.log("-".repeat(86));

  for (const grupo of ["codigo", "imagens"]) {
    const itens = relatorio.filter((r) => r.grupo === grupo);
    itens.forEach((r) => console.log(linha(r.nome, r.antes, r.depois)));
    const antes = itens.reduce((s, r) => s + r.antes, 0);
    const depois = itens.reduce((s, r) => s + r.depois, 0);
    console.log(linha(`>> TOTAL ${grupo === "codigo" ? "HTML + CSS + JS" : "IMAGENS"}`, antes, depois));
    console.log("-".repeat(86));
  }
}

/* Execução */
await rm(DIST, { recursive: true, force: true });
await buildCss();
await buildJs();
await buildHtml();
await buildImagens();
imprimirRelatorio();
console.log('Build concluída. Arquivos gerados na pasta "dist/".\n');