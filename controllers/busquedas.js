const { response, request } = require('express')
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')
const { populate } = require('../models/usuario')
const getTodos = async(req = request, res = response) => {
    const { q } = req.params
    const regex = new RegExp(q, 'i')
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ])
    res.json({
        status: true,
        usuarios,
        medicos,
        hospitales
    })
}
const getDocumentosColeccion = async(req = request, res = response) => {
    const { q, tabla } = req.params
    const regex = new RegExp(q, 'i')
    let data = []
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
            break;
        case 'hosptiales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img')
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            break;

        default:
            return res.status(400).json({
                status: false,
                msg: 'la coleccion debe ser usuarios | hospitales | medicos'
            })
    }
    return res.json({
        status: true,
        resultado: data,

    })

}
module.exports = {
    getTodos,
    getDocumentosColeccion,
}