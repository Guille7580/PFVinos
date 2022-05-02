const {  User } = require('../db')


async function putusuario (req, res, next) {
    try {
      const { nombre, usuario, email, pais, provincia, direccion,telefono, id } = req.body
  
      const UpdateUser = await User.update(
        {
            nombre: nombre,
            usuario: usuario,
            email: email,
            pais: pais,
            provincia: provincia,
            direccion : direccion,
            telefono : telefono
        },
        { where: { id } }
      )
  
      if (!UpdateUser) {
        return next({
          status: 404,
          message: 'No data found'
        })
      }
      res.json({
        message: 'Los datos se actualizaron correctamente'
      })
    } catch (error) {
      console.log(error)
      next({})
    }
  }

  module.exports = {
    putusuario
  }

  