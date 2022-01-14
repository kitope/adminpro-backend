const Usuario = require('../models/usuario')
const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const getUsuarios = async(req = request, res = response) => {
    const usuario = await Usuario.find({}, 'nombre email role')
    res.json({
        status: 'ok',
        usuario,
        uid: req.uid
    })
}
const postUsuarios = async(req, res = response) => {
    const { nombre, password, email } = req.body

    try {
        const existeUsuario = await Usuario.findOne({ email })
        if (existeUsuario) {
            return res.status(400).json({
                status: false,
                msg: 'el correo ya esta registrado'
            })
        }
        const usuarios = new Usuario(req.body)
            //encriptar pass
        const salt = bcrypt.genSaltSync()
        usuarios.password = bcrypt.hashSync(password, salt)
        await usuarios.save()
        const token = await generarJWT(usuarios.id)
        res.json({
            status: 'ok',
            usuarios,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}
const putUsuarios = async(req = request, res = response) => {
    const uid = req.params.id
    try {
        const usuarioFind = await Usuario.findById(uid)
        if (!usuarioFind) {
            return res.status(404).json({
                status: false,
                msg: 'el usuario no existe por ese id'
            })
        }

        const { password, google, email, ...campos } = req.body
        if (usuarioFind.email !== email) {
            const existeEmail = await Usuario.findOne({ email })
            if (existeEmail) {
                return res.status(40).json({
                    status: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true })
        res.json({
            status: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'error inesperado... revisar logs'
        })
    }
}
const deleteUsuarios = async(req = request, res = response) => {
    const uid = req.params.id
    try {
        const usuarioFind = await Usuario.findById(uid)
        if (!usuarioFind) {
            return res.status(404).json({
                status: false,
                msg: 'el usuario no existe por ese id'
            })
        }
        await Usuario.findByIdAndDelete(uid)
        res.json({
            status: true,
            mdg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'error inesperado... revisar logs'
        })
    }
}
module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}