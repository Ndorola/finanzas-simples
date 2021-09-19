const mongoose = require('mongoose')

const gastoSchema = new mongoose.Schema({
    descripcion: {type: String},
    monto: {type: Number},
    fecha: {type: String},
    usuarioId: {type: mongoose.Types.ObjectId, ref: 'usuario'}
})    

const Gasto = mongoose.model('gasto', gastoSchema)

module.exports = Gasto