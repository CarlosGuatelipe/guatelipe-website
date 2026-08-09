---
name: Guatelipe Web Development
description: Papel, tinta e um único acento — um site que se comporta como página impressa.
colors:
  paper: "#FBFAF7"
  paper-2: "#F3F1EA"
  paper-3: "#EAE7DD"
  ink: "#16120E"
  ink-2: "#1D1A16"
  ink-soft: "#544C40"
  ink-mute: "#6E6656"
  accent: "#C2371C"
  rule: "rgba(62,44,26,.15)"
  rule-faint: "rgba(62,44,26,.07)"
  rule-inverse: "rgba(251,250,247,.20)"
  paper-soft: "rgba(251,250,247,.72)"
  paper-mute: "rgba(251,250,247,.48)"
typography:
  display:
    fontFamily: "Archivo, Arial Black, Impact, sans-serif"
    fontSize: "clamp(40px, 7.4vw, 112px)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.042em"
  headline:
    fontFamily: "Archivo, Arial Black, Impact, sans-serif"
    fontSize: "clamp(26px, 3.7vw, 52px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Archivo, Arial Black, Impact, sans-serif"
    fontSize: "clamp(20px, 2.5vw, 32px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  quote:
    fontFamily: "Instrument Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(22px, 3vw, 38px)"
    fontWeight: 400
    lineHeight: 1.24
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, Arial Black, Impact, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Consolas, monospace"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  sm: "10px"
  md: "16px"
  lg: "22px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 64px)"
  section: "clamp(72px, 10vw, 168px)"
  head: "76px"
  container: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-sm:
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "42px"
  plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "clamp(18px, 2vw, 30px)"
  section-inverted:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "clamp(72px, 10vw, 168px) 0"
---

# Design System: Guatelipe Web Development

## Overview

**Creative North Star: "A Prova de Impressão"**

Este sistema não imita papel — ele se comporta como uma folha antes de ir
para a gráfica. As pranchas do portfólio têm marcas de corte nos cantos, os
projetos são numerados como matérias de uma edição, o índice lateral é um
sumário, e o fundo é fibra de papel-algodão fotografada, não ruído gerado.
A prova gráfica é o estado em que o trabalho ainda se deixa examinar: por
isso o sistema mostra a régua em vez de escondê-la.

A densidade é editorial, não de aplicativo. A hierarquia vem do tamanho do
tipo, dos fios e da quantidade de informação por bloco — nunca de caixas
coloridas ou ícones. Há muito ar entre seções (até 168px) e muito pouco
dentro de uma linha de dados: uma tabela de projetos é apertada de
propósito, como índice de revista.

O sistema recusa terminantemente dois mundos: **portfólio dark neon** (fundo
preto, brilho, partículas) e **cara de construtor visual** (seções
empilhadas iguais, ícone colorido em círculo, foto de banco de imagens) —
este último porque contradiz a única afirmação que o produto faz sobre si.
O código também já rejeita gradiente, brilho e vidro; isso é invariante
observado na implementação, não preferência a revisar.

**Key Characteristics:**

- Papel quente e tinta quase preta; um único acento, usado com parcimônia
- Três vozes tipográficas com papéis fixos: grotesco pesado, serifa itálica, monoespaçado
- Sombra dura sem desfoque — nunca borrão
- Fios de 1px no lugar de bordas de caixa
- Textura de papel real cobrindo a página inteira em `multiply`
- Marcas de corte, numeração e sumário como vocabulário recorrente

## Colors

Papel quente, tinta terrosa e um único acento alaranjado — a paleta inteira
cabe em três famílias, e a terceira quase não aparece.

### Primary

- **Laranja-Tinta** (`{colors.accent}`): o único acento da página. Marca
  números de seção, o traço sob rótulos, o ponto pulsante de "aceitando
  projetos", a linha de progresso de rolagem e o preenchimento de botão no
  hover. Nunca preenche áreas grandes nem fundos de seção.

### Neutral

- **Papel Cru** (`{colors.paper}`): o fundo de toda a página. Não é branco —
  é quente, e essa temperatura é o que sustenta a metáfora.
- **Papel Cru Sombreado** (`{colors.paper-2}`, `{colors.paper-3}`): fundos de
  seção que precisam se separar sem virar caixa (Compromissos, Dúvidas) e
  painéis internos.
- **Preto Tipográfico** (`{colors.ink}`): todo o texto e as seções invertidas
  (Processo, Orçamento). É marrom-escuro, não preto puro.
- **Tinta Suave** (`{colors.ink-soft}`) e **Tinta Apagada**
  (`{colors.ink-mute}`): texto de apoio e metadados. Diferença de hierarquia
  feita por peso de cor, não por tamanho.
- **Fios** (`{colors.rule}`, `{colors.rule-faint}`): divisórias de 1px. Sobre
  fundo de tinta, usar `{colors.rule-inverse}`.

### Named Rules

