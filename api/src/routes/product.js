'use strict'
const { send } = require("process");
const { Sequelize } = require("sequelize");
const { Categoria, Product } = require('../db')
const Op = Sequelize.Op;

 const mapProduct = (foundedProduct) => {
   foundedProduct = foundedProduct.toJSON()
  if (foundedProduct.categoriaId) {
    delete foundedProduct.categoriaId;
    let category = foundedProduct.Categorium.nombre;
    foundedProduct.category = category;
  }
  delete foundedProduct.Categorium;

  return foundedProduct;
 }
  
exports.getAllProducts = async function (req, res, next) {
    try {
        const { title } = req.query
        
        if(!title) {
            let allProducts = await Product.findAll({include: Categoria});
            
            res.status(200).send( allProducts )

        } else {
            const ProductQuery = await Product.findAll({
              where: {
                title: {
                  [Op.iLike]: `%${title}%`
                },
              },
              include: Categoria
            });
            console.log(ProductQuery)
            if (ProductQuery.length === 0) {
              console.log("salio mal")
              const error = [
             `No se encuentra ningun Producto con el nombre '${title}'`
              ]
              return res.json(error)
                
              }
              ProductQuery.map(prod => mapProduct(prod));
              res.status(200).send( ProductQuery);
            }    
    } catch(error) {
        next({info: error})
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