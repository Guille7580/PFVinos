
const { COMPLETADO, PENDIENTE, PAGADO, CANCELADO } = require("../data/constantes");
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Pedido', {
      usuarioId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      products:{
         type: DataTypes.ARRAY(DataTypes.STRING)
      },
      status: {
         type: DataTypes.ENUM(PENDIENTE, PAGADO, COMPLETADO, CANCELADO),
         allowNull: false,
         defaultValue: PENDIENTE
      },
      total: {
         type: DataTypes.DOUBLE,
         allowNull: false,
      },
      date: {
         type: DataTypes.STRING
      }
   }, {
      timestamps: false
   });

};