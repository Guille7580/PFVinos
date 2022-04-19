const loadProductos = require("./loadProductos");
const loadCategorias = require("./loadCategorias");
const loadUser = require("./loadUsers");

async function LoadDb() {
  try {
    await loadCategorias();
    await loadProductos();
    await loadUser();
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = LoadDb;
