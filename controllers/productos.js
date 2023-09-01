const userModels = require('../models/productos');

const mostrarProductos = () => userModels.mostrarTodos();

const buscarPorId = (id) => userModels.prodId(id);

const buscarPorIndex = (id) => userModels.prodIndex(id);

const buscarPorNombre = (nombre) => userModels.regexNombre(nombre);

const addProducto = (nombre, descripcion, kg, medidas_cm/* , largo, ancho, alto */) => userModels.add(nombre, descripcion, kg, medidas_cm/* , largo, ancho, alto */);

const updateProd = (p, body) => userModels.update(p, body);

const deleteProd = (index) => userModels.del(index);

module.exports = {
    mostrarProductos, 
    buscarPorId, 
    buscarPorIndex, 
    buscarPorNombre,  
    addProducto, 
    updateProd, 
    deleteProd
}