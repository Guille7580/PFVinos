const { createPedido } = require('../controllers/controlerPedido');
const DATA_PEDIDOS = require("../data/pedido");
console.log(DATA_PEDIDOS)

const loadCategorias = async () => {
   try {
      await Promise.all(DATA_PEDIDOS.map(async (e) => {
         await createPedido(e.pedidos, e.usuarioId);
      }));

      console.log("Pedidos cargados exitosamente");
   } catch (error) {
      console.log(error.message);
      console.log("No ha sido posible cargar los pedidos en la DB");
   }
}


module.exports = loadCategorias;