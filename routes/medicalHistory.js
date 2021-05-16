const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM medicalHistory',
            (error, resultado, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    message: "Medical History",
                    data: resultado
                })
            }

        )
    })
    
})

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO medicalHistory (Student_idStudent, data ) VALUES (?, ?)',
            [req.body.Student_idStudent, req.body.data],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(201).send({
                    message: "O historico medico foi inserido",
                    data: resultado
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
            (error, resultado, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null

                    })
                }
                res.status(200).send({
                    message: "Medical History",
                    data: resultado
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
            (error, resultado, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null

                    })
                }
                res.status(200).send({
                    message: "Medical History foi atualizado com sucesso",
                    data: resultado
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
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: resultado
                    })
                }
                res.status(200).send({
                    message: "O historico medico foi excluido",
                    data: resultado
                })
            }

        )
    })
})

module.exports = router