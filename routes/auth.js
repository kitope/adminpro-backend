/*
   Ruta: /api/login
*/
const { check } = require('express-validator')
const { Router } = require('express')
const { login, googleSingIn, renewToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar.campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()
router.get('/renew', [
    validarJWT
], renewToken)
router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], login)
router.post('/google', [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleSingIn)
module.exports = router