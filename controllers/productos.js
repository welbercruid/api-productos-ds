const productoModel = require('../models/productos');

const crearProducto = async (req, res) => {
    try {
        let producto = await productoModel.create(req.body);
        //console.log(producto);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json("Error al crear el producto.");
    }
};

const getAll = async (req, res) => {
    try {
        const productos = await productoModel.all();
        res.status(201).json({mensaje: `Cantidad de productos: ${productos.length}`, productos});
    } catch (error) {
        res.status(500).json("Error al mostrar todos.");
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params
        const producto = await productoModel.byId(id);
        //console.log(producto, "por ID");
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json("Error al buscar.");
    }
}

const getSimil = async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const producto = await productoModel.similNombre(nombre);
        //console.log(producto);
        if (producto.length === 0) {
            res.status(404).json({
                mensaje: `No se encontró ninguna coincidencia con "${nombre}".`
            });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json("Error al buscar.");
    }
}

const delProductById = async (req, res) => {
    try {
        const {id} = req.params
        const producto = await productoModel.byId(id);
        if (!producto) {
            return res.status(404).json({
                mensaje: `No se encontró ningún producto con el ID: ${id}.`
            });
        }
        //console.log(producto, "por ID");
        await productoModel.delById(id);
        res.status(200).json({
             mensaje: `Se eliminó el producto con el ID: ${id}.`
        }); 
    } catch (error) {
        res.status(500).json("Error al buscar.");
    }
}

const updateProd = async (req, res) => {
    try {
        const {id} = req.params;
        const producto = await productoModel.byId(id);
        if (!producto) {
            return res.status(404).json({
                mensaje: `No se encontró ningún producto con el ID: ${id}.`
            });
        } else {
        const newProd = await productoModel.update(id, req.body, {new: true});
        res.status(200).json({
             mensaje: `Se actualizó el producto ${newProd.nombre}.`
        })}; 
    } catch (error) {
        res.status(500).json("Error al buscar.");
    }
}

// router.put('/:id', productoMiddlewares.validarId, productoMiddlewares.validarDataProd, (req, res) => {      //creo que está
//     const id = parseInt(req.params.id);    
//     const producto = productoControllers.buscarPorId(id);

//     if (!producto) {//si no encuentra el id 
//         res.status(404).json({
//             mensaje: `No se encontró ningún producto con el ID: ${id}.`
//         });
//     } else {    
//         productoControllers.updateProd(producto, req.body);
//         console.log(producto);
//         res.status(200).json({
//             mensaje: `Se actualizo el producto: ${producto.nombre}`, producto
//         });
//     }
// });

module.exports = {
    crearProducto, getAll, getProductById, getSimil, delProductById, updateProd
}