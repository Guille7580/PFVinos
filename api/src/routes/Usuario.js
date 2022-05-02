const { Router } = require('express');
const { putusuario } = require('../controllers/controleruser')
const usuarioRoute= Router();
const { authentication } = require("../middlewares");
  
usuarioRoute.put('/' , putusuario , authentication)


module.exports = usuarioRoute;