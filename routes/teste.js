const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        message:"Usando o get dentro da rota produto"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        message:"Usando o post dentro da rota produto"
    })
})

router.get('/:id_teste', (req, res, next) => {
    const id = req.params.id_teste

if( id == 'especial'){
    res.status(200).send({
        message:"id especial",
        id: id
    })
}else{
    res.status(200).send({
        message:"Usando o get de um produto exclusivo",
        id: id
    })

}
    
})

router.patch('/', (req, res, next) => {
    res.status(200).send({
        message:"Usando o patch dentro da rota produto"
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        message:"Usando o delete dentro da rota produto"
    })
})



module.exports = router