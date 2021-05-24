const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const rotaTeste = require('./routes/teste')
const routeDoctor = require('./routes/doctor')
const routeAppointment = require('./routes/appointment')
const routeMedicalHistory = require('./routes/medicalHistory')
const routeStudent = require('./routes/student')
const routeSchedules = require('./routes/schedules')
const routeClinicalHistory = require('./routes/clinicalHistory')
const routeDentalHistory = require('./routes/dentalHistory')
const routePsychologicalHistory = require('./routes/psychologicalHistory')
const routeSchoolHistory = require('./routes/schoolHistory')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/teste', rotaTeste)
app.use('/doctor', routeDoctor)
app.use('/appointment', routeAppointment)
app.use('/medicalHistory', routeMedicalHistory)
app.use('/student', routeStudent)
app.use('/schedules', routeSchedules)
app.use('/clinicalHistory', routeClinicalHistory)
app.use('/dentalHistory', routeDentalHistory)
app.use('/psychologicalHistory', routePsychologicalHistory)
app.use('/schoolHistory', routeSchoolHistory)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();

})


app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message
        }
    });
})

module.exports = app