const { MongoClient } = require("mongodb");
const app = require('../db/connection');  // Não sei se essa linha é necessária no seu caso, mas mantive.
require("dotenv").config();

const url = process.env.MONGODB_URI;

// @type {?MongoClient}
let _db;

// Função para conectar ao banco de dados
const initDb = async (cb) => {
  if (_db) {
    console.log("Banco de dados já inicializado.");
    return cb(null, _db);
  }

  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    _db = client.db("notesDb"); // Especifica o banco de dados
    console.log("Conexão com o banco de dados estabelecida.");
    cb(null, _db);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    cb(error);
  }
};

// Função para obter a conexão do banco
const getDb = () => {
  if (!_db) {
    throw new Error("Banco de dados não inicializado. Chame initDb primeiro.");
  }
  return _db;
};

// Função para reiniciar a conexão com o MongoDB
const restartDbConnection = async () => {
  if (_db) {
    // Fechar a conexão atual
    const client = _db.client;
    await client.close();
    console.log("Conexão com o banco de dados fechada.");
  }

  // Re-estabelecer a conexão com o banco
  initDb((err, db) => {
    if (err) {
      console.error("Erro ao reiniciar a conexão com o MongoDB:", err);
    } else {
      console.log("Conexão com o MongoDB reiniciada com sucesso.");
    }
  });
};

// Intervalo de 10 minutos (600000 ms) para reiniciar a conexão
setInterval(restartDbConnection, 300000); // 600000 ms = 10 minutos

module.exports = {
  initDb,
  getDb,
};
