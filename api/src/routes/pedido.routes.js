const { Router } = require('express');
const { pedidoPost, getAllPedidos, getPedidosByUser, updateStatusPedido, deletePedido, statusPendiente  } = require('../controllers/controlerPedido');
const { User } = require('../db');
const pedidoRouter = Router();
const { check, validationResult } = require('express-validator');
const { authentication, adminAuthentication } = require("../middlewares");
const { PENDIENTE, COMPLETADO } = require('../data/constantes');


pedidoRouter.post("/:email", pedidoPost);
pedidoRouter.get("/all", getAllPedidos);


//pedidos por user
pedidoRouter.get('/:email',
   // authentication,
   getPedidosByUser
)

// rutas de estado pendiente para checkout

pedidoRouter.get('/status/:email',
   // authentication,
   statusPendiente
)


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

