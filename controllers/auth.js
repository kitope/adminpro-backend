const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
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
module.exports = {
    login
}