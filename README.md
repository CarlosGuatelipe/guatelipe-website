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
js/script.js        rolagem, revelações, formulário
images/             marca em SVG, retrato, capturas de projeto
netlify.toml        cabeçalhos, cache e redirecionamentos
robots.txt          · sitemap.xml · site.webmanifest
```

## Sistema visual

Linguagem editorial: papel, tinta e um único acento.

| token | valor | uso |
|---|---|---|
| `--paper` | `#F2EDE0` | fundo |
| `--ink` | `#16120E` | texto e blocos invertidos |
| `--accent` | `#C2371C` | um acento, usado com parcimônia |

Tipografia: **Archivo** (títulos e texto), **Instrument Serif** (itálicas de
destaque) e **JetBrains Mono** (rótulos, números e navegação).

As sombras são marrons, nunca pretas neutras — preto em `multiply` rouba a
saturação do papel e devolve cinza.

### Controles de atmosfera

No topo do `css/style.css`:

```css
--nevoa:   .42;  /* densidade da bruma que atravessa a página */
--vinheta: .55;  /* escurecimento das bordas da janela */
```

## Publicação

O deploy é feito no Netlify a partir desta pasta. O `netlify.toml` já define
cabeçalhos de segurança, política de cache e o redirecionamento de `www`.

Cache de CSS e JS é curto de propósito: os arquivos não têm hash no nome, então
cache longo prenderia o visitante numa versão antiga a cada correção.

## Pendências

- [ ] Ligar o Cloudflare Web Analytics (snippet comentado no `<head>`)
- [ ] Restringir o domínio no painel do EmailJS
- [ ] Enviar o `sitemap.xml` ao Google Search Console
- [ ] Segundo projeto real no portfólio
- [ ] Depoimento de cliente

## Licença

Código aberto para consulta. A marca, os textos, o retrato e as capturas de
projeto não são livres para reuso.
