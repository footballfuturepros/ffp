# Football Future Pros — Site

Site institucional trilíngue (EN / PT / ES) da Football Future Pros, pronto para publicar via GitHub + Vercel no domínio `footballfuturepros.com`.

É um site **estático** (HTML + CSS + JS puro, sem React/build). Isso significa deploy simples, rápido e sem manutenção de dependências.

## Estrutura

```
index.html      → estrutura da página (todas as seções)
styles.css       → identidade visual e layout
script.js        → troca de idioma, menu mobile, animações, formulário
i18n.js          → todos os textos em EN / PT / ES
assets/          → favicon, ícones, imagem de compartilhamento (og-image)
brand/           → kit de marca completo (logo em SVG e PNG, versões clara/escura)
```

## 1. Testar localmente (opcional)

Não precisa de nada instalado além de um navegador. Duas opções:

- Abra `index.html` direto no navegador, **ou**
- Rode um servidor local simples:
  ```bash
  cd ffp
  python3 -m http.server 8080
  ```
  e acesse `http://localhost:8080`

## 2. Subir para o GitHub (`footballfuturepros/ffp`)

Dentro da pasta deste projeto:

```bash
git init
git add .
git commit -m "Site inicial da Football Future Pros"
git branch -M main
git remote add origin https://github.com/footballfuturepros/ffp.git
git push -u origin main
```

Se o repositório já tiver algum arquivo (README criado pelo GitHub, por exemplo), use antes:
```bash
git pull origin main --allow-unrelated-histories
```

## 3. Deploy na Vercel

1. Entre em [vercel.com/new](https://vercel.com/new) e importe o repositório `footballfuturepros/ffp`.
2. Em **Framework Preset**, escolha **Other** (site estático — não precisa de build).
3. **Build Command**: deixe vazio.
4. **Output Directory**: deixe vazio ou `.` (raiz).
5. Clique em **Deploy**. Em ~30 segundos o site estará no ar num domínio tipo `ffp.vercel.app`.

## 4. Conectar o domínio `footballfuturepros.com` (GoDaddy → Vercel)

1. No projeto na Vercel, vá em **Settings → Domains** e adicione `footballfuturepros.com` e `www.footballfuturepros.com`.
2. A Vercel vai mostrar os registros DNS que faltam (algo como um registro `A` apontando para `76.76.21.21` e um `CNAME` de `www` para `cname.vercel-dns.com` — confirme os valores exatos exibidos na tela, pois podem mudar).
3. No painel da GoDaddy → seu domínio → **DNS Management**, adicione/edite esses registros exatamente como a Vercel indicou.
4. Aguarde a propagação (geralmente de alguns minutos até 24h). A Vercel emite o certificado SSL automaticamente assim que o DNS propagar.

## 5. Formulário de contato

✅ **Já está ativo.** O formulário envia direto pra sua conta do Formspree (endpoint `https://formspree.io/f/xrenjwyb`), sem precisar abrir nenhum app de e-mail — a pessoa preenche e clica em enviar, e a mensagem cai na sua conta do Formspree (e no e-mail cadastrado lá).

Se algum dia precisar trocar o endpoint (por exemplo, se recriar o formulário no Formspree), é só achar essa linha no `index.html`:
```html
<form class="ffp-form" id="ffpForm" action="https://formspree.io/f/xrenjwyb" method="POST">
```
e trocar o link. Depois, commit e push.

O plano gratuito do Formspree cobre até 50 envios por mês — se o site começar a receber mais contatos que isso, vale considerar um plano pago.

## 6. Trocar o e-mail de contato

Se `info@footballfuturepros.com` não for o e-mail final, atualize em dois lugares:
- `index.html` → atributo `href="mailto:..."` no link de contato
- `script.js` → constante `TO_EMAIL` no topo da função do formulário

## Novidades desta versão

- Páginas `privacy.html` (Política de Privacidade) e `terms.html` (Termos de Uso), nos 3 idiomas
- Página `404.html` personalizada
- Banner de cookies (aparece uma vez, lembra a escolha do visitante)
- `robots.txt` e `sitemap.xml` para SEO
- Formulário de contato pede mais detalhes do jogador (posição, idade, altura, peso, pé dominante, clube)
- Rodapé com o slogan "From potential to professional." / "Descobrindo talentos. Construindo futuros."

### Para ativar o Google Analytics (opcional)

Em `script.js`, procure a função `loadAnalytics()` dentro do bloco `cookieBanner`. Ela só roda depois que o visitante aceita os cookies. Lá tem um exemplo comentado do código do Google Analytics (GA4) — é só descomentar e trocar `G-XXXXXXX` pelo seu ID de medição (você pega esse ID criando uma propriedade em [analytics.google.com](https://analytics.google.com)).

## Sobre o conteúdo

Os textos evitam números inventados (ex: "+500 jogadores colocados"), já que a empresa está começando agora — o posicionamento é honestidade no processo de scouting. Quando a FFP tiver casos reais, recomendo adicionar uma seção de "Resultados" ou depoimentos com nomes e clubes reais (com autorização), o que vai fortalecer bastante a credibilidade.

## Kit de marca

A pasta `brand/` tem a logo em todos os formatos que você vai precisar (redes sociais, cartão de visita, apresentações):
- `logo-mark-*` → só o símbolo (bom para ícone de perfil/avatar)
- `logo-lockup-*` → símbolo + nome (bom para cabeçalhos, documentos, assinaturas de e-mail)
- versões `dark-bg` para fundo escuro e `light`/`ink` para fundo claro
- SVG = vetor, redimensiona sem perder qualidade (use em impressos)
- PNG = pronto para usar em redes sociais e documentos
