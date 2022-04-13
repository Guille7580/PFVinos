const loadProductos = require("./loadProductos");
const loadCategorias = require("./loadCategorias");
const loadUsers = require("./loadUsers");

async function LoadDb() {
  try {
    await loadCategorias();
    await loadProductos();
    await loadUsers();
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = LoadDb;
