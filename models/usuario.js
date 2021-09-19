const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String},
    email: {type: String},
    contrasenia: {type: String},
})

const Usuario = mongoose.model('usuario', usuarioSchema)

module.exports = Usuario