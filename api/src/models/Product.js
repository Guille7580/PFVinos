const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    descriptions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bodega: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cepa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    }
  })
}
