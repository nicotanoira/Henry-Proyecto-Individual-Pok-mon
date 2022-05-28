const { Router } = require('express');
const axios = require('axios')
const { listPokemonsAndQuery } = require('../controllers/listPokemonsAndQuery.js');
// const { listApiPokemons } = require('../controllers/listApiPokemons.js');
// const { queryNameAllPokemons } = require('../controllers/queryNameAllPokemons.js');
const { getPokemonById } = require('../controllers/getPokemonById.js');
const { getPokemonTypes } = require('../controllers/getPokemonTypes.js');
const { createPokemon } = require('../controllers/createPokemon.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Get by ID
router.get('/pokemons/:idPokemon', getPokemonById);

// Post with Body
router.post('/pokemons', createPokemon);

// Get all Pokemons with QUERY if added
router.get('/pokemons', listPokemonsAndQuery);

// Get all TYPES
router.get('/types', getPokemonTypes);







// Exportamos router que se va a importar en app.js para poder correr las rutas que armo
module.exports = router;
