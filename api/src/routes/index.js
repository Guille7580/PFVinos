const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Sequelize } = require('sequelize')
const { Categoria, Product, User } = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//------------------- product -----------------------------------------
var product = require('./product')
var user = require('./user')

//Product
router.get('/products', product.getAllProducts)


//User
router.get('/users', user.getUser)
router.post('/register', user.register)






module.exports = router;
