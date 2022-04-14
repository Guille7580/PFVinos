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

//Categorias
router.use('/categoria',categorRoute)





// ------------------- Carrito -----------------------------------
var carro = require('./carrito')

router.post('/carritos', carro.carritoPost)
router.get('/carritos/:usuarioId', carro.carritoGet)



module.exports = router;
