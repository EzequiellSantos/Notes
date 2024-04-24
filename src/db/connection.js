const {MongoClient} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/notesDb'

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
