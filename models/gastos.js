const mongoose = require('mongoose')

const gastoSchema = new mongoose.Schema({
    tipo: {type: String},
    descripcion: {type: String},
    monto: {type: Number},
    fecha: {type: Date},
    usuarioId: {type: mongoose.Types.ObjectId, ref: 'usuario'}
})    

const Gasto = mongoose.model('gasto', gastoSchema)

module.exports = Gasto