// configurações
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.set('views', path.join(__dirname, '..', 'views'));
app.use(bodyparser.urlencoded({ extended: true }));

// Importação de rotas
const notesRoutes = require('../routes/notes');

// DB 
const db = require('../db/connection');

// Inicializa o banco e somente depois registra as rotas e inicia o servidor
(async () => {
  try {
    await db.initDb();
    console.log("Banco conectado com sucesso.");

    // Registra as rotas somente após o banco ser inicializado
    app.get('/', async (req, res) => {
      try {
        const notes = await db.getDb().collection('notes').find({}).toArray();
        res.render('home', { notes });
      } catch (error) {
        console.error("Erro ao buscar notas:", error);
        res.status(500).send("Erro interno do servidor");
      }
    });

    app.use('/notes', notesRoutes);

    // Tratamento de erros global
    app.use((err, req, res, next) => {
      console.error("Erro global:", err);
      res.status(500).send("Erro interno do servidor");
    });

    // Inicia o servidor após a conexão com o banco
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    process.exit(1); // Encerra o processo em caso de erro
  }
})();

app.get('/test', (req, res) => {
  res.send('Rota de teste funcionando!');
});

module.exports = app;
