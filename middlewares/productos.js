const productoLogger = (req, res, next) => { // anda
    console.log("Todo lo que pase por productos pasará por acá. /middlewares");
    next();
};

const validarId = (req, res, next) => { //anda
    if (Number.isNaN(parseInt(req.params.id))) {
        console.log(`El dato enviado no es un número (${req.params.id})`);
        return res.status(404).json({mensaje: "ID inválida"})
    } 
    console.log("middleware validarId");
    next();
}

const validarDataProd = (req, res, next) => { //anda
    const { nombre, descripcion, kg, medidas_cm, ...extraProps } = req.body;
    if (!nombre || !descripcion || !kg || !medidas_cm || !medidas_cm.largo || !medidas_cm.ancho || !medidas_cm.alto) {
        console.log(`Falta data (${req.body})`);
        return res.status(404).json({
            mensaje: "No ingresaste toda la data necesaria."
        });
    } 
    if (Object.keys(extraProps).length > 0 || Object.keys(medidas_cm).length !== 3) {
        return res.status(404).json({
            mensaje: "No se pueden agregar propiedades adicionales."
        });
    }
    console.log("middleware validarDataProd");
    next();
};

module.exports = { 
    validarId, 
    validarDataProd, 
    productoLogger
}