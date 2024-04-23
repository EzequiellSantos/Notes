const Router = require('express').Router

const router  = Router()

router.get('/', function(req, res){

    render('notes/create')

})