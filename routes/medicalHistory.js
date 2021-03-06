const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM medicalHistory',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Medical History",
                    data: result
                })
            }

        )
    })

})

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO  medicalHistory  ( Student_idStudent, allergy1, allergy2, allergy3, chronicDisease1,  chronicDisease2, chronicDisease3, familyDisease1, familyDisease2, familyDisease3, caries, dentalAppliance, canal, wisdomExtraction, psychologicalSupport, dtdah, anxiety, antidepressant, schedules, routin, pedagogicalSupport) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?)',
            [req.body.Student_idStudent, req.body.allergy1, req.body.allergy2, req.body.allergy3, req.body.chronicDisease1, req.body.chronicDisease2, req.body.chronicDisease3, req.body.familyDisease1, req.body.familyDisease2, req.body.familyDisease3, req.body.caries, req.body.dentalAppliance, req.body.canal, req.body.wisdomExtraction, req.body.psychologicalSupport, req.body.dtdah, req.body.anxiety, req.body.antidepressant, req.body.schedules, req.body.routin, req.body.pedagogicalSupport],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(201).send({
                    message: "Medical History created",
                    data: result
                })
            }

        )
    })

})

router.get('/:idMedicalHistory', (req, res, next) => {
    const idMedicalHistory = req.params.idMedicalHistory


    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM medicalHistory WHERE idmedicalHistory = ${idMedicalHistory} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Medical History",
                    data: result
                })
            }

        )
    })



})


router.get('/emptyOrNot/:idStudent', (req, res, next) => {
    const idStudent = req.params.idStudent


    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM medicalHistory WHERE idStudent = ${idStudent} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Medical History",
                    data: result
                })
            }

        )
    })



})

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            `UPDATE medicalHistory SET Student_idStudent = ? , data = ? WHERE idmedicalHistory = ?`,
            [req.body.Student_idStudent, req.body.data, req.body.idmedicalHistory],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Medical History changed",
                    data: result
                })
            }

        )
    })
})

router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM medicalHistory WHERE idmedicalHistory = ?',
            [req.body.idmedicalHistory],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Medical History excluded",
                    data: result
                })
            }

        )
    })
})

module.exports = router