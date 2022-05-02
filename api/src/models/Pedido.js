
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
      fechaCreacion: {
         type: DataTypes.DATEONLY,
         get() {
            return new Date(this.getDataValue('fechaCreacion'));
         },
         set(fechaCreacion) {
             this.setDataValue('fechaCreacion', fechaCreacion.toISOString().split('T')[0])
         }
      }
   }, {
      timestamps: false
   });

};