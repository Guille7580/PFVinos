const { DataTypes, DatabaseError } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('Payment', {
    status:{  
      type: DataTypes.STRING,
      allowNull: false
  },
  payment_id:{
      type: DataTypes.STRING,
      defaultValue: ""
    },
  payment_status:{
      type: DataTypes.STRING,
      defaultValue: ""
  },
  merchant_order_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0
  },
  cartId:{
    type: DataTypes.STRING,
  }
  })
}