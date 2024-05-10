// configurações
require('dotenv').config()
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyparser = require('body-parser')

const app = express()
const port = 8000

// DB 
const db = require('./db/connection')

// template engine
app.engine('handlebars', exphbs.engine({
    defaultLayout:'main'
}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use(bodyparser.urlencoded({ extended: true }))

// Importação de rotas
const notesRoutes = require('./routes/notes')

// rotas
app.get('/', async function(req, res) {

    const notes = await db.getDb().db().collection('notes').find({}).toArray()

    res.render('home', { notes })

})

app.use('/notes', notesRoutes)

db.initDb((error, db) => {

    if(error){
        console.log(error);
        console.log('^^^^^ error na incialização ^^^^')
    }else{

        console.log('Banco conectado :)');
        app.listen(port, () => {
            console.log(`Projeto rodadndo na porta ${port}`);
        })

    }

})

module.exports = app;