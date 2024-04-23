// configurações
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyparser = require('body-parser')

const app = express()
const port = 8000

// rotas
app.get('/', function(req, res) {
    res.render("home")
})

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.listen(port, () => {

    console.log(`Projeto Rodando na porta ${port}`);

})