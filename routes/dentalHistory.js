const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM dentalHistory',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Dental History",
                    data: result
                })
            }

        )
    })

})

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO  dentalHistory  ( idStudent, caries, dentalAppliance, canal, wisdomExtraction, observation) VALUES (?, ?, ?, ?,?, ?)',
            [req.body.idStudent, req.body.caries, req.body.dentalAppliance, req.body.canal, req.body.wisdomExtraction, req.body.observation],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(201).send({
                    message: "Dental History created",
                    data: result
                })
            }

        )
    })

})

router.get('/:iddentalHistory', (req, res, next) => {
    const iddentalHistory = req.params.iddentalHistory


    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM dentalHistory WHERE iddentalHistory = ${iddentalHistory} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Dental History",
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
            `SELECT * FROM dentalHistory WHERE idStudent = ${idStudent} `,
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
            `UPDATE dentalHistory SET idStudent = ? dStudent = ? , caries = ?, dentalAppliance = ?, canal = ?, wisdomExtraction = ?, observation = ?  WHERE iddentalHistory = ?`,
            [req.body.idStudent, req.body.caries, req.body.dentalAppliance, req.body.canal, req.body.wisdomExtraction, req.body.observation, req.body.iddentalHistory],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "dental History changed",
                    data: result
                })
            }

        )
    })
})

router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM clinicalHistory WHERE iddentalHistory = ?',
            [req.body.iddentalHistory],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "dental History excluded",
                    data: result
                })
            }

        )
    })
})

module.exports = router