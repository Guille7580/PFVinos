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
const authentication = require("../middlewares/authentication");
const adminAuthentication = require("../middlewares/adminAuthentication");

const getDbUser = async () => {
  return await User.findAll();
};

userRouter.post(
  "/register",
  [
    check("nombre", 'Incluya un "nombre" valido')
      .isString()
      .trim()
      .not()
      .isEmpty(),
    check("usuario", 'Incluya un "usuario" valido')
      .isString()
      .trim()
      .not()
      .isEmpty(),
    check("contrasena", "Incluya una contraseña válida")
      .isString()
      .trim()
      .not()
      .isEmpty(),
    check("email", "Incluya un email válido").isEmail().exists(),
  ],
  async (req, res, next) => {
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
  }
);

userRouter.post('/login', [
  check("email", "Incluya un email válido").isEmail().exists(),
  check("contrasena", "Incluya una contraseña válida").isString().exists(),
], async (req, res, next) => {
  // Validaciones de express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, errors });
  }

  // Si no hay errores, continúo
  const { email, contrasena } = req.body;
  console.log(email, contrasena)

  try {
    const user = await User.findAll({ where: { email: email}});

    // Si el correo no existe en la db, mando un 404
    if (!user.length) return next({ status: 404, message: "Correo no válido." });

    if (user[0].rol === '3') return next({ status: 403, message: "Usuario bloqueado" });

    // Teniedo el usuario, determinamos si la contraseña enviada es correcta
    const isMatch = await bcrypt.compare(contrasena, user[0].contrasena);

    // Si la contraseña es incorreta
    if (!isMatch) return next({ status: 400, message: "Contraseña no valida." });

    // El no existe correo o contraseña
    if (!email || !contrasena) {
      return next({
        status: 400,
        message: "No se han proporcionado credenciales de acceso",
      });
    }

    // si la contraseña y email son validos escribimos el payload/body
    const payload = {
      usuario: { id: user[0].id },
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
  } catch (error) {
    console.log(error);
    next({ status: 500 });
  }
})


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
    const users = await User.findAll({
      attributes: { exclude: ["contrasena"] },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    next({});
  }
});

userRouter.get("/:email", async (req, res, next) => {
  const {email}= req.params
  console.log(email)
  try {
    let user = await User.findOne({ where: { email } });
    res.json(user);
  } catch (error) {
    console.log(error);
    next({});
  }
});

userRouter.put(
  "/block/:userId",
  authentication,
  adminAuthentication,
  async (req, res, next) => {
    try {
      await User.update({ rol: "3" }, { where: { id: req.params.userId } });

      res.end();
    } catch (error) {
      cosole.log(error);
      return next({
        status: 500,
        message: "No se ha podido bloquear al usuario",
      });
    }
  }
);

userRouter.put(
  "/unlock/:userId",
  authentication,
  adminAuthentication,
  async (req, res, next) => {
    try {
      await User.update({ rol: "1" }, { where: { id: req.params.userId } });

      res.end();
    } catch (error) {
      cosole.log(error);
      return next({
        status: 500,
        message: "No se ha podido desbloquear al usuario",
      });
    }
  }
);

//cambio de rol de usuario a admin

userRouter.put(
  "/userAdmin/:email",
  // authentication,
  // adminAuthentication,
    async (req, res, next) => {
        console.log('desde ruta', req.params)
        console.log(req.params.email)
        try {
            await User.update({ rol: "2" }, { where: { email: req.params.email } });
            res.end(`Usuario ${req.params.email} cambio a administrador`);
    } catch (error) {
      console.log(error);
            return next({ status: 500, message: `Usuario ${req.params.email} no puede ser administrador` });
    }
  }
);

//userRouter.delete('/:email', async (req, res) => {
//    const { email } = req.params;
//    console.log(req.param.email)
//    console.log(email)
//  const user = await User.findOne({ where: { email } });
//  if (user) {
//      await user.destroy();

//      res.send('The user has been deleted successfully');
//  } else {
//      res.send('The user does not exist');
//  }
//});

userRouter.delete('/:email', async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (user) {
        await user.destroy();

        res.send('The user has been deleted successfully');
    } else {
        res.send('The user does not exist');
    }
});

/////Editar info user desde USUARIO//////////////////
userRouter.put('/:email/update', async (req, res) => {
  const {        
    pais,
    contrasena,
    provincia,
    direccion,
    telefono,
  } = req.body, {email} = req.params
//probando
  try{
      const user = await User.findOne({where: {email}})
      
      if(contrasena === user.contrasena){
          if(telefono) user.telefono = telefono
          if(direccion) user.direccion = direccion
          if(pais) user.pais = pais
          if(provincia) user.provincia = provincia
          if(contrasena) user.contrasena = contrasena
          await user.save()
          res.send('Update user')
      }
      else res.send('The password that you entered is incorrect ')
  }
  catch {
      res.status(500).send('INVALID EMAIL')
  }
})

userRouter.post('/admin/userRegister',  [
  check("nombre", 'Incluya un "nombre" valido')
    .isString()
    .trim()
    .not()
    .isEmpty(),
  check("usuario", 'Incluya un "usuario" valido')
    .isString()
    .trim()
    .not()
    .isEmpty(),
  check("contrasena", "Incluya una contraseña válida")
    .isString()
    .trim()
    .not()
    .isEmpty(),
  check("email", "Incluya un email válido").isEmail().exists(),
], async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, errors });
  }
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
    let userEmail = await User.findOne({ where: { email } });

    // Si el correo ya está registrado, devuelvo un error
    if (userEmail) {
      return next({ status: 400, message: "Ya posee una cuenta registrada" });
    }
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", //rate
        d: "mm",
      });
const user = await User.create({nombre, usuario, contrasena,email, pais, provincia, direccion, telefono,avatar, rol:1})

            // Creamos el nuevo usuario y lo guardamos en la DB
            
            res.status(200).send("Usuario creado")
              // console.log(user.toJSON());
            } catch (error) {
              // no se ha podido crear el usuario
              console.log(error);
            }
      
  })

/////////////////////////////RECUPERAR CONTRASE;A////////////////////

// userRouter.post('/:email/forgotPassword/:token', async (req, res) => {
//   const {email, token} = req.params
//     const user = await User.findOne({where: {email}})
//   if(user){
//       const mailOptions = {
//           from: 'latcom@gmail.com',
//           to: email,
//           subject: 'Recuperar contraseña',
//           html: `<h1>Recuperar contraseña</h1>
//           <p>Hola ${user.name} ${user.lastname}</p>
//           <p>Para recuperar tu contraseña ingresa al siguiente link:</p>
//           <a href="http://localhost:3000/change/${token}">Reset your Password</a>
//           `
//       };
//       transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//               console.log(error);
//           } else {
//               console.log('Email sent: ' + info.response);
//           }
//       });
//       res.send('El mail ha sido enviado')
//   } else{
//       res.status(404).send('El usuario no ha sido encontrado')
//   }
// })

module.exports = userRouter;
