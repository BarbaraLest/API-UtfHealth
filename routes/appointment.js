const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
        'SELECT Student.idStudent, Student.name, Appointment.idAppointment, Appointment.date, Appointment.time, Appointment.place, Appointment.observations FROM Appointment INNER JOIN Student on Student.idStudent = Appointment.Student_idStudent',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    message: "Appointment",
                    data: result
                })
            }

        )
    })
})

router.post('/', (req, res, next) => {
     mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Appointment (date, time, place, observations, Doctor_idDoctor, Student_idStudent ) VALUES (?, ?, ?, ?, ?, ?)',
            [req.body.date, req.body.time,  req.body.place,  req.body.observations,  req.body.Doctor_idDoctor,  req.body.Student_idStudent],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(201).send({
                    message: "Appointment created",
                    data: result, 
                })
            }

        )
    })    
    
})

router.get('/:idAppointment', (req, res, next) => {
    const idAppointment = req.params.idAppointment
    
    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM Appointment WHERE idAppointment = ${idAppointment} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Appointment",
                    data: result
                })
            }

        )
    }) 

})

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'UPDATE Appointment SET date = ?, time = ? , place = ?, observations = ?, Doctor_idDoctor = ?, Student_idStudent = ? WHERE idAppointment = ?',
            [req.body.date, req.body.time,  req.body.place,  req.body.observations,  req.body.Doctor_idDoctor,  req.body.Student_idStudent, req.body.idAppointment],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(201).send({
                    message: "Appointment changed",
                    data: result
                })
            }

        )
    })    
})

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM Appointment WHERE idAppointment = ?',
            [req.body.idAppointment],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Appointment excluded",
                    data: result
                })
            }

        )
    })
})



module.exports = router