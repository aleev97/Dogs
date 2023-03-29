const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo  
    sequelize.define('Temperament', {
        id: {
            type: DataTypes.INTEGER, //coloco el UUID para que genere un id aleatorio
            allowNull: false, //no debe estar vacio
            autoIncrement: true // el id se autoincrementa 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
    },
        { timestamps: false }
    );
};







