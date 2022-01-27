const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/googleVerify')
const login = async(req = request, res = response) => {
    const { email, password } = req.body
    try {
        const usuarioFind = await Usuario.findOne({ email })
        if (!usuarioFind) {
            return res.status(400).json({
                status: false,
                msg: 'Email no encontrado'
            })
        }
        const validPassword = bcrypt.compareSync(password, usuarioFind.password)
        if (!validPassword) {
            return res.status(400).json({
                status: false,
                msg: 'Contraseña no valida'
            })
        }
        //generar token - JWT
        const token = await generarJWT(usuarioFind.id)
        res.json({
            status: true,
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
const googleSingIn = async(req = request, res = response) => {
    const { token: googleToken } = req.body
        // console.log('googleToken => ', googleToken)
    try {
        const { email, name, picture } = await googleVerify(googleToken)
        const usuarioDB = await Usuario.findOne({ email })
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                google: true,
                img: picture
            })
        } else {
            usuario = usuarioDB
            usuario.google = true
        }
        await usuario.save()
            //generar token - JWT
        const token = await generarJWT(usuario.id)
        res.json({
            status: true,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            status: false,
            msg: 'Token no es correcto'
        })
    }

}
module.exports = {
    login,
    googleSingIn
}