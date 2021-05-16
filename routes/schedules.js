const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Schedules',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Schedules",
                    data: result
                })
            }

        )
    })
})

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Schedules (data, Doctor_idDoctor) VALUES (?, ?)',
            [req.body.date, req.body.Doctor_idDoctor],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(201).send({
                    message: "Schedules created",
                    data: result
                })
            }

        )
    })
})

router.get('/:idSchedules', (req, res, next) => {
    const idSchedules = req.params.idSchedules

    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM Schedules WHERE idSchedules = ${idSchedules} `,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Schedule",
                    data: result
                })
            }

        )
    })
})

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            `UPDATE Schedules SET data = ?, Doctor_id_Doctor = ? WHERE idSchedules = ? `,
            [req.body.data, req.body.Doctor_idDoctor, req.body.idSchedules],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "Schedules changed",
                    data: result
                })
            }

        )
    })
})

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM Schedules WHERE idSchedules = ?',
            [req.body.idSchedules],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Schedules excluded",
                    data: result
                })
            }

        )
    })

})

module.exports = router