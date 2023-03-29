 const { Dog, Temperament } = require('../db.js');
 const { Op } = require('sequelize');
 require('dotenv').config(); 

  const createDog = async (name, height, weight, life_span, image, temperament) => {

     try { 
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

         // Asocia los temps al perro.
         const tempsEncontrados = await Promise.all(
             temperament.map(async (temp) => {
                 const tempEncontrado = await Temperament.findOne({ where: { name: temp } });
    
                 if (!tempEncontrado) {
                     throw new Error(`Tipo de ${temp} no existe`);
                 }
                 return tempEncontrado;
             })
         );

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