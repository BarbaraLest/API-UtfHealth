const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM clinicalHistory',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Clinical History",
                    data: result
                })
            }

        )
    })

})

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO  clinicalHistory  ( idStudent, allergy1, allergy2, allergy3, chronicDisease1,  chronicDisease2, chronicDisease3, familyDisease1, familyDisease2, familyDisease3, observation) VALUES (?, ?, ?, ?,?, ?,?, ?,?, ?, ?)',
            [req.body.idStudent, req.body.allergy1, req.body.allergy2, req.body.allergy3, req.body.chronicDisease1, req.body.chronicDisease2, req.body.chronicDisease3, req.body.familyDisease1, req.body.familyDisease2, req.body.familyDisease3, req.body.observation],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(201).send({
                    message: "Clinical History created",
                    data: result
                })
            }

        )
    })

})

router.get('/:idclinicalHistory', (req, res, next) => {
    const idclinicalHistory = req.params.idclinicalHistory

    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM clinicalHistory WHERE idclinicalHistory = ${idclinicalHistory} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "clinical History",
                    data: result
                })
            }

        )
    })



})

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            `UPDATE clinicalHistory SET idStudent = ? , allergy1 = ?, allergy2 = ?, allergy3 = ?, chronicDisease1 = ?,  chronicDisease2 = ?, chronicDisea3  = ?, familyDisease1 = ?, familyDisease2 = ?, familyDisease3 = ?, observation = ? WHERE idclinicalHistory = ?`,
            [req.body.idStudent, req.body.allergy1, req.body.allergy2, req.body.allergy3, req.body.chronicDisease1, req.body.chronicDisease2, req.body.chronicDisease3, req.body.familyDisease1, req.body.familyDisease2, req.body.familyDisease3, req.body.observation, req.body.idclinicalHistory],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Clinical History changed",
                    data: result
                })
            }

        )
    })
})

router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM clinicalHistory WHERE idclinicalHistory = ?',
            [req.body.idclinicalHistory],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Clinical History excluded",
                    data: result
                })
            }

        )
    })
})


router.get('/emptyOrnot/:idStudent', (req, res, next) => {
    const idStudent = req.params.idStudent

    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM clinicalHistory WHERE idStudent = ${idStudent} `,
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

module.exports = router