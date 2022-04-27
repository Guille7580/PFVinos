const { Categoria} = require("../db");


async function getAllCategories(req, res) {
  
  try {
    
      const ActivityAll = await Categoria.findAll({});
      res.send(ActivityAll);
    
  } catch (error) {
    res.send(error);
  }
}

module.exports = { getAllCategories };
