'use strict'
const { Carrito, CarritoDetalle } = require("../db");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;


exports.carritoPost = async function (req, res, next) {
    try {
        const { id: usuarioId } = req.usuario;
    
        const nuevoCarrito = await Carrito.create({ usuarioId });
    
        return res.status(201).json(nuevoCarrito);
    
      } catch (error) {
        console.log(error);
        return next({});
      }
}

exports.carritoGet = async function (req, res, next) {
    const { usuarioId } = req.params;
    if (!usuarioId) {
      return res.status(400).json({ message: "data are requerid" });
    }
    try {
      const carrito = await Carrito.findOne({
        include: [CarritoDetalle],
        where: { usuarioId },
      });
      if (carrito) {
        return res.status(200).json(carrito);
      } else {
        return next({ status: 404, message: "Carrito not founded" });
      }
    } catch (error) {
      console.log(error);
      return next({});
    }
}

// UPDATE PRODUCTO IN CARRITO
// Si no existe el producto en el carrito lo crea y le pone la cantidad por default o la que se le pase
// Si ya existe el producto en el carrito, cambia la cantidad anterior por la nueva cantidad