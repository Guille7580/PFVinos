const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Sequelize } = require('sequelize')
const { Categoria, Product, User, Carrito} = require('../db')
const userRouter = require("./user");
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const categorRoute= require('./categorias');
const user = require('./user');
const pedidoRouter = require("./pedido");
const carritoRouter = require("./carrito");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");


//------------------- product -----------------------------------------
var product = require('./product')
//userRouter.post("/register"var user = require('./user')

//Product//////
router.get('/products', product.getAllProducts)
router.get('/products/:id',product.getProductById)
router.post('/products', product.postProduct)
router.delete('/products/:id', product.deleteProduct)
router.put('/products/:id', product.putProduct)

//User



router.use('/user', user);
router.use("/pedidos", pedidoRouter);

//Categorias
router.use('/categoria',categorRoute)

// ------------------- Carrito -----------------------------------
// var carro = require('./carrito')

// router.post('/carritos', carro.carritoPost)
// router.get('/carritos/:usuarioId', carro.carritoGet)


router.use("/carrito", carritoRouter);
router.use('/categoria', categorRoute)
router.post('/categoria', categorRoute)
router.put('/categoria', categorRoute)
router.delete('/categoria/:nombre', categorRoute)


router.delete('/categoria/:id',async (req,res)=>{
    const {id} = req.params;
    try{
const catId = await Categoria.findByPk(id)
if(catId) {
    await catId.destroy()
    res.send('Eliminado')
}else{
    res.send("No encontrado")
}} catch(error){
    console.log(error)
}
})

//----------------------Password-------------------------
router.use("/password", forgotPassword);
router.use("/resetPassword", resetPassword);



module.exports = router;
