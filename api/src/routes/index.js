const router = require('express').Router();
const axios = require('axios');

// Importar todos los routers;
const RouteDogs = require('./RouteDogs');
const RouteTemperaments = require('./RouteTemperaments');

// Configurar los routers
router.use('/dogs', RouteDogs); //siempre uso las rutas marcadas en RouterDogs
router.use('/temperaments', RouteTemperaments);

module.exports = router;
  