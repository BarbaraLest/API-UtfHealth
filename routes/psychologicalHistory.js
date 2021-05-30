const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM psychologicalHistory',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Psychological History",
                    data: result
                })
            }

        )
    })

})

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO  psychologicalHistory  ( idStudent, psychologicalSupporty, tdah, anxiety, antidepressant, observation ) VALUES (?, ?, ?, ?,?, ? )',
            [req.body.idStudent, req.body.psychologicalSupporty, req.body.tdah, req.body.anxiety, req.body.antidepressant, req.body.observation],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(201).send({
                    message: "Psychological History created",
                    data: result
                })
            }

        )
    })

})

router.get('/:idpsychologicalHistory', (req, res, next) => {
    const idpsychologicalHistory = req.params.idpsychologicalHistory


    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM psychologicalHistory WHERE idpsychologicalHistory = ${idpsychologicalHistory} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Psychological History",
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
            `SELECT * FROM psychologicalHistory WHERE idStudent = ${idStudent} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    data: result

                })
            }

        )
    })



})

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            `UPDATE psychologicalHistory SET idStudent = ? , psychologicalSupporty = ?, tdah = ? , anxiety = ? , antidepressant = ?, observation =?  WHERE idpsychologicalHistory = ?`,
            [req.body.idStudent, req.body.psychologicalSupporty, req.body.tdah, req.body.anxiety, req.body.antidepressant, req.body.observation, req.body.idpsychologicalHistory],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Psychological History changed",
                    data: result
                })
            }

        )
    })
})

router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM psychologicalHistory WHERE idpsychologicalHistory = ?',
            [req.body.idpsychologicalHistory],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Psychological History excluded",
                    data: result
                })
            }

        )
    })
})

module.exports = router