const express = require('express')
const router = express.Router()
const usuariosControllers = require('../controllers/usuariosControllers')
const finanzasControllers = require('../controllers/finanzasControllers')

router.route('/')
.get(finanzasControllers.home)
router.route('/comofunciona')
.get(finanzasControllers.explicacion)
router.route('/misfinanzas')
.get(finanzasControllers.finanzas)
router.route('/nuevomes')
.get(finanzasControllers.nuevoMes)
router.route('/error404')
.get(finanzasControllers.error404)


router.route('/ingresos')
.get(finanzasControllers.ingresos)
.post(finanzasControllers.registrarIngreso)
router.route('/borraringreso/:id')
.get(finanzasControllers.borrarIngreso)
router.route('/editaringreso/:id')
.get(finanzasControllers.editarIngreso)

router.route('/gastos')
.get(finanzasControllers.gastos)
.post(finanzasControllers.registrarGasto)
router.route('/borrargasto/:id')
.get(finanzasControllers.borrarGasto)
router.route('/editargasto/:id')
.get(finanzasControllers.editarGasto)

router.route('/iniciarsesion')
.get(usuariosControllers.iniciarSesion)
.post(usuariosControllers.ingresar)
router.route('/registrarse')
.get(usuariosControllers.registrarSesion)
.post(usuariosControllers.registrarse)
router.route('/cerrarsesion')
.get(usuariosControllers.cerrarsesion)


module.exports = router