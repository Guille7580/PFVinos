const { User, Pedido } = require("../db");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET , EMAIL_ADDRESS ,EMAIL_PASSWORD } = process.env
const {PENDIENTE, PAGADO} = require("../data/constantes")



async function emailCheckOut  (req, res, next)  {
  const { email } = req.params


  if (!email) {
    return next({ status: 400, message: "Email is required" })
  }
  try {
    const user = await User.findOne({ where: { email } })
    console.log(user)
    const info = await Pedido.findAll({
        where: {usuarioId: user.id, status: PAGADO},
           })
    console.log(JSON.stringify(info))
    if (user) {
      try {
       
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
                 subject: "Compra Viñedo Las moritas",
                 text: `Muchas gracias por tu compra. Tu pedido será enviado lo antes posible.`,
               };
          
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error("Ha ocurrido un error :", err);
            }
            res.status(200).json("El email de checkout ha sido enviado");
        });

              } catch (error) {console.log(error);
        return next({ status: 500, message: "Intentelo más tarde" })
      }
    }

    res.json({
      message: "A tu correo llegará  el resumen de la compra",
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {  emailCheckOut  };