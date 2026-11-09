const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Static frontend (homepage, css, js)
// Pasta "docs" é usada tanto pelo Express quanto pelo GitHub Pages (Settings → Pages → /docs)
app.use(express.static(path.join(__dirname, "docs")));

// Rotas da área de membros, admin, auth etc. entram aqui conforme forem
// desenvolvidas (ver routes/ quando existir).

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "docs", "index.html"));
});

app.listen(PORT, () => {
  console.log(`KAIOWÁ rodando em http://localhost:${PORT}`);
});
