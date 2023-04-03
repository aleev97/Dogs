 const { Dog, Temperament } = require('../db.js');
 const { Op } = require('sequelize');
 require('dotenv').config(); 

  const createDog = async (name, height, weight, life_span, image, temperament) => {

     try {
        // verifico si existe un perro con el mismo nombre en la DB. Si es así, lanzo un error.
        // Si no, creo un nuevo registro en la tabla "Dog" con los datos proporcionados 
         const responseDb = await Dog.findAll({
             where: { name: { [Op.iLike]: `%${name}%`,
                 },
             },
         });
         if (responseDb.length) throw Error('Ya existe un perro con ese nombre');

         const newDog = await Dog.create({
             name,
             height,
             weight,
             life_span,
             image,
             temperament
         });

        //Asocia los temps al perro.
        //utilizo el array de temperamentos proporcionado para buscarlos en la tabla "Temperament".
        //Si alguno de los temperamentos proporcionados no existe en la DB, lanzo un error.
         const tempsEncontrados = await Promise.all(
             temperament.map(async (temp) => {
                 const tempEncontrado = await Temperament.findOne({ where: { name: temp } });
    
                 if (!tempEncontrado) {
                     throw new Error(`Tipo de ${temp} no existe`);
                 }
                 return tempEncontrado;
             })
         );


        //utilizo el array de temperamentos para buscarlos en la tabla "Temperament" de la DB.
        //Si alguno de los temperamentos no existe en la DB, lanzo un error.
         tempsEncontrados.forEach(async (temp) => await newDog.addTemperaments(temp));
         const aux = await Dog.findByPk(newDog.id, {
             include: [{model:Temperament }],
         })

         return {name, height, weight, life_span, image, temperament};

     } catch (error) {
         throw Error(error)
     }
 };

 module.exports = { createDog };