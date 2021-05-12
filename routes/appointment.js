const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "Consultas"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        message: "A consulta foi criada"
    })
})

router.get('/appointment/:id_appointment', (req, res, next) => {
    const id = req.params.id_appointment
        res.status(200).send({
            message: "consulta",
            id: id
        })    

})

router.patch('/', (req, res, next) => {
    res.status(200).send({
        message: "A consulta foi alterada"
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        message: "A consulta foi excluida"
    })
})



module.exports = router