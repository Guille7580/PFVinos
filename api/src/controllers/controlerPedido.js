 

const { Pedido, User } = require("../db");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

async function pedidoPost(req, res, next) {
  try {
    const {usuarioId, products, total, date} = req.body, {email} = req.params
   console.log(req.body)
    const nuevoCarrito = await Pedido.create({ usuarioId, products, total, date, status: "PENDIENTE" });

    return res.status(201).send(nuevoCarrito);

  } catch (error) {
    console.log(error);
    return next({});
  }
}
async function getAllPedidos(req, res, next) {

  try {
     let pedidos = await Pedido.findAll()
                  // Le cambio de nombre y quito algunos campos a cada pedido
   res.json(pedidos);
     }
   catch (error) {
     console.log(error);
     return { error: {} }
  }
}

async function getPedidosByUser(req, res, next) {
   const email = req.params.email

   if (email) {
      let userId = await User.findOne({
         where: { email: email},
      })
   const info = await Pedido.findAll({
      where: {usuarioId: userId.id,},
   })

   if(info) res.send(info)
   else res.status(404).send('No hay pedidos en progreso')
}}

async function statusPendiente(req, res) {
   const email = req.params.email
   console.log(email)
   if (email) {
      let userId = await User.findOne({
         where: { email: email},
      })
   const info = await Pedido.findAll({
      where: {usuarioId: userId.id, status: 'PENDIENTE'},
   })

   if(info.length) res.send(info)
   else res.status(404).send('No tiene pedidos pendientes')
}}


async function deletePedido(id, userIdToken) {

  try {
     let pedido = await Pedido.findByPk(id);

     if (!pedido) return { error: { status: 404, message: "Ningún pedido coincide con el id proporcionado" } };

     if (pedido.pagado === true) return { error: { status: 400, message: "No puede eliminar un pedido que ya está pagado" } };

        await Pedido.destroy({ where: { id } });

     return {};
  } catch (err) {
     console.log(err);

     return { error: {} };
  }
}


async function updateStatusPedido(idPedido, newStatus) {

   try {
      await Pedido.update({
         status: newStatus
      }, {
         where: {
            id: idPedido
         }
      });

      return "Pedido actualizado correctamente";
   } catch (error) {
      console.log(error);
      return { error: {} }
   }
}

async function updateStatusPagado(idPedido, newStatus) {

   try {
      await Pedido.update({
         status: "PAGADO"
      }, {
         where: {
            id: idPedido
         }
      });

      return "Pago realizado";
   } catch (error) {
      console.log(error);
      return { error: {} }
   }
}

module.exports = {
   pedidoPost,
   getAllPedidos,
   deletePedido,
   updateStatusPedido,
   getPedidosByUser,
   statusPendiente,
   updateStatusPagado
  };