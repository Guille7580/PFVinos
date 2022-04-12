const { Product, Categoria } = require('../db')
const DATA_PRODUCTS = require("../data/productos.db.js");

const loadProductos = async () => {
   try {
      let categories = await Categoria.findAll({});
      //console.log(categories);
      categories = categories.map(cat => cat.toJSON());
       //console.log(categories);
      const productosMaped = DATA_PRODUCTS.map(e => {
         const categoriaId = categories.find(cat => cat.nombre === e.category).id;
         return {
            title: e.title,
            price: e.price,
            descriptions: e.description,
            image: e.image,
            stock : 25 ,
            bodega: e.bodega,
            cepa: e.cepa,
            age: e.age,
            rate: e.rating.rate,
            count: e.rating.count,
            categoriaId,
         };
      });

      productosMaped.forEach(async (e) => {
         await Product.findOrCreate({
            where: {
               ...e
            },
         });
      });

      console.log("Productos cargados exitosamente");
   } catch (error) {
      // console.log(error);
      console.log("No ha sido posible cargar los productos en la DB");
   }
  
}

module.exports = loadProductos;