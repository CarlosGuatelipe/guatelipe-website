// Captura de tela com emulação de aparelho de verdade.
//
// Por que existe: o `--screenshot` da linha de comando do Chrome e do Edge
// NÃO emula aparelho. Ele ignora a meta viewport e renderiza a página como
// um desktop estreito, o que faz um site responsivo parecer quebrado — a
// primeira captura de celular feita para este portfólio saiu com o texto
// estourando para fora da tela, e o site fotografado não tinha defeito
// nenhum. Emulação real só existe pelo protocolo DevTools, e é com ele que
// este script fala.
//
// Não instala nada: o Node 22+ já traz `fetch` e `WebSocket` embutidos.
//
//   node tools/captura.mjs <url> <saída.png> [largura] [altura] [escala] [mobile]
//
//   node tools/captura.mjs https://exemplo.com desktop.png 1440 900 2 0
//   node tools/captura.mjs https://exemplo.com celular.png 390 844 3 1
//
// A variável de ambiente EVAL roda JavaScript na página antes da foto —
// útil para abrir acordeões ou pular animações de entrada:
//
//   EVAL="document.querySelectorAll('details').forEach(d=>d.open=true)" \
//     node tools/captura.mjs http://localhost:4173/ aberto.png 1440 900 1 0

import { spawn } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, out, w = 390, h = 844, dsf = 3, mobile = "1"] = process.argv.slice(2);

if (!url || !out) {
  console.error("uso: node tools/captura.mjs <url> <saída.png> [larg] [alt] [escala] [mobile]");
  process.exit(1);
}

const CANDIDATOS = [
  process.env.BROWSER_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

const navegador = CANDIDATOS.find((p) => existsSync(p));
if (!navegador) {
  console.error("não achei Edge nem Chrome. Aponte o caminho em BROWSER_PATH.");
  process.exit(1);
}

const PORTA = 9333;
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

const proc = spawn(navegador, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${PORTA}`,
  `--user-data-dir=${join(tmpdir(), "captura-cdp")}`,
  "about:blank",
]);

// O navegador leva um instante para abrir a porta de depuração.
let alvo;
for (let i = 0; i < 40 && !alvo; i++) {
  await espera(500);
  try {
    const lista = await (await fetch(`http://127.0.0.1:${PORTA}/json/list`)).json();
    alvo = lista.find((t) => t.type === "page");
  } catch {
    /* ainda subindo */
  }
}
if (!alvo) {
  proc.kill();
  throw new Error("não consegui falar com o navegador");
}

const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pendentes = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pendentes.has(m.id)) {
    pendentes.get(m.id)(m.result);
    pendentes.delete(m.id);
  }
};
const enviar = (metodo, params = {}) =>
  new Promise((r) => {
    const n = ++id;
    pendentes.set(n, r);
    ws.send(JSON.stringify({ id: n, method: metodo, params }));
  });

// É esta chamada que a linha de comando não sabe fazer. `mobile: true` liga
// a meta viewport, o toque e a barra de rolagem de aparelho móvel.
await enviar("Emulation.setDeviceMetricsOverride", {
  width: +w,
  height: +h,
  deviceScaleFactor: +dsf,
  mobile: mobile === "1",
  screenWidth: +w,
  screenHeight: +h,
});

await enviar("Page.enable");
await enviar("Page.navigate", { url });
await espera(6000); // fontes da web, imagens e animações de entrada

if (process.env.EVAL) {
  await enviar("Runtime.evaluate", { expression: process.env.EVAL });
  await espera(2500);
}

const { data } = await enviar("Page.captureScreenshot", { format: "png" });
writeFileSync(out, Buffer.from(data, "base64"));
console.log(`${out} — ${w}×${h} @${dsf}x, mobile=${mobile === "1" ? "sim" : "não"}`);

ws.close();
proc.kill();
process.exit(0);
