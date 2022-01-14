/*
    Ruta: /api/usuarios
*/
const { check } = require('express-validator')
const { Router } = require('express')
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar.campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', [validarJWT], getUsuarios)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], postUsuarios)
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], putUsuarios)
router.delete('/:id', [
    validarJWT
], deleteUsuarios)

module.exports = router