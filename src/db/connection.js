const {MongoClient} = require('mongodb');

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const url = `mongodb+srv://Ezequiel:${DB_PASS}@cluster0.sv2qh74.mongodb.net/notesDb?retryWrites=true&w=majority&appName=Cluster0`

/** @type {?MongoClient} */
let _db

const initDb = cb => {


    MongoClient.connect(url)
    .then(client => {
        _db = client
        cb(null, _db)
    })
    .catch(error  => {
        cb(error)
    })

}

const getDb = () => {
    return _db
}

module.exports = {
    initDb, 
    getDb
}
