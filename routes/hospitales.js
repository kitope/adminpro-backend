/*
    Ruta: /api/hospitales
*/
const { check } = require('express-validator')
const { Router } = require('express')
const { getHospitales, postHospitales, putHospitales, deleteHospitales } = require('../controllers/hospitales')
const { validarCampos } = require('../middlewares/validar.campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', [validarJWT], getHospitales)
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre del hospital es requerido').not().isEmpty(),
    validarCampos
], postHospitales)
router.put('/:id', [validarJWT], putHospitales)
router.delete('/:id', [validarJWT], deleteHospitales)

module.exports = router