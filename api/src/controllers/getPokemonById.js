const axios = require('axios');
const { searchPokemonByIdApi } = require('../services/pokemonServices.js');

async function getPokemonById(req, res) {
    try {  
        const id = req.params.idPokemon;
        const foundPokemon = await searchPokemonByIdApi(id);
        console.log(foundPokemon)
        res.status(200).send(foundPokemon);
    } catch (error) {
        res.status(404).json({message: 'Error 404 - Not Found'})
    }
}


module.exports = {getPokemonById};
