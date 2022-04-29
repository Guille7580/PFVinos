const { Router } = require('express');
const { pedidoPost, getAllPedidos, getPedidosByUsuario, createPedido, updateStatusPedido, deletePedido, getPedidosById } = require('../controllers/controlerPedido');
const { User } = require('../db');
const pedidoRouter = Router();
const { check, validationResult } = require('express-validator');
const { authentication, adminAuthentication } = require("../middlewares");
const { PENDIENTE, COMPLETADO } = require('../data/constantes');


pedidoRouter.post("/:email", pedidoPost);
pedidoRouter.get("/all", getAllPedidos);

// // @route GET pedidos/user/:userId
// // @desc Obtener todos los pedidos que ha realizado un usuario
// // @access Private
// pedidoRouter.get('/user/:userId',
//    authentication,
//    async (req, res, next) => {
//       const { userId } = req.params;

//       // Traigo el usuario que me proporcionó el token
//       let user = await Usuario.findByPk(req.usuario.id);
//       user = user.toJSON();

//       // Le permito el acceso si el usuario es el propietario del token o es admin
//       if (req.usuario.id === parseInt(userId) || user.rol == "2") {
//          let get = await getPedidosByUsuario(userId);
//          if (get.error) return next(get.error);
//          return res.json(get);
//       }

//       next({ status: 403, message: "No está autorizado para esta acción" });
//    }
// )

// // FALTA AÑADIR SEGURIDAD
// // @route GET pedidos/pedidoId
// // @desc Obtener un pedido por id
// // @access Private
// pedidoRouter.get('/:pedidoId',
//    authentication,
//    async (req, res, next) => {
//       const { pedidoId } = req.params;

//       let get = await getPedidosById(pedidoId);
//       if (get.error) return next(get.error);

//       return res.json(get);
//    }
// )


// // @route POST pedidos/
// // @desc Realizar un pedido
// // @access Private
// pedidoRouter.post('/', [
//    check('pedidos', 'El campo "pedidos" es requerido y debe ser un array con la forma [{productoId: 1, amount: 2}]').isArray({ min: 1 }).custom(pedidos => {
//       let res;
//       res = pedidos.filter(e => {
//          return (typeof e !== "object") || !e.productoId || !e.amount;
//       })

//       return res.length === 0;
//    })
// ],
//    authentication,
//    async (req, res, next) => {
//       // Validaciones de express-validator
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//          return next({ status: 400, errors });
//       }

//       // Si no hay errores, continúo
//       const { pedidos } = req.body;

//       if (pedidos) {
//          let get = await createPedido(pedidos, req.usuario.id);

//          if (get.error) return next(get.error);

//          return res.json(get);
//       }

//       res.status(400).end();
//    }
// );


// // @route PUT pedidos/:idPedido
// // @desc Actualizar el estado de un pedido
// // @access Private Admin
pedidoRouter.put('/:pedidoId', [
   check('status', `El campo "status" es requerido y debe ser igual a ${PENDIENTE} o ${COMPLETADO}`).isString().trim().custom(status =>
      [PENDIENTE, COMPLETADO].includes(status)
   ),
],
   // authentication,
   // adminAuthentication,
   async (req, res, next) => {
      // Validaciones de express-validator
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return next({ status: 400, errors });
      }

      // Si no hay errores, continúo
      const { pedidoId } = req.params;
      const { status } = req.body;

      let get = await updateStatusPedido(pedidoId, status);

      if (get.error) return next(get.error);

      return res.json(get);
   }
);

// // @access Private Admin
pedidoRouter.delete('/:id',  async (req, res, next) => {
   const  id  = req.params.id;

   const deleted = await deletePedido(id);

   if (deleted.error) return next(deleted.error);

   res.status(204).end();
})

module.exports = pedidoRouter;

