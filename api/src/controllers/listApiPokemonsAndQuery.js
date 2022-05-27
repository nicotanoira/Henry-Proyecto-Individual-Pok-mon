const axios = require('axios');
const { getDbPokemons, getAllPokemons } = require('../services/pokemonServices.js');

// Los controladores reciben y devuelven las peticiones al FrontEnd - Se comunican con los servicios

// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal
module.exports = {
    listApiPokemonsAndQuery: async function (req, res) {
        const name = req.query.name;
        if (name) {         // If something IS passed by Query, it enters to this try.
            try {
                const name = (req.query.name).toLowerCase(); // We convert our Query name to lower case.
                const searchApiPokeName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) // Search it in the API
    
                // Traemos de la Base de Datos el name pasado por Query, si es que existe.
                // We grab from our Database the name passed by Query, if it exists.
                const searchDbPokeName = await getDbPokemons();
                
                // Comprobamos en minuscula si el nombre recibido por Query existe en la API, y si es asi, lo devuelve.
                // We try to match on lower case if the name received by Query exists in the API. If it does, it returns it.
                if (searchApiPokeName.data.name.toLowerCase() === name) {
                    res.status(200).send(searchApiPokeName.data);
                }
                
                // Hacemos otra comprobacion para ver si esta en la Base de Datos.
                // We try another match on the Query's name and the Database
                if (searchDbPokeName.includes(name)) {
                    const DbPokeFound = searchDbPokeName.find(pokeI => pokeI.name === name);
                    res.status(200).json(DbPokeFound)
                }
            // If Query was sent but not found, throws an error.            
            } catch (error) {
                console.log(error);
                res.status(400).json({message : 'No se encontro el Pokémon solicitado'})  
            }
                            // If NO Query is passed, return every Pokemon. If there's not any from Database, returns the ones from the API.
        } else {
            try {
                const pokemons = await getAllPokemons()
                res.status(200).send(pokemons)
            } catch (error) {
                console.log(error);
                res.status(400).json({message : 'Error - API URL'})  
            }

        }       

    }
} 