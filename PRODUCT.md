# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primário:** profissional autônomo que atende pessoas — saúde, estética,
direito, consultoria. Decide sozinho, paga do próprio bolso, não tem comitê
de compras. Confirmado pelo cliente em 2026-08-08.

O perfil de referência é a cliente do projeto 001: fisioterapeuta domiciliar
que atendia captando por Instagram e queria um endereço próprio para onde
mandar quem a procura.

A situação típica de uso do site: alguém recebeu uma indicação ou viu um
perfil, abre o site pelo celular e decide em poucos segundos se manda
mensagem ou desiste.

**Não é público-alvo:** empresa com setor de compras que exige nota fiscal.
Ver Capabilities and Constraints — não é preferência, é restrição.

## Product Purpose

Portfólio e landing page de Carlos Guatelipe, desenvolvedor web em Belo
Horizonte. Existe para transformar quem chega em conversa no WhatsApp.

Sucesso é uma mensagem recebida com contexto de projeto — não visita, não
tempo de permanência. O site é canal de captação de um profissional
individual, não vitrine institucional.

## Positioning

Sites escritos à mão, sem tema pronto e sem construtor visual, com
atendimento direto de quem programa — do primeiro contato até a publicação,
sem intermediário.

O que um concorrente não copiaria honestamente: a mesma pessoa escreve o
código, responde o WhatsApp e publica no ar. Agência não pode afirmar isso;
plataforma de template também não.

## Operating Context

- **Canal principal:** WhatsApp (31) 99919-1545. O site declara resposta em
  até 48h úteis e horário Seg–Sex, 9h–18h.
- **Canais secundários:** e-mail `guatelipe.dev@gmail.com` (com assunto e
  corpo pré-preenchidos no link), LinkedIn, Instagram `@guatelipe_dev`,
  GitHub `CarlosGuatelipe`.
- **Fluxo de projeto declarado:** briefing (1–2 dias) → estratégia (2–5
  dias) → desenvolvimento (1–4 semanas) → entrega (1–2 dias).
- **Prazos por serviço:** landing page 3–10 dias; site institucional 2–4
  semanas; loja 3–6 semanas; sistema sob análise.
- **Formação:** Análise e Desenvolvimento de Sistemas, Estácio de Sá,
  cursando.

## Capabilities and Constraints

**Serviços oferecidos:** sites institucionais, landing pages, lojas
virtuais, sistemas personalizados.

**Sem CNPJ e sem intenção de abrir** (confirmado em 2026-08-08). Consequência
direta: não emite nota fiscal. Até hoje nenhum cliente pediu. Desenvolvimento
de software não é atividade permitida no MEI, então formalizar exigiria ME
com contador — custo desproporcional ao momento.

*Implicação para trabalhos futuros:* o site não deve atrair um público que
ele não consegue faturar. Copy que mira "empresa estabelecida" cria demanda
que morre na hora da nota.

**Sem formulário de contato, por decisão.** O formulário dependia do EmailJS,
cuja cota gratuita quebra em silêncio quando estoura. Um canal que falha
sozinho é pior que canal nenhum. Não reintroduzir sem resolver isso.

**Compromissos declarados na página** (são promessas assumidas, não médias de
mercado — a própria página diz isso): PageSpeed 95+ como meta mínima, 100%
responsivo, resposta em 48h úteis, zero temas prontos, 30 dias de suporte
após a entrega, rodadas de ajuste inclusas no escopo.

**Infraestrutura:** domínio `guatelipe.com` registrado na GoDaddy, DNS
delegado ao Netlify. Deploy no Netlify a partir de
`github.com/CarlosGuatelipe/guatelipe-website`, branch `main` (o branch local
é `master`, então o push é `git push origin master:main`).

**Em aberto — não inventar resolução:**

- Sem Perfil da Empresa no Google, então não há avaliação no Google e o site
  não aparece no bloco local.
- Site publicado no domínio próprio em 2026-08-08 e ainda não indexado.
- Vaga 002 do portfólio aberta.

## Brand Commitments

- **Nome:** Guatelipe Web Development. Pessoa: Carlos Guatelipe, Belo
  Horizonte · MG, atendendo todo o Brasil.
- **Voz:** primeira pessoa, direta, sem jargão e sem promessa de vendedor.
  Admite o que não sabe — o próprio site responde "depende do que você
  precisa" sobre preço, em vez de fingir tabela.
- **Ativos existentes:** marca (nó em círculo, em SVG e PNG), retrato real
  fotografado, e a linguagem editorial de papel/tinta/acento documentada no
  README. Tipografia: Archivo, Instrument Serif, JetBrains Mono.
- **Acessibilidade implementada no código** (observado no repositório, não
  declarado pelo cliente como padrão a cumprir): link de pular para o
  conteúdo, foco visível, respeito a `prefers-reduced-motion`, rótulos ARIA
  e alternativas de texto nas imagens.

## Evidence on Hand

**Real e publicável:**

- **Projeto 001** — Caroline Scarabelli, landing page de fisioterapia
  domiciliar, Resplendor–MG, 2026. No ar em `fisiocarolscarabelli.netlify.app`.
  É o único trabalho de cliente publicado.
- **Projetos de estudo e pessoais**, sem cliente envolvido (confirmado em
  2026-08-08). Publicáveis sem autorização de terceiros, desde que
  apresentados como o que são — não como trabalho contratado.

**Existe, mas com ressalva:**

- **Depoimento textual da Caroline.** O texto foi fornecido pelo cliente e é
  real, mas **a autorização de publicação não foi confirmada**, e ele pediu
  a remoção do site em 2026-08-08. Não republicar sem confirmar com ela.

**Ausências que trabalhos futuros não podem preencher com invenção:**

- Não há avaliação publicada no Google, nem em nenhuma plataforma.
- Não há métrica de resultado do projeto 001 — nem visitas, nem contatos
  gerados, nem agendamentos.
- Não há segundo projeto de cliente publicado.
- Não há depoimento além do da Caroline, e aquele está pendente de
  autorização.

## Product Principles

1. **Atendimento direto é o produto, não um detalhe.** Qualquer coisa que
   sugira equipe, central de atendimento ou intermediário contradiz o único
   diferencial verificável.

2. **Não atrair quem não se consegue faturar.** Sem nota fiscal, mirar
   empresa estabelecida gera orçamento que morre no jurídico. O alcance da
   copy segue o alcance da operação.

3. **Prova antes de afirmação.** Um projeto real vale mais que dez
   adjetivos. Onde não há prova, o site declara a ausência em vez de
   preenchê-la — a vaga 002 aparece como "disponível", não é escondida.

4. **WhatsApp primeiro.** É onde a conversa acontece e onde a resposta é
   mais rápida. E-mail e LinkedIn existem, mas não competem por posição.

5. **Honestidade sobre preço e prazo.** Nunca fingir tabela, nunca prometer
   prazo antes do briefing. O ganho de confiança de admitir "depende" é
   maior que o atrito de não ter número na página.
