const axios = require('axios');
const { getApiTypes } = require('../services/pokemonServices.js');
const { Tipo } = require('../db.js');


async function getPokemonTypes(req, res) {
    try {
        // Gets the ARRAY of Types from Services.
        const foundTypes = await getApiTypes();

        // Adds each Type to the Database.
        foundTypes.forEach(el => {
            if (el !== null && el !== '') {
                Tipo.findOrCreate({ where: { nombre: el } })
            }
        });

        // Sends all the types.
        res.status(200).send(foundTypes);
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: 'API is down.' });
    }
};

module.exports = { getPokemonTypes };