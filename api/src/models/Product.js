const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    descriptions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bodega: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cepa: {
    type: DataTypes.TEXT,
    allowNull: true
  },
   year: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  rate: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
})
}

