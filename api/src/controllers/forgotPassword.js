const { User } = require("../db");
const bcrypt = require("bcryptjs"); //encriptar contraseña
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET , EMAIL_ADDRESS ,EMAIL_PASSWORD } = process.env

const generateRandomString = require("../Util/getRandomString")


const forgotPassword = async (req, res, next) => {
  const { email } = req.body
  console.log(email)

  if (!email) {
    return next({ status: 400, message: "Email is required" })
  }

  let temporalPassword = generateRandomString()
  console.log(temporalPassword)
  let temppasAct = await bcrypt.hash(temporalPassword , 10);

  try {
    const user = await User.findOne({ where: { email } })
    console.log(user.email)
    
    if (user) {
      try {
        await User.update({ contrasena: temppasAct }, { where: { email } })
        const transporter = nodemailer.createTransport({
                 service: "gmail",
                 auth: {
                   user: process.env.EMAIL_ADDRESS,
                   pass: process.env.EMAIL_PASSWORD,
                 },
                 tls: {
                  rejectUnauthorized: false}
        });
      
        const mailOptions = {
                 from: `${EMAIL_ADDRESS}`,
                 to: `${user.email}`,
                 subject: "Enlace para recuperar su contraseña ",
                 text: `Contraseña temporal para su cuenta de Las Moritas App . Su contraseña temporal es: ${temporalPassword} .Cambiela lo antes posible.`,
               };
          
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error("Ha ocurrido un error :", err);
            }
            res.status(200).json("El email para la recuperacion ha sido enviado");
        });

        // await sendEmail(
        //   "Recuperación de contraseña",
        //   "",
        //   false,
        //   email,
        //   `<h2>Contraseña temporal para su cuenta de Rental App</h2><div>Su contraseña temporal es: <code>${temporalPassword}</code><br>Cambiela lo antes posible.</div>`,
        // )
      } catch (error) {
        // console.log(error);
        return next({ status: 500, message: "Intentelo más tarde" })
      }
    }

    res.json({
      message: "Si el email proporcionado es correcto, le enviaremos un email",
    })
  } catch (error) {
    next(error)
  }
}




// const forgotPassword = async (req, res, next) => {
//   if (req.body.email == "") {
//     res.status(400).send({
//       message: "El mail es requerido",
//     });
//   }
//   try {
//     const user = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     const token = jwt.sign(
//       {
//         usuario: {
//           id: user.id,
//         },
//       },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     //user.update({
//     //tokenResetPassword: token,
//     //});

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_ADDRESS,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//     // const emailPort = process.env.EMAIL_PORT || 3000;

//     const mailOptions = {
//       from: `${EMAIL_ADDRESS}`,
//       to: `${user.email}`,
//       subject: "Enlace para recuperar su contraseña ",
//       text: `http://localhost:3001/resetpassword/${user.id}/${token} `,
//     };

//     transporter.sendMail(mailOptions, (err, response) => {
//       if (err) {
//         console.error("Ha ocurrido un error :", err);
//       }
//       res.status(200).json("El email para la recuperacion ha sido enviado");
//     });
//   } catch (error) {
//     //console.log(error)
//     res.status(500).json({
//       message: "Ha ocurrido un error",
//       error,
//     });
//   }
// };

module.exports = { forgotPassword };
