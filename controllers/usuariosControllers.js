const path = require('path')
const Usuario = require('../models/usuario')
const bcryptjs = require ('bcryptjs')
// 564650627484-9ss2jgh1m6h2rlooums1eq23kcrlh8f5.apps.googleusercontent.com

const usuariosControllers = {

    iniciarSesion: (req, res) => {
        try {
            res.render('iniciarSesion', {
                title: 'Iniciar sesion',
                error: null,
                loggedIn: req.session.loggedIn,
                nombre: req.session.nombre || 'desconocido',
                usuario: null
            })
        } catch {
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    ingresar: async (req, res) => {
        const {email, contrasenia} = req.body
        try {
            let usuarioRegistrado = await Usuario.findOne({email})
            if(bcryptjs.compareSync(contrasenia, usuarioRegistrado.contrasenia)) {
                req.session.loggedIn = true,
                req.session.usuarioId = usuarioRegistrado._id,
                req.session.nombre = usuarioRegistrado.nombre,
                req.session.email = usuarioRegistrado.email,
                req.session.usuario = usuarioRegistrado
                return res.redirect('/misfinanzas')
            } else {
                res.render('iniciarSesion', {
                    title: 'Iniciar sesion',
                    error: 'Usuario o contraseña errónea',
                    loggedIn: req.session.loggedIn,
                    nombre: req.session.nombre || 'desconocido',
                    usuario: null
                })
            }
        } catch(e) {
            console.log(e)
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    registrarSesion: (req, res) => {
        try {
            res.render('registrarse', {
                title: 'Registrarse',
                error: null,
                loggedIn: req.session.loggedIn,
                nombre: req.session.nombre || 'desconocido',
                usuario: null
            })
        } catch {
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    registrarse: async (req, res) => {
        const {nombre, email, contrasenia} = req.body
        let contraseniaHasheada = bcryptjs.hashSync(contrasenia)
        let nuevoUsuario = new Usuario({
            nombre,
            email,
            contrasenia: contraseniaHasheada
        })
        try {
            let usuarioRegistrado = await Usuario.findOne({email})
            if(!usuarioRegistrado) {
                let agregarUsuario = await nuevoUsuario.save()
                req.session.loggedIn = true,
                req.session.usuarioId = agregarUsuario._id,
                req.session.nombre = agregarUsuario.nombre,
                req.session.email = agregarUsuario.email,
                req.session.usuario = agregarUsuario
                return res.redirect('/recomendacion')
            } else {
                res.render('registrarse', {
                    title: 'Registrarse',
                    error: 'Usuario ya existente',
                    loggedIn: req.session.loggedIn,
                    nombre: req.session.nombre || 'desconocido',
                    usuario: null
                })
            }
        } catch(e) {
            console.log(e)
            res.render('error404', {
                title: 'error404'
            })
        }
    },

    cerrarsesion: (req, res) => {
        try {
            req.session.destroy(() => {
                res.redirect('/')
            })
        } catch {
            res.render('error404', {
                title: 'error404'
            })
        }
    }
}

module.exports = usuariosControllers