'use strict'
const { Sequelize } = require("sequelize");
const { Categoria, Product } = require('../db')
const Op = Sequelize.Op;

// const getDbInfo = async () => {
//     return await Product.findAll({
//       include: {
//         model: Category,
//         attributes: ['name'],
//         through: {
//           attributes: []
//         }
//       }
//     })
//   }
  
//   const getDbInfoById = async (id) => {
//     return await Product.findAll({
//       where: {
//         id: id
//       },
//       include: {
//         model: Category,
//         attributes: ['name'],
//         through: {
//           attributes: []
//         }
//       }
//     })
//   }
  
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
            if (!ProductQuery[0]) {
                return {
                  error: {
                    status: 404,
                    message: `No se encuentra ningun Producto con el nombre '${title}'`
                  }
                };
              }
              ProductQuery.map(prod => mapProduct(prod));
              res.status(200).send( ProductQuery);
            }    
    } catch(error) {
        next({info: error})
    }
}