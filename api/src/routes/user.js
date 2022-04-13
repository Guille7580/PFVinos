require("dotenv").config();
const { Router, res } = require("express");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs"); //encriptar contraseña
//const { JWT_SECRET } = process.env;
//const gravatar = require("gravatar");
//const { check, validationResult } = require('express-validator');

const userRouter = Router();
const { User } = require("../db");
// Requerimos el middleware de autenticación
// const { authentication } = require("../middlewares");
// const adminAuthentication = require("../middlewares/adminAuthentication");

const getDbUser = async () => {
    return await User.findAll();
}

exports.getUser = async function (req, res, next) {
    try {
        const { id } = req.query;
        let bdTotal = await getDbUser();
        // console.log(bdTotal)
        if (id) {

            let prodName = await bdTotal.filter((user) =>
                user.id == id
            );
            prodName.length //si hay algún nombre
                ? res.status(200).send(prodName)
                : res
                    .status(404)
                    .send({ info: "Sorry, the user you are looking for is not here." });
        } else {
            res.status(200).send(bdTotal);
        }
    } catch (error) {
        next(error);
    }
}
exports.register = async function (req, res, next) {
    try {
        //Checks query.
        let {
            nombre,
            usuario,
            contrase,
            arguments, 
            email,
            pais,
            provincia,
            direccion,
            telefono,
            rol
        } = req.body;

        let emailUser = await User.findAll({
            where: { email: email }
        })

        if (emailUser.length) {
            res.status(400).send({ info: "Mail is already taken" });
            return
        }

        let userCreated = await User.create({
            nombre,
            usuario,
            contrase,
            arguments, 
            email,
            pais,
            provincia,
            direccion,
            telefono,
            rol
        });
        res.status(201).send(userCreated)
    } catch (error) {
        next({ info: error });
    }

}