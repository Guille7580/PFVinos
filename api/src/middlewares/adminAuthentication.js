const { User } = require('../db');

module.exports = async (req, res, next) => {
   try {
      let user = await User.findByPk(req.user.id);
      user = user.toJSON()

      if (user.rol !== "2") {
         return next({
            status: 403,
            message: 'Acceso denegado'
         }
         );
      }

      next();
   } catch (error) {
      console.log(error);
      next({ status: 500 });
   }
}