const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Sequelize } = require('sequelize')
const { Categoria, Product, User } = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//-------------------categorias---------------------------------------
const categorRoute= require('./categorias')

//------------------- product -----------------------------------------
var product = require('./product')
var user = require('./user')

//Product
router.get('/products', product.getAllProducts)
router.get('/products/:id',product.getProductById)
//router.get('category/:id', product.getAllProductosByCategory)


//User
router.get('/users', user.getUser)
router.post('/register', user.register)
router.post('/login', user.postLogin)
router.get('/', user.get)
router.put('/', user.putUser)


//Categorias
router.use('/categoria',categorRoute)







module.exports = router;
