const Medico = require('../models/medico')
const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const getMedicos = async(req = request, res = response) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
    res.json({
        status: true,
        medicos
    })
}
const postMedicos = async(req = request, res = response) => {
    const uid = req.uid
    try {
        const medico = new Medico({
            usuario: uid,
            ...req.body
        })
        const medicoDB = await medico.save()
        res.json({
            status: true,
            medico: medicoDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}
const putMedicos = async(req = request, res = response) => {
    try {
        res.json({
            status: true,
            msg: 'putMedicos'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'error inesperado... revisar logs'
        })
    }
}
const deleteMedicos = async(req = request, res = response) => {
    try {
        res.json({
            status: true,
            msg: 'deleteMedicos'
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
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos
}