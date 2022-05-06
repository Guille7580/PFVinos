const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('CarritoDetalle', {
  
    amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  }, { timestamps: false })}

