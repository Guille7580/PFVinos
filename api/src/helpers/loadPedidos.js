const { createPedido } = require('../controllers/controlerPedido');
const DATA_PEDIDOS = require("../data/pedidos.db");
console.log(DATA_PEDIDOS)
const { Pedido } = require('../db')

const loadPedidos = async () => {
   try {
      const pedidosMaped =await Promise.all(DATA_PEDIDOS.map(async (e) => {
        return {
           usuarioId:e.usuarioId, 
           productoId: e.productoId, 
           title: e.title, 
           amount: e.amount, 
           total: e.total, 
           date: e.date};
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