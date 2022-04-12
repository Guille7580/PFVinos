const loadProductos = require("./loadProductos");
const loadCategorias = require("./loadCategorias");

async function LoadDb() {
  try {
    await loadCategorias();
    await loadProductos();
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = LoadDb;
