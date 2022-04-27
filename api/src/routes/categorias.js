const { Router } = require('express');
const { getAllCategories, categoriaPost, categoriaUpdate } = require('../controllers/categories')
const categorRoute= Router();
  
categorRoute.get('/' , getAllCategories)

categorRoute.post('/', categoriaPost)

categorRoute.put('/', categoriaUpdate)

//categorRoute.delete('/', categoriaDelete)

//categorRoute.delete('/', categoriaDeleteId)


module.exports = categorRoute
