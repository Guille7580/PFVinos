const { createPedido } = require('../controllers/controlerPedido');
const DATA_PEDIDOS = require("../data/pedidos.db");
const { Pedido } = require('../db')

const loadPedidos = async () => {
   try {
      const pedidosMaped =await Promise.all(DATA_PEDIDOS.map(async (e) => {
        return {
           usuarioId:e.usuarioId, 
           products: e.products,  
           total: e.total, 
           date: e.date,
           status: e.status};
      }));
      await Promise.all(pedidosMaped.map(async (e) => {
         const pedido = await Pedido.findOne({ where: { usuarioId:e.usuarioId } });
         !pedido && await Pedido.create({
            ...e
         })
      }))

      console.log("Pedidos cargados exitosamente");
   } catch (error) {
      console.log(error.message);
      console.log("No ha sido posible cargar los pedidos en la DB");
   }
}

module.exports = loadPedidos;