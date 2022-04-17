const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Sequelize } = require('sequelize')
const { Categoria, Product, User } = require('../db')
// Requerimos el middleware de autenticación
const { authentication } = require("../middlewares/authentication");
const adminAuthentication = require("../middlewares/adminAuthentication");

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
router.get('/users', adminAuthentication, user.getUser)
router.post('/register', user.register)
router.post('/login', user.postLogin)
router.get('/', authentication, user.get)
router.put('/update', authentication, user.putUser)
router.put('/block/:userId', user.blockUser)



//Categorias
router.use('/categoria',categorRoute)

// ------------------- Carrito -----------------------------------
var carro = require('./carrito')

router.post('/carritos', carro.carritoPost)
router.get('/carritos/:usuarioId', carro.carritoGet)





module.exports = router;
