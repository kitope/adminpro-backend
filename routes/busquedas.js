/*
    Ruta: /api/medicos
*/
const { check } = require('express-validator')
const { Router } = require('express')
const { getTodos, getDocumentosColeccion } = require('../controllers/busquedas')
const { validarCampos } = require('../middlewares/validar.campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/:q', [validarJWT], getTodos)
router.get('/coleccion/:tabla/:q', [validarJWT], getDocumentosColeccion)
module.exports = router