**A Regra do Acento Único.** Existe um acento e ele é `{colors.accent}`.
Nenhuma tela pode introduzir uma segunda cor de destaque — nem verde de
sucesso, nem vermelho de erro, nem azul de link. Estado se comunica por
peso, posição e fio, não por nova cor.

**A Regra da Tinta Quente.** Nenhum cinza neutro e nenhum preto puro. Todo
neutro carrega marrom. `#000`, `#333` e `#666` estão proibidos: quebram a
temperatura da página inteira, e o erro só aparece quando já está tudo
montado.

## Typography

**Display Font:** Archivo (fallback Arial Black, Impact)
**Body Font:** Archivo
**Serif de destaque:** Instrument Serif (fallback Georgia)
**Label/Mono Font:** JetBrains Mono (fallback ui-monospace, Consolas)

**Character:** um grotesco condensado pesadíssimo dá as manchetes; uma
serifa itálica entra só onde a página cita ou enfatiza; um monoespaçado
carrega tudo que é dado técnico. Três vozes, papéis que não se misturam.

### Hierarchy

- **Display** (900, `clamp(40px, 7.4vw, 112px)`, 0.9): a manchete da capa.
  Caixa alta, entreletra negativa de -0.042em. Uma por página.
- **Headline** (800, `clamp(26px, 3.7vw, 52px)`, 1.08): títulos de seção,
  limitados a 19ch para forçar quebra curta.
- **Title** (800, `clamp(20px, 2.5vw, 32px)`, 1.02): nome de serviço, de
  projeto e de etapa.
- **Quote** (Instrument Serif, 400, `clamp(22px, 3vw, 38px)`, 1.24): a voz
  do que não é afirmação própria — citação, ênfase, abertura do "Sobre".
  A itálica em `{colors.accent}` é a única cor dentro de um título.
- **Body** (400, 15px, 1.72): parágrafos e listas, com `{colors.ink-soft}`.
  Largura máxima de 44ch em texto de apoio.
- **Label** (500, 10–12px, 0.06–0.16em, caixa alta): números de seção,
  metadados de prancha, rótulos de rodapé, navegação e botões.

### Named Rules

**A Regra das Três Vozes.** Grotesco afirma, serifa cita, monoespaçado
informa. Um dado técnico nunca sai em Archivo; uma manchete nunca sai em
mono. Trocar as vozes destrói a hierarquia mais rápido que qualquer erro de
tamanho.

**A Regra do Algarismo Alinhado.** Toda coluna de números — tabela de
projetos, contadores, prazos, ficha técnica — usa `font-variant-numeric:
tabular-nums`. Número que dança entre linhas denuncia amadorismo.

**A Regra da Quebra Ótica.** Títulos levam `text-wrap: balance`; parágrafos
levam `text-wrap: pretty`. Exceção documentada: dentro de um balão ou caixa
estreita, `pretty` deixa faixa vazia e deve virar `wrap`.

## Layout

Contêiner de no máximo `{spacing.container}` com goteira fluida
`{spacing.gutter}`. Cabeçalho fixo de `{spacing.head}` que encolhe para 62px
depois da rolagem.

Seções respiram `{spacing.section}` no eixo vertical — o ar entre blocos é
grande de propósito, porque é ele que separa hierarquia sem precisar de
borda. Dentro do bloco, a densidade sobe: tabelas e listas de dados ficam
apertadas, como índice impresso.

Grades são de 2 ou 4 colunas em desktop, caindo para 2 em 1180px e 1 em
560px. Pontos de quebra observados: 1620px (entra o índice lateral), 1180px,
900px, 820px (vira menu de hambúrguer), 640px, 560px.

O índice lateral só existe acima de 1620px — é enfeite útil, não navegação
essencial, e some sem prejuízo.

## Elevation & Depth

O sistema é plano. Não existe sombra difusa como linguagem de elevação: a
profundidade vem de **deslocamento sólido**, sem desfoque nenhum. Um cartão
em hover não sobe — ele sai do registro, e uma segunda cópia dura aparece
atrás.

A única sombra desfocada de toda a página é a do cabeçalho depois da
rolagem, e ela é marrom.

### Shadow Vocabulary

- **Deslocamento de botão** (`box-shadow: 6px 6px 0 {colors.ink}`): hover de
  botão, junto de `transform: translate(-3px,-3px)`.
- **Deslocamento de prancha** (`box-shadow: 10px 10px 0 {colors.ink}`): hover
  de cartão de projeto, com `translate(-5px,-5px)`.
- **Deslocamento sobre tinta** (`box-shadow: 8px 8px 0 {colors.paper}`): o
  mesmo gesto dentro de seções invertidas.
- **Sombra de cabeçalho** (`box-shadow: 0 14px 34px -22px rgba(92,58,30,.55)`):
  única sombra desfocada do sistema, e mesmo assim marrom.

### Named Rules

**A Regra do Fora de Registro.** Sombra existe, mas nunca borrada. O
deslocamento imita chapa de cor desalinhada numa prova gráfica: mesmo
formato, mesma nitidez, posição trocada. `blur` maior que zero está
proibido em qualquer elemento que não seja o cabeçalho.

