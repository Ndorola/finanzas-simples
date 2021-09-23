const mongoose = require('mongoose')

const ahorroSchema = new mongoose.Schema({
    categoria: {type: String},
    descripcion: {type: String},
    monto: {type: Number},
    fecha: {type: String},
    usuarioId: {type: mongoose.Types.ObjectId, ref: 'usuario'}
})    

const Ahorro = mongoose.model('ahorro', ahorroSchema)

module.exports = Ahorro