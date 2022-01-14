const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const validarJWT = (req = request, res = response, next) => {
    //leer el token
    const token = req.header('x-token')
        // console.log(token)
    if (!token) {
        return res.status(401).json({
            status: false,
            mdg: 'no hay token en la peticion'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        console.log(uid)
        req.uid = uid
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            msg: 'Token no valido'
        })
    }
    next()
}
module.exports = {
    validarJWT
}