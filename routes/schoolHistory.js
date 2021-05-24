const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM schoolHistory',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "School History",
                    data: result
                })
            }

        )
    })

})

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO  schoolHistory  ( idStudent, schedules, routine, pedagogicalSupport, observation) VALUES (?, ?, ?, ?, ?)',
            [req.body.idStudent, req.body.schedules, req.body.routine, req.body.pedagogicalSupport, req.body.observation],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(201).send({
                    message: "School History created",
                    data: result
                })
            }

        )
    })

})

router.get('/:idschoolHistory', (req, res, next) => {
    const idschoolHistory = req.params.idschoolHistory


    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM schoolHistory WHERE idschoolHistory = ${idschoolHistory} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "School History",
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
            `SELECT * FROM schoolHistory WHERE idStudent = ${idStudent} `,
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
            `UPDATE schoolHistory SET idStudent = ? , schedules = ?, routine = ?, pedagogicalSupport = ?, observation = ? WHERE idschoolHistory = ?`,
            [req.body.idStudent, req.body.schedules, req.body.routine, req.body.pedagogicalSupport, req.body.observation, req.body.idschoolHistory],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "School History changed",
                    data: result
                })
            }

        )
    })
})

router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM schoolHistory WHERE idschoolHistory = ?',
            [req.body.idschoolHistory],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "School History excluded",
                    data: result
                })
            }

        )
    })
})

module.exports = router