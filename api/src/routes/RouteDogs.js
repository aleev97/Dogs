const router = require('express').Router();
const { getAllDogs, getDogById } = require('../controllers/GetDogs');
const { createDog } = require('../controllers/PostDogs');


// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.
router.get('/', async (req, res) => {

    const name = req.query.name; // guardo el 'name' requeridos por query
    try {
        const totalDogs = await getAllDogs(name); //guarda toda la info de dogs

        if (name) {  
            const dogName = totalDogs.filter(
                (dog) => dog.name.toLowerCase().includes(name.toLocaleLowerCase()) //filtra en totalDogs el elemento pasado por params
            );
            dogName.length // si hay algo en dogName
                ? res.status(200).json(dogName) //lo consologuea en 200
                : res.status(400) //si no hay lo manda en 400
                    .send('Sorry I dont have dogs with that name');
        } else {
            res.status(200).json(totalDogs); //y si no, los manda todos
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// GET | /dogs/:id
// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dog = await getDogById(id);
        if (dog) {
            res.status(200).send(dog);
        } else {
            res.status(400).send('dog nout found')
        }
    } catch (error) {
        console.error(error)
        res.status(400).send(error);
    }
});

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

//POST | /dogs
router.post('/', async (req, res) => {
    const {name, height, weight, life_span, image, temperament} = req.body;
  
    try {
      if (!name || !height || !weight || !life_span || !image || !temperament) {
        throw Error ('Falta informacion para crear el perro');
      } else {
        const newDog = await createDog(name, height, weight, life_span, image, temperament);
        res.status(200).json(newDog);
      }
      
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

module.exports = router;


