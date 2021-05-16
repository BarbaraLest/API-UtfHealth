const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Student',
            (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    message: "Student",
                    data: resultado
                })
            }

        )
    })

})

////////////////////////ARRUMAR NO DB
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Student (name, email, register ) VALUES (?, ?, ?)',
            [req.body.name, req.body.email, req.body.register],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(201).send({
                    message: "O aluno foi inserido",
                    //id_student: resultado
                })
            }

        )
    })
})

router.get('/:idStudent', (req, res, next) => {
    const idStudent = req.params.idStudent

    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM Student WHERE idStudent = ${idStudent} `,
            (error, resultado, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null

                    })
                }
                res.status(200).send({
                    message: "Student",
                    data: resultado
                })
            }

        )
    })
})

router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            `UPDATE Student SET name = ?, email = ?, register = ? WHERE idStudent = ? `,
            [req.body.name, req.body.email, req.body.register, req.body.idStudent],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "O aluno foi alterado",
                    data: resultado
                })
            }

        )
    })

})

router.delete('/', (req, res, next) => {
    const student = {
        idStudent: req.body.idStudent
    }
    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM Student WHERE idStudent = ?',
            [req.body.idStudent],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "O aluno foi excluido",
                    data: student
                })
            }

        )
    })

})

module.exports = router