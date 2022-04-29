const loadProductos = require("./loadProductos");
const loadCategorias = require("./loadCategorias");
const loadUser = require("./loadUsers");
const loadPedidos = require("./loadPedidos");

async function LoadDb() {
  try {
    await loadCategorias();
    await loadProductos();
    await loadUser();
    await loadPedidos();
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = LoadDb;
