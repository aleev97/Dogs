const router = require('express').Router();
const { getAllDogs } = require('../controllers/GetDogs');

//GET | /dogs/name?="..."
router.get('/', async (req, res) => {
    const name = req.query.name.toLocaleLowerCase(); // guardo el 'name' requeridos por query
    try {
  
        if (name) {
            const allDogs = await getAllDogs(); //guarda toda la info de dogs
            const dogs = [...allDogs].filter((dog) => dog.name.toLowerCase().includes(name.toLocaleLowerCase())); //filtra en totalDogs el elemento pasado por params
        }
        if (dogs.length) { // si hay algo en dogName
            res.status(200).json(dogs) //lo consologuea en 200
        }
        else {
            res.status(404).json({ message: 'no se encontraron perros con ese nombre' }) //si no hay lo manda en 400
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = router;