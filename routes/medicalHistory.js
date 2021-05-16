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
            'INSERT INTO medicalHistory (Student_idStudent, data ) VALUES (?, ?)',
            [req.body.Student_idStudent, req.body.data],
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