const fs = require('node:fs');
const config = require('../config');
// const Joi = require('joi');
//                                          //falta implementar joi
// const schema = Joi.object().keys({
//     nombre: Joi.string().required(),
//     descripcion: Joi.string().required(),
//     kg: Joi.number().precision(3).required(), // 1.125
//     medidas_cm: Joi.object().keys({
//         largo: Joi.number().precision(2).required, // 10.22
//         ancho: Joi.number().precision(2).required, 
//         alto: Joi.number().precision(2).required
//     }).required(),
//     id: Joi.number().integer().min(1).required()
// });

let productos = [];

let nextId = 1;
//const generarNuevoId = () => id++;

const add = (nombre, descripcion, kg, medidas_cm/* largo, ancho, alto */) => {
    obj = {
        nombre,
        descripcion,
        kg,
        medidas_cm: {largo: medidas_cm.largo, ancho: medidas_cm.ancho, alto: medidas_cm.alto},
        id: nextId ++
    }
       
    productos.push(obj);
    fs.writeFileSync(config.DB_NAME, JSON.stringify(productos), {flag:'w+'});
}

//muestra el array de objetos
const mostrarTodos = () => productos;

//busca un producto por su key "id"
const prodId = (id) => mostrarTodos().find(prop => prop.id === id);

//buscar por index
const prodIndex = (id) => {
    const products = mostrarTodos();
    return products.findIndex(producto => producto.id === id);
};

//buscar por palabra por caracteres coincidentes
const regexNombre = (nombre) => {
    const regex = new RegExp(nombre, 'i');
    return mostrarTodos().filter(p => regex.test(p.nombre));
}

const update = (p, body) => {// asi se puede elegir solo una prop para patch y no hay que cargar todas p/ actualizar solo una
    for (let prop in body) {
        p[prop] = body[prop];
    }
    
    fs.writeFileSync(config.DB_NAME, JSON.stringify(productos), {flag:'w+'});
};

const del = (index) => {
    productos.splice(index, 1);

    fs.writeFileSync(config.DB_NAME, JSON.stringify(productos), {flag:'w+'});
};

module.exports = {
    mostrarTodos, 
    add, 
    prodId, 
    prodIndex, 
    regexNombre, 
    update, 
    del
}