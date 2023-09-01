require('dotenv').config();//llama a los valores de process.env

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    DB_NAME: process.env.DB_NAME || '',
}