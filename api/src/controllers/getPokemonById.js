const axios = require('axios');
const { searchPokemonByIdApi, searchPokemonByIdDb } = require('../services/pokemonServices.js');

async function getPokemonById(req, res) {
    try {  
        const id = req.params.idPokemon;
        let foundPokemon = {};
        if (id.length > 8) {
            foundPokemon = await searchPokemonByIdDb(id);
            console.log(foundPokemon)
        } else {
            foundPokemon = await searchPokemonByIdApi(id);
            console.log(foundPokemon)
        }
        res.status(200).send(foundPokemon);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: 'Error 404 - Not Found'})
    }
}


module.exports = {getPokemonById};
