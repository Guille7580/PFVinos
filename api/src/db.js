require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, ENVIRONMENT, DB_NAME, DATABASE_URL
} = process.env;


const URL = ENVIRONMENT === "development" ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` : DATABASE_URL;
//lpm

const options = ENVIRONMENT === "development" ? {
  logging: false,
  native: false,
} : {
  logging: false,
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
};

const sequelize = new Sequelize(URL, options);
const basename = path.basename(__filename);
const modelDefiners = [];


// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize, DataTypes));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
let models = Object.fromEntries(capsEntries);
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize.models = models;

// En sequelize.models están todos los modelos importados como propiedades 
// Para relacionarlos hacemos un destructuring
const { Product, Categoria, User, Pedido, Carrito, LineaDePedido, CarritoDetalle } = sequelize.models;

 Product.belongsTo(Categoria, {
  sourceKey: 'id',
  foreignKey: 'categoriaId'
});
 Categoria.hasMany(Product, {
  sourceKey: 'id',
  foreignKey: 'categoriaId'
});

User.hasMany(Pedido, {
  sourceKey: 'id',
  foreignKey: 'usuarioId'
});

Carrito.belongsTo(User, {
  sourceKey: "id",
  foreignKey: "usuarioId",
});
// Relacionando con CarritoDetalle (productos)  (1:m)
Carrito.hasMany(CarritoDetalle, {
  sourceKey: "id",
  foreignKey: "carritoId",
});

CarritoDetalle.belongsTo(Product, {
  sourceKey: "id",
  foreignKey: "productoId",
});   

LineaDePedido.belongsTo(Pedido, {
  sourceKey: 'id',
  foreignKey: 'pedidoId'
});

// Relacionando LineaDePedido con Producto 1:m
LineaDePedido.belongsTo(Product, {
  sourceKey: 'id',
  foreignKey: 'productoId'
});
Pedido.hasMany(LineaDePedido, {
  sourceKey: 'id',
  foreignKey: 'pedidoId'
});

// Relacionando Pedido y Usuario
Pedido.belongsTo(User, {
  sourceKey: 'id',
  foreignKey: 'usuarioId'
});

module.exports = {
  ...sequelize.models,
   // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
