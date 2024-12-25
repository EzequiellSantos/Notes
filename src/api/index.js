// configurações
require('dotenv').config()
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyparser = require('body-parser');
const path = require("path");

const app = express()
const port = 8000

// DB 
const db = require('../db/connection')

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static("public"))
app.use(bodyparser.urlencoded({ extended: true }))


// Importação de rotas
const notesRoutes = require('../routes/notes')

// rotas
app.get('/', async function(req, res) {

    const notes = await db.getDb().db().collection('notes').find({}).toArray()

    res.render('home', { notes })

})

app.use('/notes', notesRoutes)

db.initDb((error, db) => {

    if(error){
        console.log(error);
    }else{

        console.log('Banco conectado :)');
        app.listen(port, () => {
            console.log(`Projeto rodadndo na porta ${port}`);
        })

    }

})

module.exports = app