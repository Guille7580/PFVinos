const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { errorHandler, error404 } = require('./middlewares/index.js');
const { CORS_URL } = process.env;

require('./db.js');

const server = express();
const cors = require('cors')

server.name = 'API';
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
// Configuración CORS

// CORS_URL poner para que no haya problemas en linea 22
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers-Origin, Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use('*', error404);
server.use(errorHandler);

module.exports = server;
