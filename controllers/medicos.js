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
    const { id } = req.params
    const uid = req.uid
    try {
        const medicoDB = await Medico.findById(id)
        if (!medicoDB) {
            return res.status(404).json({
                status: false,
                msg: 'Medico no encontrado por id'
            })
        }
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        const medicoUpdate = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })
        res.json({
            status: true,
            medicoUpdate
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
    const { id } = req.params
    try {
        const medicoDB = await Medico.findById(id)
        if (!medicoDB) {
            return res.status(404).json({
                status: false,
                msg: 'Medico no encontrado por id'
            })
        }
        await Medico.findByIdAndDelete(id)
        res.json({
            status: true,
            msg: 'Medico eliminado'
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