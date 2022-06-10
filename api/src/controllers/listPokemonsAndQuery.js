const axios = require("axios");
const { getDbPokemons, getAllPokemons } = require("../services/pokemonServices.js");
const { Pokemon, Type } = require("../db.js")


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
                const searchDbPokeName = await Pokemon.findOne({
                    where: { name: name },
                    include: [
                        { model: Type, attributes: ["id", "name"] }
                    ]
                })

                // Si encontramos el name *CASE SENSITIVE* en la Base de Datos, entra en el if y devuelve ese Pokémon
                if (searchDbPokeName !== null) {
                    res.status(200).send(searchDbPokeName);

                    // Si no, chequea si esta en la API.
                } else {
                    // Pasamos el QUERY a Lower Case.
                    name = name.toLowerCase();

                    const searchApiPokeName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) // Search it in the API
                    // Comprobamos en minuscula si el nombre recibido por Query existe en la API, y si es asi, lo devuelve.
                    // We try to match on lower case if the name received by Query exists in the API. If it does, it returns it.
                    if (searchApiPokeName.data.name.toLowerCase() === name) {
                        // We get from the API the info to-be shown to the FrontEnd.
                        const pokeInfoRequested = {
                                id: searchApiPokeName.data.id,
                                name: searchApiPokeName.data.name,
                                healthPoints: searchApiPokeName.data.stats[0].base_stat,
                                attack: searchApiPokeName.data.stats[1].base_stat,
                                defense: searchApiPokeName.data.stats[2].base_stat,
                                speed: searchApiPokeName.data.stats[5].base_stat,
                                height: searchApiPokeName.data.height,
                                weight: searchApiPokeName.data.weight,
                                type: searchApiPokeName.data.types.map(pokemon => pokemon.type.name),
                                image: searchApiPokeName.data.sprites.front_default
                              }

                        // We send the Pokémon the way it's requested.
                        res.status(200).send(pokeInfoRequested);
                    } else {
                        res.status(404).json({message : "No se encontro el Pokémon solicitado"}) 
                    }
                }
            // If Query was sent but not found, throws an error.            
            } catch (error) {
                console.log(error);
                res.status(404).json({message : "No se encontro el Pokémon solicitado"})  
            }

        // If NO Query is passed, return every Pokemon. If there's not any from Database, returns the ones from the API.
        } else {
            try {
                const pokemons = await getAllPokemons()
                res.status(200).send(pokemons)
            } catch (error) {
                console.log(error);
                res.status(404).json({message : "Error - API URL"})  
            }

        }       

    }
} 