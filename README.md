# Guatelipe — Site Refinado

Estrutura mínima:

```text
guatelipe_site_refinado/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── README.md
```

## Melhorias desta versão

- Notebook 3D no início
- Efeito de iluminação seguindo o cursor
- Luzes ambientes
- Movimento suave do notebook com o mouse
- Botões magnéticos
- Cards mais orgânicos e arredondados
- Transições ao rolar a página
- Menu responsivo
- Portfólio, serviços, processo, sobre, FAQ e contato
- Seção de garantias ("O que esperar") e FAQ com accordion
- Formulário multi-etapa com envio por e-mail (EmailJS)
- SEO: dados estruturados (JSON-LD), Open Graph e Twitter cards
- Acessibilidade: link "pular para o conteúdo", foco visível e respeito a "reduzir movimento"
- Botão flutuante de WhatsApp

## Como abrir

1. Extraia o ZIP.
2. Abra a pasta no VS Code.
3. Abra `index.html`.
4. Use o Live Server ou abra diretamente no navegador.

## Configurar o WhatsApp

O botão flutuante fica escondido até você configurar o número.

Abra `index.html`, procure `55DDDNUMERO` no link do WhatsApp e troque pelo seu número no formato `55 + DDD + número` (somente números). Exemplo:

```text
https://wa.me/5531999999999?text=...
```

Assim que o `55DDDNUMERO` for substituído, o botão aparece automaticamente.

## Configurar o e-mail (EmailJS)

O formulário de orçamento envia por e-mail via EmailJS. As credenciais ficam em `js/script.js`, no objeto `EMAILJS_CONFIG` (`serviceId`, `templateId`, `publicKey` e `recipientEmail`).


## Animações adicionadas ao fundo

- Grid com brilho e deslocamento muito lento
- Aurora azul animada
- Partículas discretas
- Scanner horizontal suave
- Notebook flutuando
- Glow pulsando atrás do notebook
- Reflexo passando pela tela
- Cards flutuantes com movimento leve
- Luz do mouse com pequeno atraso

O layout e o conteúdo original não foram alterados.

