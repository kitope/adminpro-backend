/*
    Ruta: /api/medicos
*/
const { check } = require('express-validator')
const { Router } = require('express')
const { getMedicos, postMedicos, putMedicos, deleteMedicos } = require('../controllers/medicos')
const { validarCampos } = require('../middlewares/validar.campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/', [validarJWT], getMedicos)
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'el id del hospital debe ser valido').isMongoId(),
    validarCampos
], postMedicos)
router.put('/:id', [validarJWT], putMedicos)
router.delete('/:id', [validarJWT], deleteMedicos)

module.exports = router