const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "aluno"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        message: "O aluno foi criado"
    })
})

router.get('/student/:id_student', (req, res, next) => {
    const id = req.params.id_student
        res.status(200).send({
            message: "aluno",
            id: id
        })
})

router.patch('/', (req, res, next) => {
    res.status(200).send({
        message: "O aluno foi alterado"
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        message: "O aluno foi excluido"
    })
})

module.exports = router