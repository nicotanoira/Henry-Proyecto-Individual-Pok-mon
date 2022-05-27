const axios = require('axios');
const { getApiPokemons } = require('../services/pokemonServices.js');

module.exports = {
    listApiPokemons: async function (req, res) {
        try {
            const pokemons = await getApiPokemons()
            res.status(200).send(pokemons)
        } catch (error) {
            console.log(error);
            res.status(400).json({message : 'Error - API URL'})  
        }
    }       
}
 