'use strict'
const { send } = require("process");
const { Sequelize } = require("sequelize");
const { Categoria, Product } = require('../db')
const Op = Sequelize.Op;

// const mapProduct = (foundedProduct) => {
//   foundedProduct = foundedProduct.toJSON()
//   if (foundedProduct.categoriaId) {
//     delete foundedProduct.categoriaId;
//     let category = foundedProduct.Categorium.nombre;
//     foundedProduct.category = category;
//   }
//   delete foundedProduct.Categorium;

//   return foundedProduct;
// }
  
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

 
console.log("PRODID:--------------------", prodId)
  prodId ?  res.status(200).send(prodId) : res.status(404).send('no se encuentra')
} catch (error) {
  next(error)
}
}
//   let prodId = await getDbInfoById() 
//   if (id) {
//     let infoId = await prodId.filter(el => el.id == (id))
//     infoId.length? res.status(200).send(infoId):res.status(404).send('no se encuentra')
//   }
// } catch (error){
//   next(error)
// }
// }

//   const {id} = req.params
  
//   try {

//     let foundedProduct = await Product.findByPk(id, {
//       include: [
//         {
//           model: Categoria,
//           attribute: ["nombre"],
//           through: {
//             attributes: [],
//           },
//         },
//       ],
//     });
//     if(foundedProduct){ res.status(200).send(foundedProduct) }
//     else {res.status(400).send('no funciona')
//   }} catch (error) {
//     next({info: error})
//   }
// };

// exports.getAllProductosByCategory = async function (req, res, next) {
//   const { categoriaId } = req.params;

//   try {
//     let category = await Categoria.findByPk(categoriaId, {
//       attributes: ["nombre"]
//     });
   
//     if (!category) res.status(404).send('No existe la categoría especificada")
    
//       ;(cat = await Categoria.findAll({
//         where: { nombre: categoriaId },
//         include: Product
//       })),
//         cat.length
//           ? res.status(200).send(cat)
//           : res
//               .status(404)
//               .send('the mother fucking category doesnt exist!!!!!')
//     } else {
//       cat = await Categoria.findAll({
//         include: Product
//       })
//       res.send(cat)
//     }
//   } catch (error) {
//     next(error)
//   }
// }