const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   // defino el modelo
  sequelize.define('LineaDePedido', {
      pedidoId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      productoId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      cantidad: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      total: {
         type: DataTypes.DOUBLE,
         allowNull: false,
      },
   }, {
      timestamps: false
   })};
