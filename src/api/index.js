// configurações
require('dotenv').config()
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyparser = require('body-parser');
const path = require("path");

const app = express()
const port = process.env.PORT || 8000;  

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static("public"))
app.use(bodyparser.urlencoded({ extended: true }))

// Importação de rotas
const notesRoutes = require('../routes/notes')

// DB 
const db = require('../db/connection');

// rotas
app.get('/', async function(req, res) {

    try {
        const notes = await db.getDb().collection('notes').find({}).toArray()

        res.render('home', { notes })

    } catch (error) {
        console.error("Erro ao buscar notas:", error);
        res.status(500).send("Erro interno do servidor");
    }

})

app.use('/notes', notesRoutes)

db.initDb((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        process.exit(1);
    } else {
        console.log("Banco conectado com sucesso.");
        
        // Rotas definidas após inicialização do banco
        app.get('/', async (req, res) => {
            try {
                const notes = await db.getDb().collection('notes').find({}).toArray();
                res.render('home', { notes });
            } catch (error) {
                console.error("Erro ao buscar notas:", error);
                res.status(500).send("Erro interno do servidor");
            }
        });

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    }
});


module.exports = app