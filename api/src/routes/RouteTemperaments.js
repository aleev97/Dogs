const router = require('express').Router();
const { getAllTemperaments } = require('../controllers/GetTemperaments');

//GET | /temperaments
router.get("/", async (req, res) => {
    try {
        const temperaments = await getAllTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(404).send(error = error.message);
    } 
}); 

module.exports = router;