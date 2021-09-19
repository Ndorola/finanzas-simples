const mongoose = require('mongoose')

const ingresoSchema = new mongoose.Schema({
    descripcion: {type: String},
    monto: {type: Number},
    fecha: {type: String},
    usuarioId: {type: mongoose.Types.ObjectId, ref: 'usuario'}
})    

const Ingreso = mongoose.model('ingreso', ingresoSchema)

module.exports = Ingreso