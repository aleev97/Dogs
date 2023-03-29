const axios = require('axios'); // importo axios para poder comunicarme con la api
const { Dog, Temperament } = require('../db'); 
const { API_KEY } = process.env;

//me traigo la info desde la api  
const getApiInfo = async () => {
    const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`);
    const apiDogs = await urlApi.data.map((dog) => {
       
        const temps = dog.temperament ? dog.temperament.split(', ') : [];

        return {
            id: dog.id,
            name: dog.name,
            temperament: temps,
            image: dog.image.url,
            weight: dog.weight.imperial,
            height: dog.height,
            life_span: dog.life_span,
        } 
    });

    return apiDogs;
};

//info desde la base de datos
const getDbInfo = async () => {
    const buscarDb = await Dog.findAll(); 
    let infoDb = await buscarDb?.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            temperament: dog.temperament,
            image: dog.image,
            weight: dog.weight,
            height: dog.height,
            life_span: dog.life_span, 
            createInDb: dog.createInDb,
        }
    })
    return infoDb;
}


//relaciono y junto la info
const getAllDogs = async () => {
    const urlApi = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTot = urlApi.concat(dbInfo);
    return infoTot;
}

//busco al perro por id
const getDogById = async (id) => {
const  UUID_REGX =
/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

let dogDb;

if(UUID_REGX.test(id)){
  //Obtenemos el perro de la DB mediante el ID
  dogDb = await Dog.findOne({
    where: { id : id },
    include: {
      model: Temperament,
      through: {
        attributes: [],
      },
    },
  });  
}

if(dogDb) return dogDb;

let allDogApi = await getApiInfo()
const dog = await allDogApi.find(dog => dog.id === Number(id))
if(!dog) throw Error (`Dog ${id} doesnt exist`)
return dog

}
module.exports = {
    getAllDogs,
    getDbInfo,
    getApiInfo,
    getDogById,
}