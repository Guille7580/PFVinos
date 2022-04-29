// const { Op } = require('sequelize');

// const mapPedido = async (el) => {
//    el = el.toJSON();

//    // Cambio los nombres para que sean más intuitivos
//    el.pedidoId = el.id;
//    el.totalPedido = el.total;

//    // Elimino los valores repetidos por el cambio de nombre
//    delete el.id;
//    delete el.total;

//    let productosPedidos = await LineaDePedido.findAll({
//       where: { pedidoId: el.pedidoId },
//       // Hago un inner join del cual solo requiero el title y price
//       include: {
//          model: Product,
//          attributes: ["title", "price"]
//       },
//    });

//    // Mapeo los productos pedidos para ponerle nombres más adecuados y eliminar los repetidos
//    productosPedidos = productosPedidos.map(e => {
//       e = e.toJSON();
//       e.producto = e.Product.title;
//       e.precioUnitario = e.Product.price;
//       e.pedidoId = e.id;

//       delete e.Product;
//       delete e.id;

//       return e;
//    });


//    return { ...el, productos: productosPedidos };
// };

// module.exports = {
//    createPedido: async (pedidos, userId) => {
//       // El pedido que viene por body debería tener un array pedido con un objeto que contenga un idProducto y stock

//       try {
//          // Traigo todos los productos solicitados
//          let productosPedidos = await Promise.all(pedidos.map((pedido) => {
//             return Product.findAll({
//                // Me aseguro de que al menos haya un producto del solicitado (que esté en stock)
//                attributes:
//                   ["title", "price", "stock", "id"],
//                where: {
//                   [Op.and]: [
//                      {
//                         id: pedido.productoId
//                      },
//                      {
//                         stock: {
//                            [Op.gte]: 1
//                         },
//                      }
//                   ]
//                }
//             })
//          }));

//          // Los filtro en caso de que algun producto solicitado no exista o no haya en stock
//          let productosEncontrados = productosPedidos.filter(prod => prod.length !== 0);

//          // Si ningún producto está en stock, le informo al usuario
//          if (!productosEncontrados.length) return { error: { status: 400, message: "Ya no quedan productos en stock" } };

//          productosEncontrados = productosEncontrados.map(prod => prod[0].toJSON());

//          // Ahora voy a determinar si la stock requerida de ese producto alcanza con la existente sino le entrego todo lo que hay en stock
//          let pedidoFinal = productosEncontrados.map(prod => {
//             // Hallo la stock requerida del producto
//             const stockRequerida = pedidos.find(el => parseInt(el.productoId) === prod.id).stock;
//             const stock = stockRequerida <= prod.stock ? stockRequerida : prod.stock;
//             return {
//                ...prod,
//                // Si la stock requerida es mayor a la existente, le entrego todo lo que tengo en stock
//                stock,
//                total: Math.round(stock * prod.price * 100) / 100
//             }
//          });

//          // Calculo el valor total de la compra, para ello multiplico la stock de productos que vendo por el precio del producto
//          let total = Math.round(pedidoFinal.reduce((prev, current) => (current.price * current.stock) + prev, 0) * 100) / 100;

//          // Ahora creo el pedido
//          let pedidoAux = await Pedido.create({ usuarioId: userId, total, fechaCreacion: new Date() });
//          let pedidoRealizado = pedidoAux.toJSON();

//          // Ahora creo todas las líneas de pedidos
//          await Promise.all(pedidoFinal.map((el) => {
//             // Hallo la stock de productos que hay ahora sin los vendidos en el pedido actual y actualizo el stock en la DDBB
//             const stockActual = productosEncontrados.find(bd => bd.id === el.id).stock;

//             Product.update(
//                {
//                   stock: stockActual - el.stock
//                },
//                {
//                   where: {
//                      id: el.id
//                   }
//                });

//             return LineaDePedido.create({
//                pedidoId: pedidoRealizado.id,
//                productoId: el.id,
//                stock: el.stock,
//                total: el.total
//             });
//          }));

//          return mapPedido(pedidoAux);
//       } catch (error) {
//          console.log(error);

//          return { error: {} }
//       }
//    },


//    getPedidosByUsuario: async (userId) => {
//       try {
//          const user = await User.findByPk(userId);

//          if (!user) return { error: { status: 400, message: "Usuario no válido" } };

//          let pedidos = await Pedido.findAll({
//             where: {
//                usuarioId: userId,
//             }
//          });

//          if (!pedidos.length) {
//             return { status: 404, message: "No tiene pedidos registrados" };
//          } else {
//             return await Promise.all(pedidos.map(pedido => mapPedido(pedido)));
//          }
//       } catch (error) {
//          console.log(error);
//          return { error: {} }
//       }
//    },

//    getPedidosById: async (pedidoId) => {
//       try {
//          let pedido = await Pedido.findByPk(pedidoId);

//          if (!pedido) return { error: { status: 404, message: "Pedido no encontrado" } };

//          return await mapPedido(pedido);
//       } catch (error) {
//          console.log(error);
//          return { error: {} }
//       }
//    },

//    updateStatusPedido: async (idPedido, newStatus) => {
//       try {
//          await Pedido.update({
//             status: newStatus
//          }, {
//             where: {
//                id: idPedido
//             }
//          });

//          return "Pedido actualizado correctamente";
//       } catch (error) {
//          console.log(error);
//          return { error: {} }
//       }
//    },

//    deletePedido: async (id, userIdToken) => {
//       try {
//          let pedido = await Pedido.findByPk(id);

//          if (!pedido) return { error: { status: 404, message: "Ningún pedido coincide con el id proporcionado" } };

//          pedido = pedido.toJSON();

//          if (pedido.pagado === true) return { error: { status: 400, message: "No puede eliminar un pedido que ya está pagado" } };

//          let user = await User.findByPk(userIdToken);
//          user = user.toJSON();

//          // console.log(user);

//          // Valido que sea el usuario propietario del pedido o el administrador
//          if (user.id !== pedido.usuarioId && user.rol !== "2") return { error: { status: 403, message: "No está autorizado para realizar esta acción" } };

//          // Traigo todas las líneas de pedido que pertenezcan a ese pedido para devolver los productos al stock y eliminar las lineas
//          const lineasPedido = await LineaDePedido.findAll({ where: { pedidoId: id } });
//          await Promise.all(lineasPedido.map(async (e) => {
//             // Lo paso a JSON para tener solo los valores útiles
//             e.toJSON();

//             // console.log(e);

//             // Traigo el producto para obtener su stock y luego poder devolver los productos pedidos
//             let producto = await Product.findByPk(e.productoId);
//             producto = Product.toJSON();

//             // Actualizo el producto sumandole la stock que había reservado para el pedido
//             await Product.update({
//                stock: Product.stock + e.stock
//             }, {
//                where: { id: e.productoId }
//             });

//             // Luego tengo que eliminar la línea de pedido
//             await LineaDePedido.destroy({ where: { id: e.id } });
//          }));

//          // Ya que se eliminaron todas las lineas de pedido, elimino finalmente el pedido

//          await Pedido.destroy({ where: { id } });

//          return {};
//       } catch (err) {
//          console.log(err);

//          return { error: {} };
//       }
//    }
// };

const { Pedido, User } = require("../db");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

async function pedidoPost(req, res, next) {
  try {
    const {usuarioId, productoId, title, amount, total, date} = req.body, {email} = req.params

    const nuevoCarrito = await Pedido.create({ usuarioId, productoId, title, amount, total, date, status: "PENDIENTE" });

    return res.status(201).json(nuevoCarrito);

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


module.exports = {
   pedidoPost,
   getAllPedidos
  };