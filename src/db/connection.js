const { MongoClient } = require("mongodb");
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.sv2qh74.mongodb.net/notesDb?retryWrites=true&w=majority`;

let _db;

/**
 * Inicializa a conexão com o banco de dados.
 * @returns {Promise<void>}
 */
const initDb = async () => {
  if (_db) {
    console.log("Banco de dados já inicializado.");
    return;
  }

  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    _db = client.db("notesDb"); // Nome do banco
    console.log("Conexão com o banco de dados estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error; // Propaga o erro para tratamento externo
  }
};

/**
 * Retorna a conexão com o banco de dados.
 * @returns {import('mongodb').Db}
 */
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
