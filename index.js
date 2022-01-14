const express = require('express')
const { dbConnection } = require('./db/config')
const cors = require('cors')
require('dotenv').config()
const app = express()
dbConnection()
app.use(cors())
app.use(express.json())
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))
    //lectura y parseo del body
app.listen(process.env.PORT, () => {
    console.log('servidor corriendo => ', process.env.PORT)
})