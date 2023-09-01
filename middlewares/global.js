const logger = (req, res, next) => {
    console.log("Paso por el logger global");
    next();
};

module.exports = logger