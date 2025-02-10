const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_URI;

// @type {?MongoClient}
let _db;

// Função para conectar ao banco de dados
const initDb = async () => {
  if (_db) {
    console.log("Banco de dados já inicializado.");
    return _db;
  }

  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    _db = client.db("notesDb"); // Especifica o banco de dados
    console.log("Conexão com o banco de dados estabelecida.");
    return _db;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error; // Lança o erro para ser tratado no chamador
  }
};

// Função para obter a conexão do banco
const getDb = () => {
  if (!_db) {
    throw new Error("Banco de dados não inicializado. Chame initDb primeiro.");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
