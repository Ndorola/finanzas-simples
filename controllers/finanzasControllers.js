const path = require('path')
const Ingreso = require('../models/ingresos')
const Gasto = require('../models/gastos')

const finanzasControllers = {

    home: (req, res) => {
        try {
            res.render('index', {
                title: 'Bienvenido!',
                loggedIn: req.session.loggedIn,
                nombre: req.session.nombre || 'desconocido'
            })
        } catch {
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    explicacion: (req, res) => {
        try {
            res.render('comofunciona', {
                title: '¿Cómo funciona?',
                loggedIn: req.session.loggedIn,
                nombre: req.session.nombre || 'desconocido'
            })
        } catch {
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    error404: (req, res) => {
        res.render('error404', {
            title: 'error404'
        })
    },

    finanzas: async (req, res) => {
        let ingresos = await Ingreso.find({usuarioId: req.session.usuarioId})
        let gastos = await Gasto.find({usuarioId: req.session.usuarioId})
        if(req.session.loggedIn) {
            return res.render('misFinanzas', {
                title: 'Mis finanzas',
                loggedIn: req.session.loggedIn,
                usuarioId: req.session.usuarioId,
                nombre: req.session.nombre || 'desconocido',
                email: req.session.email,
                usuario: req.session.usuario,
                ingresos,
                gastos,
            })
        }
        res.render('error404', {
            title: 'error404'
        })
    },

    ingresos: async (req, res) => {
        if(req.session.loggedIn) {
            try {
                const ingresos = await Ingreso.find({usuarioId: req.session.usuarioId})
                res.render('ingresos', {
                title: 'Panel ingresos',
                ingresos,
                error: null,
                editar: false,
                loggedIn: req.session.loggedIn,
                usuarioId: req.session.usuarioId,
                nombre: req.session.nombre || 'desconocido',
                email: req.session.email,
                usuario: req.session.usuario,
            })
            } catch(e) {
                console.log(e)
                res.render('error404', {
                    title: 'error404'
                })
            }
        } else {
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    registrarIngreso: async (req, res) => {
        if(!req.body.id) {
            let nuevoIngreso = new Ingreso({
                descripcion: req.body.descripcion,
                monto: req.body.monto,
                fecha: req.body.fecha,
                usuarioId: req.body.usuarioId,
            })
            try {
                await nuevoIngreso.save()
                res.redirect('/ingresos')
            } catch (e) {
                res.render('ingresos', {
                    title: 'Panel ingresos',
                    error: e,
                    loggedIn: req.session.loggedIn,
                    usuarioId: req.session.usuarioId,
                    nombre: req.session.nombre || 'desconocido',
                    email: req.session.email,
                    usuario: req.session.usuario,
                })
            }
        } else {
            try {
                const {descripcion, monto, fecha, id} = req.body
                let ingresoEditado = await Ingreso.findOneAndUpdate({_id: id}, {descripcion, monto, fecha} ,{new: true})
                console.log(ingresoEditado)
                res.redirect('/ingresos')
            } catch(e) {
                console.log(e)
                res.render('error404', {
                    title: 'error404'
                })
            }
        }
    },

    borrarIngreso: async (req, res) => {
        try {
            await Ingreso.findOneAndDelete({_id: req.params.id})
            res.redirect('/ingresos')
        } catch(e) {
            console.log(e)
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    editarIngreso: async (req, res) => {
        try {
            let ingreso = await Ingreso.findOne({_id: req.params.id})
            console.log(ingreso)
            res.render('ingresos', {
                title: 'Panel ingresos',
                error: null,
                editar: true,
                ingreso,
                loggedIn: req.session.loggedIn,
                usuarioId: req.session.usuarioId,
                nombre: req.session.nombre || 'desconocido',
                email: req.session.email,
                usuario: req.session.usuario,
            })
        } catch(e) {
            console.log(e)
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    gastos: async (req, res) => {
        if(req.session.loggedIn) {
            try {
                const gastos = await Gasto.find({usuarioId: req.session.usuarioId})
                console.log(gastos)
                res.render('gastos', {
                title: 'Panel gastos',
                gastos,
                error: null,
                editar: false,
                loggedIn: req.session.loggedIn,
                usuarioId: req.session.usuarioId,
                nombre: req.session.nombre || 'desconocido',
                email: req.session.email,
                usuario: req.session.usuario,
            })
            } catch(e) {
                console.log(e)
                res.render('error404', {
                    title: 'error404'
                })
            }
        } else {
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    registrarGasto: async (req, res) => {
        if(!req.body.id) {
            let nuevoGasto = new Gasto({
                descripcion: req.body.descripcion,
                monto: req.body.monto,
                fecha: req.body.fecha,
                usuarioId: req.body.usuarioId,
            })
            try {
                await nuevoGasto.save()
                res.redirect('/gastos')
            } catch (e) {
                res.render('gastos', {
                    title: 'Panel gastos',
                    error: e,
                    loggedIn: req.session.loggedIn,
                    usuarioId: req.session.usuarioId,
                    nombre: req.session.nombre || 'desconocido',
                    email: req.session.email,
                    usuario: req.session.usuario,
                })
            }
        } else {
            try {
                const {descripcion, monto, fecha, id} = req.body
                let gastoEditado = await Gasto.findOneAndUpdate({_id: id}, {descripcion, monto, fecha} ,{new: true})
                console.log(gastoEditado)
                res.redirect('/gastos')
            } catch(e) {
                console.log(e)
                res.render('error404', {
                    title: 'error404'
                })
            }
        }
    },

    borrarGasto: async (req, res) => {
        try {
            await Gasto.findOneAndDelete({_id: req.params.id})
            res.redirect('/gastos')
        } catch(e) {
            console.log(e)
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    editarGasto: async (req, res) => {
        try {
            let gasto = await Gasto.findOne({_id: req.params.id})
            res.render('gastos', {
                title: 'Panel gastos',
                error: null,
                editar: true,
                gasto,
                loggedIn: req.session.loggedIn,
                usuarioId: req.session.usuarioId,
                nombre: req.session.nombre || 'desconocido',
                email: req.session.email,
                usuario: req.session.usuario,
            })
        } catch(e) {
            console.log(e)
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    nuevoMes: async (req, res) => {
        if(req.session.loggedIn) {
            await Ingreso.findOneAndDelete({usuarioId: req.session.usuarioId})
            await Gasto.findOneAndDelete({usuarioId: req.session.usuarioId})
            res.render('misFinanzas', {
                title: 'Mis finanzas',
                loggedIn: req.session.loggedIn,
                usuarioId: req.session.usuarioId,
                nombre: req.session.nombre || 'desconocido',
                email: req.session.email,
                usuario: req.session.usuario,
                ingresos: null,
                gastos: null,
            })
            return redirect('/misfinanzas')
        }
        res.render('error404', {
            title: 'error404'
        })
    }
}

module.exports = finanzasControllers