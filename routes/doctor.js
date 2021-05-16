const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Doctor',
            (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    message: "Doctor",
                    data: resultado
                })
            }

        )
    })

    
})

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Doctor (name, specialty, email, register ) VALUES (?, ?, ?, ?)',
            [req.body.name, req.body.specialty, req.body.email, req.body.register],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "O medico foi criado",
                    data: resultado.insertId
                })
            }

        )
    })
})

router.get('/:idDoctor', (req, res, next) => {
    const idDoctor = req.params.idDoctor

    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM Doctor WHERE idDoctor = ${idDoctor}`,
            (error, resultado, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null

                    })
                }
                res.status(200).send({
                    message: "Doctor",
                    data: resultado
                })
            }

        )
    })

})

router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            `UPDATE Doctor SET name = ?, specialty = ?, email = ?, register = ? WHERE idDoctor = ? `,
            [req.body.name, req.body.specialty, req.body.email, req.body.register, req.body.idDoctor],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "O medico foi alterado",
                    data: resultado
                })
            }

        )
    })
    
})

router.delete('/', (req, res, next) => {
    const doctor = {
        idDoctor: req.body.idDoctor
    }
    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM Doctor WHERE idDoctor = ?',
            [req.body.idDoctor],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "O doutor foi excluido",
                    data: resultado
                })
            }

        )
    })
})



module.exports = router