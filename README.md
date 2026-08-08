# Guatelipe — Web Development

Portfólio e landing page de [Carlos Guatelipe](https://github.com/CarlosGuatelipe),
desenvolvedor web em Belo Horizonte.

Site estático, sem framework e sem etapa de build: é só abrir o `index.html`.

## Como rodar

Basta abrir o arquivo no navegador. Para testar o formulário e as URLs
absolutas do `404.html`, sirva por HTTP:

```bash
npx serve .
# ou
python -m http.server
```

## Estrutura

```
index.html          página única
404.html            página de erro
css/style.css       sistema visual completo
js/script.js        rolagem, revelações, índice lateral
images/             marca, retrato, pranchas de projeto, grão de papel
tools/captura.mjs   captura de tela com emulação de aparelho
netlify.toml        cabeçalhos, cache e redirecionamentos
robots.txt          · sitemap.xml · site.webmanifest
```

## Peças visuais

| arquivo | o que é |
|---|---|
| `guatelipe-og.jpg` | card de compartilhamento, 1200×630 |
| `abertura.jpg` | prancha de abertura da capa, 2400×1020 |
| `projeto-caroline.jpg` | o site da cliente num notebook |
| `projeto-caroline-mobile.jpg` | o mesmo site num celular |
| `carlos-guatelipe.jpg` | retrato, 704×880 — fotografia real, não gerada |
| `servico-*.jpg` | uma natureza-morta por tipo de projeto |
| `papel.png` | ladrilho de fibra de papel, 400×400 |
| `icone-512.png` · `icone-180.png` | marca em PNG, para o manifesto e o iOS |

As fotografias nasceram no Higgsfield, todas na mesma montagem de estúdio:
papel quente, luz vinda de cima e da esquerda, sombra marrom e um único
acento vermelho. É essa repetição que faz o conjunto parecer de uma marca
só. O grão de papel saiu de uma fotografia de papel-algodão, não de ruído
gerado.

### As telas dos aparelhos não são geradas

Vale registrar porque é a parte que engana. Entregar a captura do site da
cliente como referência para o modelo produz uma tela bonita e **com o
texto reescrito** — "Fisioterapia domiciliar" virou "Fieioterapia
bomiciliar". Num portfólio isso é inaceitável: descaracteriza o trabalho
de outra pessoa.

Então as cenas foram geradas com a **tela vazia** e a captura verdadeira
foi composta por cima: com transformação de perspectiva no notebook, que
está de três quartos, e por simples recorte no celular, que foi pedido de
frente justamente para dispensar perspectiva.

### Como recapturar o site de um cliente

`--screenshot` na linha de comando do Chrome/Edge **não emula aparelho**:
ele ignora a meta viewport e renderiza como desktop estreito, o que faz um
site responsivo parecer quebrado. Emulação de verdade só existe pelo
protocolo DevTools. A primeira captura de celular feita aqui saiu com o
texto estourando para fora da tela, e o site da cliente não tem defeito
nenhum — o navegador é que estava mentindo.

Para desktop, a linha de comando serve, porque não há viewport a emular:

```bash
msedge --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,900 --screenshot=captura.png https://fisiocarolscarabelli.netlify.app
```

Para celular, é preciso falar CDP. O `tools/captura.mjs` faz isso sem
instalar nada — o Node 22+ já traz `fetch` e `WebSocket` embutidos:

```bash
node tools/captura.mjs https://fisiocarolscarabelli.netlify.app celular.png 390 844 3 1
```

Ele também serve para fotografar este site durante o desenvolvimento. A
variável `EVAL` roda JavaScript antes da foto, para abrir os acordeões ou
pular as animações de entrada:

```bash
EVAL="document.querySelectorAll('details').forEach(d=>d.open=true)" node tools/captura.mjs http://localhost:4173/ aberto.png 1440 900 1 0
```

### Cache das imagens

As imagens ficam 7 dias em cache (`netlify.toml`) e os nomes não têm
hash. Ao trocar o **conteúdo** de uma imagem mantendo o nome, incremente
o `?v=` no `index.html` — senão quem visitou na última semana continua
vendo a imagem antiga, e se as medidas mudaram ela aparece esticada.

## Sistema visual

Linguagem editorial: papel, tinta e um único acento.

| token | valor | uso |
|---|---|---|
| `--paper` | `#FBFAF7` | fundo |
| `--ink` | `#16120E` | texto e blocos invertidos |
| `--accent` | `#C2371C` | um acento, usado com parcimônia |

Tipografia: **Archivo** (títulos e texto), **Instrument Serif** (itálicas de
destaque) e **JetBrains Mono** (rótulos, números e navegação).

As sombras são marrons, nunca pretas neutras — preto em `multiply` rouba a
saturação do papel e devolve cinza.

O fundo não é cor chapada: `images/papel.png` cobre a página em `multiply`.
O ladrilho vive entre 235 e 255, com média 250, e é por isso que `multiply`
funciona — a página escurece cerca de 2%, imperceptível, e o escurecimento
de verdade fica só nas fibras. `soft-light` foi tentado e não serve: o
efeito dele encolhe conforme o fundo se aproxima do branco, e este papel é
quase branco.

### Controles de atmosfera

No topo do `css/style.css`:

```css
--nevoa:   .3;   /* densidade da bruma que atravessa a página */
--vinheta: .14;  /* escurecimento das bordas da janela */
--grao:    .55;  /* aspereza da fibra do papel */
```

## Publicação

No ar em **https://guatelipe.com**

O deploy é feito no Netlify a partir desta pasta. O `netlify.toml` já define
cabeçalhos de segurança, política de cache e o redirecionamento de `www`.

Cache de CSS e JS é curto de propósito: os arquivos não têm hash no nome, então
cache longo prenderia o visitante numa versão antiga a cada correção.

## Contato

Não há formulário. O contato é direto por WhatsApp, e-mail ou LinkedIn.

A decisão foi deliberada: o formulário dependia do EmailJS, cuja cota
gratuita é de 200 envios por mês. Estourada a cota, o formulário falha em
silêncio — e um canal de contato que quebra sozinho é pior que canal nenhum.
Sem serviço externo, não há cota, chave pública exposta nem ponto de falha.

O link do e-mail já vai com assunto e corpo preenchidos, para a pessoa só
completar.

## Pendências

- [ ] **Ligar `guatelipe.com` ao Netlify** (Domain management → Add domain) e
      esperar o DNS responder. Os endereços canônicos do site já apontam para
      esse domínio: publicar antes disso manda o Google indexar um endereço
      que ainda não existe.
- [ ] Ligar o Cloudflare Web Analytics (snippet comentado no `<head>`)
- [ ] Enviar o `sitemap.xml` ao Google Search Console
- [ ] Segundo projeto real no portfólio
- [ ] Depoimento de cliente

## Licença

Código aberto para consulta. A marca, os textos, o retrato e as capturas de
projeto não são livres para reuso.
