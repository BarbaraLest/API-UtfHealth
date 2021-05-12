const express = require('express')
const app = express()

const rotaTeste = require('./routes/teste')
const routeDoctor = require('./routes/doctor')
const routeAppointment = require('./routes/appointment')
const routeMedicalHistory = require('./routes/medicalHistory')
const routeStudent = require('./routes/student')

app.use('/teste', rotaTeste)
app.use('/doctor', routeDoctor)
app.use('/appointment', routeAppointment)
app.use('/medicalHistory', routeMedicalHistory)
app.use('/route Student', routeStudent)


module.exports = app