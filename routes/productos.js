const express = require('express');
const router = express.Router();
const productoControllers = require('../controllers/productos');
const productoMiddlewares = require('../middlewares/productos');

router.use(productoMiddlewares.productoLogger);

router.post('/', productoMiddlewares.validarDataProd, productoControllers.crearProducto);
router.get('/', productoControllers.getAll);
router.get('/:id', productoMiddlewares.validarId, productoControllers.getProductById);
router.get('/:id/:nombre', productoControllers.getSimil); //buscar por coincidencia del nombre del producto
router.patch('/:id', productoMiddlewares.validarId, productoMiddlewares.validarDataProd, productoControllers.updateProd);
router.delete('/:id', productoMiddlewares.validarId, productoControllers.delProductById);

module.exports = router; 

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