'use strict'
const { send } = require("process");
const { Sequelize } = require("sequelize");
const { Categoria, Product } = require('../db')
const Op = Sequelize.Op;

const getProdDB = async () => {
  return await Product.findAll({
    include:
     Categoria
      })
}
 
exports.getAllProducts = async function (req, res, next) {
   
       const { title } = req.query
       let ProductDB = await getProdDB()
try{

       if(title) {
           const ProductQuery = await Product.findAll({
             where: {
               title: {
                 [Op.iLike]: `%${title}%`
               },
             },
             include: Categoria
           });
           
           ProductQuery[0] ?               
            res.status(200).send(ProductQuery)
           : res.status(404).send("No existe el producto");
       } else {
         res.status(201).send(ProductDB);
       }
     } catch (error) {
       next(error);
     }
}

exports.getProductById = async function (req, res, next) {
 const id = req.params.id
 try {
   let prodId = await Product.findByPk(id, {
     include: {
       model: Categoria,
       required: false,
       attributes: ["nombre"]
     }
   })
 prodId ?  res.status(200).send(prodId) : res.status(404).send('no se encuentra')
 } catch (error) {
 next(error)
 }
}

exports.postProduct = async function (req, res, next) {
    const { title, price, descriptions, image, stock, bodega, cepa, age, category } = req.body

    try {
        let exist = await Product.findOne({ where: { title } });

        if (exist)
            return { error: { status: 400, message: `Ya existe un producto con ese nombre: '${title}'` } };

        let createProduct = await Product.create({
            title,
            price,
            descriptions,
            categoriaId: category,
            image,
            stock,
            bodega,
            cepa,
            age
        });

        res.status(200).send(createProduct)
    }

    catch (error) { next(error) }
}