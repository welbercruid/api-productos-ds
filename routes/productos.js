const express = require('express');
const router = express.Router();
const productoControllers = require('../controllers/productos');
const productoMiddlewares = require('../middlewares/productos');

router.use(productoMiddlewares.productoLogger);

router.get('/', (req, res) => {//muestra todos
    try {
        const productos = productoControllers.mostrarProductos();
        res.status(200).json({
            mensaje: `Cantidad de productos: ${productos.length}`, productos
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', productoMiddlewares.validarId, (req, res) => {//busca por id
    const id = parseInt(req.params.id);
    const producto = productoControllers.buscarPorId(id);

    if (!producto) {//si no encuentra el id 
        res.status(404).json({
            mensaje: `No se encontró ningún producto con el ID: ${id}.`
        });
    }
    res.status(200).json(producto);
});

//buscar por coincidencia del nombre del producto
router.get('/:id/:nombre', (req, res) => {//funca
    const nombre = req.params.nombre;
    const producto = productoControllers.buscarPorNombre(nombre);

    if (producto.length === 0) {
        res.status(404).json({
            mensaje: `No se encontró ningún producto con el nombre: ${nombre}.`
        });
    }
    res.status(200).json(producto);
});

router.post('/', productoMiddlewares.validarDataProd, (req, res) => {//funca        
    try {
        const { nombre, descripcion, kg, medidas_cm} = req.body;        
        productoControllers.addProducto(nombre, descripcion, kg, medidas_cm);
        //console.log(req.body);
        res.status(201).json({
        mensaje:`El producto ${req.body.nombre} ha sido agregado.`,
        producto: req.body
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', productoMiddlewares.validarId, productoMiddlewares.validarDataProd, (req, res) => {      //creo que está
    const id = parseInt(req.params.id);    
    const producto = productoControllers.buscarPorId(id);

    if (!producto) {//si no encuentra el id 
        res.status(404).json({
            mensaje: `No se encontró ningún producto con el ID: ${id}.`
        });
    } else {    
        productoControllers.updateProd(producto, req.body);
        console.log(producto);
        res.status(200).json({
            mensaje: `Se actualizo el producto: ${producto.nombre}`, producto
        });
    }
});

router.patch('/:id', productoMiddlewares.validarId, /* productoMiddlewares.validarProp, */(req, res) => {  
    const productos = productoControllers.mostrarProductos();
    const id = parseInt(req.params.id);
    const index = productoControllers.buscarPorIndex(id);
        
    if (index === -1) {//si no encuentra el indice
        res.status(404).json({
            mensaje: `No se encontró ningún producto con el ID: ${id}.`
        });
    } else {
        productoControllers.updateProd(productos[index], req.body);
        res.status(200).json(productos[index]);
    }
});

router.delete('/:id', productoMiddlewares.validarId, (req, res) => {
    const id = parseInt(req.params.id);
    const index = productoControllers.buscarPorIndex(id);
   
    if (index === -1) {//si no encuentra el indice
        res.status(404).json({
            mensaje: `No se encontró ningún producto con el ID: ${id}.`
        });
    } else {
        productoControllers.deleteProd(index);
        res.status(200).json({
            mensaje: `Se eliminó el producto con el ID: ${id}.`
        }); 
    }
});

module.exports = router; 