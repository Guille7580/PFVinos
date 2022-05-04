const { Router } = require('express');
const { pedidoPost, changePedido, getAllPedidos, getPedidosByUser, deletePedido, statusPendiente  } = require('../controllers/controlerPedido');
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


pedidoRouter.put('/:email/changeToComplete', changePedido)


// // @access Private Admin
pedidoRouter.delete('/:id',  async (req, res, next) => {
   const  id  = req.params.id;

   const deleted = await deletePedido(id);

   if (deleted.error) return next(deleted.error);

   res.status(204).end();
})

module.exports = pedidoRouter;

