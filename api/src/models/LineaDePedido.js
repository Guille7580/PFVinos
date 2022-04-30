const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('LineaDePedido', {

      pedidoId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      productoId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      amount: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      total: {
         type: DataTypes.DOUBLE,
         allowNull: false,
      },
   }, {
      timestamps: false
   });
};