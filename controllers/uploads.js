const { response, request } = require('express')
const fs = require('fs')
const path = require('path')
const Usuario = require('../models/usuario')
const { v4: uuidv4 } = require('uuid')
const { actualizarImagen } = require('../helpers/actualizarImagen')
const { fstat } = require('fs')
const fileUploads = async(req = request, res = response) => {
    const { tipo, id } = req.params

    try {
        const tiposValidos = ['hospitales', 'medicos', 'usuarios']
        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({
                status: false,
                msg: `el tipo [${tipo}] no existe`
            })
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                status: false,
                msg: `No hay ningun archivo`
            });
        }
        const file = req.files.imagen
        const nombreCortado = file.name.split('.')
        const extensionFile = nombreCortado[nombreCortado.length - 1]
        const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif']
        if (!extensionesValidas.includes(extensionFile)) {
            return res.status(400).json({
                status: false,
                msg: `No es una extension permitida`
            });
        }
        const nombreArchivo = `${ uuidv4() }.${extensionFile}`
        const path = `./uploads/${tipo}/${nombreArchivo}`
            // Use the mv() method to place the file somewhere on your server
        file.mv(path, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    status: false,
                    msg: `Error al mover la imagen`
                });
            }
            actualizarImagen(
                tipo,
                id,
                nombreArchivo
            )
            res.json({
                status: true,
                msg: 'archivo subido',
                nombreArchivo
            })
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: `error revisar logs`
        });
    }
}

const retornaImagen = (req = request, res = response) => {
    const { tipo, foto } = req.params
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)
    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
    }
    return res.sendFile(path.join(__dirname, `../uploads/image-not-found.png`))
}
module.exports = {
    fileUploads,
    retornaImagen
}