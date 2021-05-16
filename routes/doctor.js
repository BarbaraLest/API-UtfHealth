const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool
const bcrypt = require('bcrypt')

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Doctor',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Doctor",
                    data: result
                })
            }

        )
    })

    
})

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
            if(errBcrypt){ 
                return res.status(500).send({ 
                    error: errBcrypt
                })
            }
            conn.query(
                'INSERT INTO Doctor (name, specialty, email, register, password ) VALUES (?, ?, ?, ?, ?)',
                [req.body.name, req.body.specialty, req.body.email, req.body.register, hash],
                (error, result, field) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: result
                        })
                    }
                    res.status(200).send({
                        message: "Doctor created",
                        data: result
                    })
                }
    
            )


        })
       
    })
})

router.get('/:idDoctor', (req, res, next) => {
    const idDoctor = req.params.idDoctor

    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT * FROM Doctor WHERE idDoctor = ${idDoctor}`,
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Doctor",
                    data: result
                })
            }

        )
    })

})

router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            `UPDATE Doctor SET name = ?, specialty = ?, email = ?, register = ?, password=? WHERE idDoctor = ? `,
            [req.body.name, req.body.specialty, req.body.email, req.body.register, req.body.password, req.body.idDoctor],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Doctor changed",
                    data: result
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
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Doctor excluded",
                    data: result
                })
            }

        )
    })
})



module.exports = router