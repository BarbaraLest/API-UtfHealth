const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "Usando o get dentro da rota produto"
    })
})

router.post('/', (req, res, next) => {
    const teste = {
        name: req.body.name,
        register: req.body.register,
    }
    res.status(201).send({
        message: "Usando o post dentro da rota produto",
        data: teste
    })
})

router.get('/:id_teste', (req, res, next) => {
    const id = req.params.id_teste

    res.status(200).send({
        message: "Usando o get de um produto exclusivo",
        id: id
    })



})

router.patch('/', (req, res, next) => {
    const student = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        register: req.body.register,
        course: req.body.course
    }
    res.status(200).send({
        message: "Usando o patch dentro da rota produto",
        data: student
    })
})

router.delete('/', (req, res, next) => {
    const id = {
        id: id
    }
    res.status(200).send({
        message: "Usando o delete dentro da rota produto",
        id: id
    })
})



module.exports = router