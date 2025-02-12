const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./db/connection');

const app = express();
const port = process.env.PORT || 8000;

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para arquivos estáticos
app.use(express.static('public'));

// Inicializa o banco de dados e registra as rotas
(async () => {
  try {
    await db.initDb();
    console.log("Banco conectado com sucesso.");

    // Rota principal
    app.get('/', async (req, res) => {
      try {
        const notes = await db.getDb().collection('notes').find({}).toArray();
        res.render('home', { notes });
      } catch (error) {
        console.error("Erro ao buscar notas:", error);
        res.status(500).send("Erro interno do servidor");
      }
    });

    // Rota de teste
    app.get('/test', (req, res) => {
      res.send('Rota de teste funcionando!');
    });

    // Inicia o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    process.exit(1);
  }
})();
