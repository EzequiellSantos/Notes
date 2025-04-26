require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRoutes = require('./routes/notes'); // Consolidando todas as rotas no arquivo notes.js

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('/', cors(corsOptions)); // Habilita CORS para requisições OPTIONS

// Middlewares
app.use(bodyParser.json());

// Variáveis de ambiente para conexão com o banco
const DBUser = process.env.DB_USER;
const DBPassword = process.env.MONGODB_URI;

// Conexão com o MongoDB
mongoose
  .connect(
    `${DBPassword}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB conectado com sucesso.'))
  .catch((err) => console.log(err, 'Erro de conexão no MongoDB'));

// Rotas
app.use('/notes', notesRoutes); // Todas as rotas relacionadas às notas estão no arquivo notes.js

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API de Notas!' });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
