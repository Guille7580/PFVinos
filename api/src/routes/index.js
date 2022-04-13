const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Sequelize } = require('sequelize')
const { Categoria, Product } = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//------------------- product -----------------------------------------
var product = require('./product')

router.get('/products', product.getAllProducts)
router.get('/products/:id',product.getProductById)
//router.get('category/:id', product.getAllProductosByCategory)







module.exports = router;