**A Regra da Sombra Quente.** Nenhuma sombra é preta ou cinza neutra. Preto
em `multiply` rouba a saturação do papel e devolve cinza — o marrom
(`rgba(92,58,30,…)`) preserva a temperatura.

## Shapes

Cantos arredondados em três degraus: `{rounded.sm}` para elementos pequenos,
`{rounded.md}` para molduras de imagem e painéis, `{rounded.lg}` para
pranchas de projeto. Botões e etiquetas são pílulas completas
(`{rounded.pill}`); avatares e marcadores são círculos.

Cantos vivos foram testados e reprovados: o comentário no código registra
isso. Não reintroduzir.

A borda padrão é o **fio de 1px**, não a caixa. Onde um sistema comum
colocaria um cartão com fundo e sombra, este coloca uma linha e ar. As
marcas de corte nos cantos das pranchas — quatro cantos em L que se
aproximam no hover — são a assinatura de forma do sistema.

## Components

### Buttons

Precisos e contidos. O movimento é sinal de estado, não convite: o botão se
comporta como instrumento técnico, não como chamada de vendas.

- **Shape:** pílula completa (`{rounded.pill}`), altura mínima de 52px
- **Primary:** fundo `{colors.ink}`, texto `{colors.paper}`, padding `0 28px`
- **Hover:** vira `{colors.accent}`, desloca `-3px,-3px` e ganha sombra dura
  de 6px — os dois movimentos juntos, em 0.22s
- **Active:** zera deslocamento e sombra. É o gesto de afundar a tecla
- **Ghost:** fundo transparente, contorno de 1px em `{colors.ink}`; o mesmo
  deslocamento no hover, sem troca de cor
- **Small:** altura 42px, padding `0 18px`, rótulo em 10px
- **Rótulo:** sempre monoespaçado, caixa alta, entreletra 0.1em

### Cards / Containers

- **Corner Style:** `{rounded.lg}` nas pranchas, `{rounded.md}` em painéis
- **Background:** `{colors.paper}`; pranchas de fotografia usam o creme da
  própria imagem para a moldura ser extensão da foto, não caixa em volta
- **Shadow Strategy:** plano em repouso; deslocamento sólido só no hover
- **Border:** fio de 1px em `{colors.ink}` nas pranchas
- **Internal Padding:** `clamp(18px, 2vw, 30px)`

### Navigation

Rótulos monoespaçados em caixa alta. O cabeçalho é opaco e encolhe ao rolar,
ganhando a única sombra desfocada do sistema. Abaixo de 820px vira menu de
hambúrguer em painel de papel. O índice lateral acima de 1620px é um sumário
numerado, com marcador em `{colors.accent}` na seção ativa.

### Verbete expansível

O componente-assinatura. Serviços não são cartões — são verbetes de um
índice que abrem. Em repouso: fio superior, número em acento, título,
descrição e prazo numa linha só. No hover ou aberto, a linha inteira inverte
para fundo de tinta e recua o padding esquerdo, como entrada selecionada num
sumário. O marcador circular gira 90° e o traço vertical some.

### Prancha de projeto

Moldura com marcas de corte nos quatro cantos, metadados monoespaçados no
topo e no rodapé, e um algarismo fantasma gigante em contorno atrás do
conteúdo. No hover as marcas de corte se aproximam e o algarismo desliza.

## Do's and Don'ts

### Do:

- **Do** usar `{colors.accent}` como marcação — número, fio, ponto,
  preenchimento de hover. Se ele cobrir mais que uma fração da tela, está
  errado.
- **Do** manter todo neutro na família marrom. Tinta é `{colors.ink}`, nunca
  `#000`.
- **Do** separar blocos com fio de 1px e ar, antes de pensar em caixa.
- **Do** aplicar `tabular-nums` em qualquer coluna de números.
- **Do** dar aos títulos `text-wrap: balance` e aos parágrafos
  `text-wrap: pretty`.
- **Do** respeitar `prefers-reduced-motion` em toda animação nova, e
  `@media(hover:none)` em todo efeito que desloca elemento.
- **Do** usar as três vozes nos seus papéis: grotesco afirma, serifa cita,
  mono informa.

### Don't:

- **Don't** usar gradiente, brilho ou vidro. Está escrito no topo do CSS e é
  invariante da implementação.
- **Don't** usar sombra desfocada em nada além do cabeçalho. Deslocamento
  sólido é a linguagem; `blur` positivo quebra a Regra do Fora de Registro.
- **Don't** usar sombra preta ou cinza neutra — sempre marrom.
- **Don't** introduzir uma segunda cor de destaque, inclusive verde de
  sucesso e vermelho de erro.
- **Don't** empilhar seções idênticas com ícone colorido em círculo e foto
  de banco de imagens. É a cara de construtor visual que o produto nega.
- **Don't** levar o sistema para fundo escuro com brilho ou neon.
- **Don't** reintroduzir cantos vivos: foram testados e reprovados.
- **Don't** escrever texto técnico em Archivo nem manchete em mono.
