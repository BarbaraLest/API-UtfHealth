const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Schedules',
            (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    message: "Schedules",
                    data: resultado
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
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(201).send({
                    message: "O horario foi inserido",
                    data: resultado
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
            (error, resultado, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null

                    })
                }
                res.status(200).send({
                    message: "Schedule",
                    data: resultado
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
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "O horario foi alterado",
                    data: resultado
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
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "O horario foi excluido",
                    data: resultado
                })
            }

        )
    })

})

module.exports = router