const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "historico medico"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        message: "O historico medico foi criado"
    })
})

router.get('/medicalHistory/:id_medicalHistory', (req, res, next) => {
    const id = req.params.id_medicalHistory

        res.status(200).send({
            message: "historico medico",
            id: id
        })

   

})

router.patch('/', (req, res, next) => {
    res.status(200).send({
        message: "O historico foi alterado"
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        message: "O historico foi excluido"
    })
})



module.exports = router