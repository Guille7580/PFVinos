
const { COMPLETADO, PENDIENTE } = require("../data/constantes");
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Pedido', {
      usuarioId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
       productoId:{
         type: DataTypes.INTEGER,
       },
      amount:{
         type: DataTypes.INTEGER,
      },
       title: {
         type: DataTypes.STRING,
         allowNull: true
       },
      status: {
         type: DataTypes.ENUM(PENDIENTE, COMPLETADO),
         allowNull: false,
         defaultValue: PENDIENTE
      },
      pagado: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },
      total: {
         type: DataTypes.DOUBLE,
         allowNull: false,
      },
      fechaCreacion: {
         type: DataTypes.DATE,
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