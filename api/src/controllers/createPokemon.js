const axios = require('axios');
const { createPokemonForm } = require('../services/pokemonServices.js');
const { Pokemon, Tipo } = require('../db.js');


async function createPokemon(req, res) {
    const { name, healthPoints, attack, defense, speed, height, weight, type, image } = req.body;
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
        let typeDb = await Tipo.findAll({
            where: {
                nombre: type
            }
        });
    
        pokemonCreadoEnDb.addTipo(typeDb);
        
        res.status(201).json(createPokemonForm(name, healthPoints, attack, defense, speed, height, weight, type, image))
    } catch (error) {
        console.log(error)
        res.status().send({message: 'Error!! No se que error'})
    }
}

module.exports = {createPokemon};