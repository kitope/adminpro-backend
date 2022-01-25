/*
    Ruta: /api/medicos
*/
const expressFileUpload = require('express-fileupload');
const { check } = require('express-validator')
const { Router } = require('express')
const { fileUploads, retornaImagen } = require('../controllers/uploads')
const { validarCampos } = require('../middlewares/validar.campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()
router.use(expressFileUpload());
router.put('/:tipo/:id', [validarJWT], fileUploads)
router.get('/:tipo/:foto', [validarJWT], retornaImagen)
module.exports = router