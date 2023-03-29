const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env; 

const getAllTemperaments = async () =>{ 
    const allData = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`);
    try {
    let everyTemperament = allData.data
    .map((dog) => (dog.temperament ? dog.temperament : "Has no temperament"))
    .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach((temp) => {
    if (temp) {
        Temperament.findOrCreate({
        where: { name: temp },
        });
    }
    });
    eachTemperament = await Temperament.findAll();
    return eachTemperament;
} catch (error) {
    throw new Error(error = error.message);
}
}

module.exports = {
    getAllTemperaments,
};