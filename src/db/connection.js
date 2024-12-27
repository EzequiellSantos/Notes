const { MongoClient } = require("mongodb");
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.sv2qh74.mongodb.net/notesDb?retryWrites=true&w=majority`;

// @type {?MongoClient}
let _db;

const initDb = (cb) => {
  if (_db) {
    console.log("Banco de dados já inicializado.");
    return cb(null, _db);
  }

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    _db = client.db("notesDb"); // Especifica o banco de dados
    console.log("Conexão com o banco de dados estabelecida.");
    cb(null, _db);
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
    cb(error);
  });
};

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
