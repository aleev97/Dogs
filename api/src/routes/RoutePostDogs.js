const router = require('express').Router();
const { createDog } = require('../controllers/PostDogs');
require('dotenv').config();

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