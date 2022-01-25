const Hospital = require('../models/hospital')
const { response, request } = require('express')
const getHospitales = async(req = request, res = response) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre img')
    res.json({
        status: true,
        hospitales
    })
}
const postHospitales = async(req = request, res = response) => {
    const uid = req.uid
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    })
    try {
        const hospitalDB = await hospital.save()
        res.json({
            status: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}
const putHospitales = async(req = request, res = response) => {
    try {
        res.json({
            status: true,
            msg: 'putHospitales'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'error inesperado... revisar logs'
        })
    }
}
const deleteHospitales = async(req = request, res = response) => {
    try {
        res.json({
            status: true,
            msg: 'deleteHospitales'
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
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
}