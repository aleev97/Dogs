const router = require('express').Router();
const { getAllTemperaments } = require('../controllers/GetTemperaments');

//GET | /temperaments
//Invoco al controlador "getAllTemperaments".
//Este controlador realiza una operación asíncrona para recuperar una lista de temperamentos desde la base de datos.
//Si la operación se realiza con éxito, envio una respuesta con un estado 200 y un objeto JSON que contiene los temperamentos.
//Si ocurre un error durante la operación, envio una respuesta con un estado 404 y un mensaje de error en formato de texto plano.
router.get("/", async (req, res) => {
    try {
        const temperaments = await getAllTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(404).send(error = error.message);
    } 
}); 

module.exports = router;