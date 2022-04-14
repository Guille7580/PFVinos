const { Router } = require('express');
const { getAllCategories } = require('../controllers/categories')
const categorRoute= Router();
  
categorRoute.get('/' , getAllCategories)

module.exports = categorRoute;