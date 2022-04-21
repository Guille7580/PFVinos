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
const  authentication  = require("../middlewares/authentication");
const adminAuthentication = require("../middlewares/adminAuthentication")

const getDbUser = async () => {
  return await User.findAll();
};

userRouter.post("/register", [
  check('nombre', 'Incluya un "nombre" valido').isString().trim().not().isEmpty(),
  check('usuario', 'Incluya un "usuario" valido').isString().trim().not().isEmpty(),
  check('contrasena', 'Incluya una contraseña válida').isString().trim().not().isEmpty(),
  check('email', 'Incluya un email válido').isEmail().exists(),
  
],  async (req, res, next) => {
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
});

userRouter.post("/login", [
  check('email', 'Incluya un email válido').isEmail().exists(),
  check('contrasena', 'Incluya una contraseña válida').isString().exists()
],  async (req, res, next) => {
  // Validaciones de express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, errors });
  }

  // Si no hay errores, continúo
  const { email, contrasena } = req.body;

  try {
    let user = await User.findOne({ where: { email, contrasena } });

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
});

userRouter.get("/", authentication, async (req, res, next) => {
  try {
    let user = await User.findByPk(req.usuario.id);

    user && (user = user.toJSON());

    // le borramos la contraseña
    delete user.contrasena;

    res.json(user);
  } catch (err) {
    console.log(err);
    next({ status: 500 });
  }
});

userRouter.get("/all", async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['contrasena'] } });

    res.json(users);
  } catch (error) {
    console.log(error);
    next({});
  }
});

userRouter.put("/block/:userId", authentication, adminAuthentication, async (req, res, next) => {
  try {
    await User.update({ rol: "3" }, { where: { id: req.params.userId } });

    res.end();
  } catch (error) {
    cosole.log(error);
    return next({ status: 500, message: "No se ha podido bloquear al usuario" });
  }
});

userRouter.put("/unlock/:userId", authentication, adminAuthentication, async (req, res, next) => {
  try {
    await User.update({ rol: "1" }, { where: { id: req.params.userId } });

    res.end();
  } catch (error) {
    cosole.log(error);
    return next({ status: 500, message: "No se ha podido desbloquear al usuario" });
  }
});

//cambio de rol de usuario a admin

userRouter.put("/userAdmin/:userId", authentication, adminAuthentication, async (req, res, next) => {
  try {
    await User.update({ rol: "2" }, { where: { id: req.params.userId } });

    res.end();
  } catch (error) {
    cosole.log(error);
    return next({ status: 500, message: "No puede ser administrador" });
  }
});

module.exports = userRouter;
