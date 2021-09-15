const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllDogs, getTemper, getBreed, createDog } = require('../controllers/controllers')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', (req, res) => {
    getAllDogs(req.query).then(result => {
        if (!result) {
            return res.status(404).json({ message: "No se encontró ningún perro" })
        }
        res.status(200).send(result)
    })
})

router.get('/dogs/:dogId', (req, res) => {
    getBreed(req.params).then(result => {

        if (result.length === 0) {
            res.status(404).json({ message: "No se encontró el perro" })
        }
        res.status(200).send(result)
    })
})

router.get('/temperament', (req, res) => {
    getTemper().then(result => {
        res.send(result)
    })
})

router.post('/dog', (req, res) => {
    createDog(req.body).then(result => {
        res.status(200).send(result)
    })
})

module.exports = router;
