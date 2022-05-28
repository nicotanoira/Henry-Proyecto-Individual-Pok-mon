const axios = require('axios');
const { getDbPokemons, getAllPokemons } = require('../services/pokemonServices.js');
const { Pokemon, Tipo } = require('../db.js')
const { Op } = require("sequelize");
const { Sequelize } = require('sequelize')

// Los controladores reciben y devuelven las peticiones al FrontEnd - Se comunican con los servicios

// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal
module.exports = {
    listPokemonsAndQuery: async function (req, res) {
        const name = req.query.name;
        if (name) {         // If something IS passed by Query, it enters to this try.
            try {
                let name = req.query.name; // We grab our Query.
                
                // Traemos de la Base de Datos el name pasado por Query, si es que existe.
                // We grab the name passed by Query from our Database, if it exists.


                
                //const searchDbPokeName = await getDbPokemons();


                //const searchDbPokeName = await Pokemon.findOne({ where: {name: {[Op.iLike]: name}}})
                const searchDbPokeName = await Pokemon.findOne({where: { name: name }})
                console.log(searchDbPokeName)
                // Si encontramos el name *CASE SENSITIVE* en la Base de Datos, entra en el if y devuelve ese Pokémon
                if (searchDbPokeName !== null) {
                    res.status(200).send(searchDbPokeName);

                    // Si no, chequea si esta en la API.
                } else {
                    name = name.toLowerCase();
                    console.log('MINUSCULA ' + name)
                    const searchApiPokeName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) // Search it in the API
                    // Comprobamos en minuscula si el nombre recibido por Query existe en la API, y si es asi, lo devuelve.
                    // We try to match on lower case if the name received by Query exists in the API. If it does, it returns it.
                    if (searchApiPokeName.data.name.toLowerCase() === name) {
                        res.status(200).send(searchApiPokeName.data);
                    } else {
                        res.status(404).json({message : 'No se encontro el Pokémon solicitado'}) 
                    }
                }
            // If Query was sent but not found, throws an error.            
            } catch (error) {
                console.log(error);
                res.status(404).json({message : 'No se encontro el Pokémon solicitado'})  
            }

        // If NO Query is passed, return every Pokemon. If there's not any from Database, returns the ones from the API.
        } else {
            try {
                const pokemons = await getAllPokemons()
                res.status(200).send(pokemons)
            } catch (error) {
                console.log(error);
                res.status(404).json({message : 'Error - API URL'})  
            }

        }       

    }
} 