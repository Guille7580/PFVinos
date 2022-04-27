const { Router } = require('express');
const { getAllCategories, categoriaPost, categoriaDelete, categoriaUpdate } = require('../controllers/categories')
const categorRoute= Router();
  
categorRoute.get('/' , getAllCategories)

categorRoute.post('/', categoriaPost)

categorRoute.put('/', categoriaUpdate)

categorRoute.delete('/', categoriaDelete)


module.exports = categorRoute;