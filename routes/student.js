const express = require('express')
const router = express.Router()
const mysql = require('./../mysql').pool
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Student',
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Student",
                    data: result
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
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result

                    })
                }
                res.status(200).send({
                    message: "Student",
                    data: result
                })
            }

        )
    })
})

router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            `UPDATE Student SET name = ?, email = ?, register = ?, password = ? WHERE idStudent = ? `,
            [req.body.name, req.body.email, req.body.register, req.body.password, req.body.idStudent],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Student changed",
                    data: result
                })
            }

        )
    })

})

router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM Student WHERE idStudent = ?',
            [req.body.idStudent],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: result
                    })
                }
                res.status(200).send({
                    message: "Student excluded",
                    data: result
                })
            }

        )
    })

})

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
            if (errBcrypt) {
                return res.status(500).send({
                    error: errBcrypt
                })
            }
            conn.query(
                'INSERT INTO Student (name, email, register, password) VALUES (?, ?, ?, ?)',
                [req.body.name, req.body.email, req.body.register, hash],
                (error, result, field) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({

                            error: error,
                            response: result
                        })
                    }
                    res.status(200).send({
                        message: "Student created",
                        data: result
                    })
                }

            )


        })

    })
})

router.post('/auth', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        const query = 'SELECT * FROM Student WHERE register = ?';
        conn.query(query, [req.body.register], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }

            if (results.length < 1) {
                return res.status(401).send({ message: "Auth error aqui" })
            }

            bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                if (err) {
                    return res.status(401).send({ message: "Auth error aqui 2" })
                }

                if (result) {
                    let token = jwt.sign({
                        idStudent: results[0].idStudent,
                        register: results[0].register
                    }, 
                    process.env.JWR_KEY,
                    {
                        expiresIn:"5d"
                    })
                    return res.status(200).send({ message: "Auth success", token: token })
                }

                return res.status(401).send({ message: "Auth error aqui 3" })

            })

           
        })
    })
})



module.exports = router