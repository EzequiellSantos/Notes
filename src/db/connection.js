const { MongoClient } = require("mongodb");
const app = require('../db/connection')
require("dotenv").config();

const url = process.env.MONGODB_URI;

// @type {?MongoClient}
let _db;

const initDb = async (cb) => {
  if (_db) {
    console.log("Banco de dados já inicializado.");
    return cb(null, _db);
  }

  await MongoClient.connect(url, { useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Aumenta o tempo limite
    socketTimeoutMS: 45000, // Tempo limite para sockets 
    })
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
