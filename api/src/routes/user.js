require("dotenv").config();
const { Router, res } = require("express");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //encriptar contraseña
const { JWT_SECRET } = process.env;
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const userRouter = Router();
const { User } = require("../db");
// Requerimos el middleware de autenticación
const { authentication } = require("../middlewares/authentication");
//const adminAuthentication = require("../middlewares/adminAuthentication");

const getDbUser = async () => {
  return await User.findAll();
};

exports.getUser = async function (req, res, next) {
  try {
    const { id } = req.query;
    let bdTotal = await getDbUser();
    // console.log(bdTotal)
    if (id) {
      let prodName = await bdTotal.filter((user) => user.id == id);
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
};
exports.register = async (req, res, next) => {
  // Validaciones de express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, errors });
  }

  // Si no hay errores, continúo
  const {
    nombre,
    usuario,
    contrasena,
    email,
    pais,
    provincia,
    direccion,
    telefono,
  } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    // Si el correo ya está registrado, devuelvo un error
    if (user) {
      return next({ status: 400, message: "Ya posee una cuenta registrada" });
    }

    // Si no, obtenemos la imágen de gravatar para su perfil
    const avatar = gravatar.url(email, {
      s: "200", //size
      r: "pg", //rate
      d: "mm",
    });

    // Creamos el usuario
    user = {
      nombre,
      usuario,
      contrasena,
      email,
      pais,
      provincia,
      direccion,
      telefono,
      avatar,
      rol: 1,
    };

    // Encriptamos la contraseña (complejidad 10)
    user.contrasena = await bcrypt.hash(contrasena, 10);

    // Creamos el nuevo usuario y lo guardamos en la DB
    try {
      user = await User.create(user);
      // console.log(user.toJSON());
    } catch (error) {
      // no se ha podido crear el usuario
      console.log(error);
    }

    // generamos el payload/body para generar el token
    const payload = {
      usuario: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 360000, //for development
      },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    next({});
  }
};

exports.postLogin = async (req, res, next) => {
  // Validaciones de express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, errors });
  }

  // Si no hay errores, continúo
  const { email, contrasena } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    // significa que el correo no es válido
    if (!user) return next({ status: 400, message: "Credenciales no validas" });

    user = user.toJSON();
    if (user.rol === "3")
      return next({ status: 403, message: "Usuario bloqueado" });

    // Teniedo el usuario, determinamos si la contraseña enviada es correcta
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    // si la contraseña es incorreta
    if (!isMatch)
      return next({ status: 400, message: "Credenciales no validas" });
    if (!email || !contrasena) {
      return next({
        status: 400,
        message: "No se han proporcionado credenciales de acceso",
      });
    }

    // si la contraseña y email son validos escribimos el payload/body
    const payload = {
      usuario: { id: user.id },
    };
    // GENERO UN TOKEN
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    next({ status: 500 });
  }
};

exports.get = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id);

    user && (user = user.toJSON());

    // le borramos la contraseña
    delete user.contrasena;

    res.json(user);
  } catch (err) {
    console.log(err);
    next({ status: 500 });
  }
};

exports.putUser =  async (req, res, next) => {
  // Validaciones de express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, errors });
  }

  // Si no hay errores, continúo
  const {
    id,
    nombre,
    usuario,
    contrasena,
    email,
    pais,
    provincia,
    direccion,
    telefono,
  } = req.body;

  if (!id) return next({ status: 400, message: "El id es Requerido" });
  let avata = gravatar.url(email, {
    s: "200", //size
    r: "pg", //rate
    d: "mm",
  });
  try {
    let password = await bcrypt.hash(contrasena, 10);
    const UserUpdate = await User.update(
      {
        nombre,
        avatar: avata,
        usuario,
        contrasena: password,
        email,
        pais,
        provincia,
        direccion,
        telefono,
      },
      {
        where: {
          id,
        },
      }
    );
    if (UserUpdate)
      return res
        .status(200)
        .json({ message: "Los Datos fueron Actualizados" });

    return res.status(203).json({ message: "Algo Sucedio" });
  } catch (error) {
    return next({});
  }
};
