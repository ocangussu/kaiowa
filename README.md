# KAIOWÁ — Site Institucional

Projeto **fictício** de identidade institucional para um grupo de simulação tática
(Arma 3 / FiveM). Sem vínculo, autorização ou representação oficial de
instituições militares ou policiais reais.

## Status

- [x] Homepage (hero, overview, divisions, about/histórico, careers, contact, footer)
- [ ] `/faq`
- [ ] `/login`
- [ ] Área de membros autenticada
- [ ] Painel administrativo + RBAC

## Stack

- Frontend: HTML / CSS / JS puro
- Backend: Node.js + Express (servindo o estático por enquanto; auth e API entram nas próximas etapas)

## Estrutura

```text
.
├── docs/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── server.js
├── package.json
├── .env.example
└── .gitignore
```

A pasta se chama `docs/` (em vez de `public/`) de propósito: é o nome que o
GitHub Pages reconhece nativamente como fonte do site, em **Settings → Pages →
Source → Deploy from a branch → main → /docs**. Assim o mesmo diretório serve
tanto o preview no GitHub Pages quanto o `server.js` local, sem duplicar arquivos.

## Rodando localmente

```bash
npm install
cp .env.example .env
npm run dev
```

O servidor sobe em `http://localhost:3000`.

## Publicando no GitHub Pages

1. Settings → Pages → Source → **Deploy from a branch**
2. Branch: **main**, pasta: **/docs**
3. Salvar e aguardar o build (aba Actions) terminar

Lembrando: GitHub Pages só serve estático — login, área de membros e admin só
vão funcionar quando o projeto estiver rodando num host com Node (Render,
Railway, VPS etc.), não no Pages.

## Próximos passos

- `routes/` e `controllers/` para auth, membros e admin
- Banco de dados (modelo em `docs/` de especificação quando definido: Users, Sessions, Announcements, Documents, Audit Logs — não confundir com a pasta `docs/` do frontend)
- Slug não previsível para a rota da área de membros (via `.env`, nunca hardcoded)
- Hash de senha (Argon2id/bcrypt), sessões via cookie `HttpOnly` + `Secure`, RBAC (Membro / Coordenador / Administrador)
