const { User } = require("../db");
const bcrypt = require("bcryptjs"); //encriptar contraseña
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET , EMAIL_ADDRESS ,EMAIL_PASSWORD } = process.env

const generateRandomString = require("../Util/getRandomString")

const forgotPassword = async (req, res, next) => {
  const { email } = req.params


  if (!email) {
    return next({ status: 400, message: "Email is required" })
  }

  let temporalPassword = generateRandomString()
  console.log(temporalPassword)
  let temppasAct = await bcrypt.hash(temporalPassword , 10);

  try {
    const user = await User.findOne({ where: { email } })
  
    
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
                 subject: "Contraseña de recuperacion",
                 text: `Contraseña temporal para su cuenta de Las Moritas App . Su contraseña temporal es:   ${temporalPassword}  .Cambiela lo antes posible.`,
               };
          
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error("Ha ocurrido un error :", err);
            }
            res.status(200).json("El email para la recuperacion ha sido enviado");
        });

              } catch (error) {console.log(error);
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

module.exports = { forgotPassword };
