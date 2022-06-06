const axios = require('axios');
const { createPokemonForm } = require('../services/pokemonServices.js');
const { Pokemon, Type } = require('../db.js');


async function createPokemon(req, res) {
    const { name, healthPoints, attack, defense, speed, height, weight, types, image } = req.body;
    try {
        // Creates the Pokémon in the Database
        const pokemonCreadoEnDb = await Pokemon.create({
            name,
            healthPoints,
            attack,
            defense,
            speed,
            height,
            weight,
            image
        });
    
        // Adds the
        let typeDb = await Type.findAll({
            where: {
                name: types
            }
        });
    
        pokemonCreadoEnDb.addType(typeDb);
        
        res.status(201).json(createPokemonForm(name, healthPoints, attack, defense, speed, height, weight, types, image))
    } catch (error) {
        console.log(error)
        res.status().send({message: 'Error!! No se que error'})
    }
}

module.exports = {createPokemon};