const config = require('../config');
const mongoose = require('mongoose');
//const ObjectId = mongoose.Types.ObjectId;

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    kg: Number,
    precio: Number
})

const productoModel = mongoose.model('producto', productoSchema);

const create = async (data) => {
    try {
        const newProducto = new productoModel(data);
        newProducto.save();
        return newProducto;
    } catch (error) {
        throw (`No se pudo crear: ${error}`);
    }
}

const all = async () => {
    try {
        const data = await productoModel.find({})
        //console.log(data, "todos");
        return data;
    } catch (error) {
        throw (`No se pudo obtener los productos: ${error}`);
    }
}

const byId = async (id) => {
    try {
        const data = await productoModel.findById(id);
        //console.log(data, "por id");
        return data;
    } catch (error) {
        throw (`No se pudo obtener el producto: ${error}`);
    }
}

//buscar por palabra por caracteres coincidentes
const similNombre = async (nombre) => {
    try {
        const regex = new RegExp(nombre, 'i');
        const data = await productoModel.find({nombre: regex});
        console.log(data, "por simil");
        return data;
    } catch (error) {
        throw (`No se pudo obtener el producto: ${error}`);
    }    
}

const delById = async (id) => {
    try {
        const data = await productoModel.findByIdAndDelete(id);
        //console.log(data, "por id");
        return data;
    } catch (error) {
        throw (`No se pudo obtener el producto: ${error}`);
    }
}

const update = async (id, body) => {
    try {
        const data = await productoModel.findByIdAndUpdate(id, body);
        //console.log(data, "por id");
        return data;
    } catch (error) {
        throw (`No se pudo obtener el producto: ${error}`);
    }
}

module.exports = {
    create, all, byId, similNombre, delById, update
}