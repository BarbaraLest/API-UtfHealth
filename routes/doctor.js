const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "médico"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        message: "O médico foi criado"
    })
})

router.get('/doctor/:id_doctor', (req, res, next) => {
    const id = req.params.id_appointment

        res.status(200).send({
            message: "medico",
            id: id
        })

})

router.patch('/', (req, res, next) => {
    res.status(200).send({
        message: "O medico foi alterado"
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        message: "O medico foi excluído"
    })
})



module.exports = router