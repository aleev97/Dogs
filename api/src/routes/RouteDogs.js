const router = require('express').Router();
const { getAllDogs, getDogById } = require('../controllers/GetDogs');
const { createDog } = require('../controllers/PostDogs');

// obtengo un arreglo de objetos, donde cada objeto representa una raza de perro.
// Utilizo el método GET y agrego una query opcional para filtrar por nombre.
// Si se especifica un nombre, se filtra la lista de perros por ese nombre y se devuelve el resultado.
// Si no se especifica ningún nombre, se devuelve la lista completa de perros.
router.get('/', async (req, res) => {
    const name = req.query.name;
    try {
        const totalDogs = await getAllDogs(name);

        if (name) {  
            const dogName = totalDogs.filter(
                (dog) => dog.name.toLowerCase().includes(name.toLocaleLowerCase())
            );
            dogName.length
                ? res.status(200).json(dogName) 
                : res.status(400) 
                    .send('Sorry I dont have dogs with that name');
        } else {
            res.status(200).json(totalDogs);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// GET | /dogs/:id
//utilizo método GET para obtener el detalle de un perro específico, a través de identificador (id) en la URL.
//Si el perro existe, devuelvo el objeto con toda su información.
//Si no se encuentra, devuelvo un mensaje de error.
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
//Filtro la lista de perros por nombre, pero esta vez se espera recibir el nombre como query en la URL.
//Devuelvo una lista con los perros que coincidan con el nombre o un mensaje de error si no hay coincidencias.
router.get('/', async (req, res) => {
    const name = req.query.name.toLocaleLowerCase();
    try {

        if (name) {
            const allDogs = await getAllDogs();
            const dogs = [...allDogs].filter((dog) => dog.name.toLowerCase().includes(name.toLocaleLowerCase()));
        }
        if (dogs.length) { 
            res.status(200).json(dogs)
        }
        else {
            res.status(404).json({ message: 'no dogs found with that name' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

//POST | /dogs
//ruta POST para crear un nuevo perro en la base de datos.
//Espero recibir los datos del nuevo perro en el cuerpo de la solicitud (name, height, weight, life_span, image, temperament).
//Si falta algún dato, devuelvo un mensaje de error.
//Si se completa la información, se crea un nuevo objeto perro en la base de datos y devuelvo la información del perro creado.
router.post('/', async (req, res) => {
    const {name, height, weight, life_span, image, temperament} = req.body;
  
    try {
      if (!name || !height || !weight || !life_span || !image || !temperament) {
        throw Error ('Missing information to create the dog');
      } else {
        const newDog = await createDog(name, height, weight, life_span, image, temperament);
        res.status(200).json(newDog);
      }
      
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

module.exports = router;


