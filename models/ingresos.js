const mongoose = require('mongoose')

const ingresoSchema = new mongoose.Schema({
    categoria: {type: String},
    descripcion: {type: String},
    monto: {type: Number},
    fecha: {type: Date},
    usuarioId: {type: mongoose.Types.ObjectId, ref: 'usuario'}
})    

const Ingreso = mongoose.model('ingreso', ingresoSchema)

module.exports = Ingreso