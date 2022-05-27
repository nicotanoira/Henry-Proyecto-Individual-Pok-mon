const { Router } = require('express');
const axios = require('axios')
const { listApiPokemonsAndQuery } = require('../controllers/listApiPokemonsAndQuery.js');
// const { listApiPokemons } = require('../controllers/listApiPokemons.js');
// const { queryNameAllPokemons } = require('../controllers/queryNameAllPokemons.js');
const { getPokemonById } = require('../controllers/getPokemonById.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons/:idPokemon', getPokemonById);
router.use('/pokemons', listApiPokemonsAndQuery); // Esto lo termine el Jueves 26




// Exportamos router que se va a importar en app.js para poder correr las rutas que armo
module.exports = router;
