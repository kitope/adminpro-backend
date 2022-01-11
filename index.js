const express = require('express')
const { dbConnection } = require('./db/config')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
dbConnection()
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        msg: 'hola mundo'
    })
})
app.listen(process.env.PORT, () => {
    console.log('servidor corriendo => ', process.env.PORT)
})