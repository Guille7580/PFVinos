const { User } = require("../db");
const bcrypt = require("bcryptjs"); //encriptar contraseña
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env


const ResetPassword = async (req, res, next) => {
  const {id , contrasena, email } = req.body.userForm
  console.log(email)

  if (!email) {
    return next({ status: 400, message: "Email is required" })
  }

  
  let temppasAct = await bcrypt.hash(contrasena , 10);

  try {
    const user = await User.findOne({ where: { id } })
    console.log(user.email)
    
    if (user) {
      try {
        await User.update({ contrasena: temppasAct }, { where: { email } })
        
            res.status(200).json("contraseña actualizada");
      }catch (error) {console.log(error);
        return next({ status: 500, message: "Intentelo más tarde" })
      }
    }

    res.json({
      message: "Contraseña actualizada correctamente",
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { ResetPassword };
