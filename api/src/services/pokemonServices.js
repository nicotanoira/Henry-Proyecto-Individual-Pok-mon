const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

// Axios despues de hacer un request devuelve un arreglo ENORME donde -             !!!!!!
// la info que buscamos del URL esta almacenada en una propiedad llamada 'data' -   !!!!!!

// Son los programas que acceden a la API externas o Bases de datos. UNA SOLA


/*  Esta funcion devuelve un una lista de Pokémons con sus datos.
@return Pokémon[]: Datos de los Pokémon.                        */
async function getApiPokemons() {
  // Variable de retorno.
  const pokeArr = [];

  // Obtengo la lista completa de Pokémons con su nombre y URL.
  const pokesApi = await axios.get('https://pokeapi.co/api/v2/pokemon');

  // Dentro de la API trae los primeros 20 Pokémons. Con su propiedad 'data.next' sacamos los siguientes 20.
  const pokesApiNext = await axios.get(pokesApi.data.next);

  // Como tengo que traer 40 Pokémons a la ruta principal, concateno los primeros 20 y segundos 20 para trabajar con los 40 y devolverlos.
  const all40Pokes = [
    ...pokesApi.data.results,
    ...pokesApiNext.data.results,       // Esto me devuelve un ARRAY de 40 objetos que tienen {name: POKENAME, url: 'https://pokeapi.co/api/v2/pokemon/NUM/' }
  ];
  
  // Obtengo la info de CADA Pokémon via su URL en formato de PROMESAS. ---- [Promise { <pending> }, Promise { <pending> }.........etc]
  const pokeUrl = all40Pokes.map(pokemon => {return axios(pokemon.url)})
  

  // Proceso las PROMESAS y devuelvo el resultado final.
  return Promise.all(pokeUrl).then(
      r => {
          r.forEach(pokemon => {
              pokeArr.push({
                  id: pokemon.data.id,
                  name: pokemon.data.name,
                  healthPoints: pokemon.data.stats[0].base_stat,
                  attack: pokemon.data.stats[1].base_stat,
                  defense: pokemon.data.stats[2].base_stat,
                  speed: pokemon.data.stats[5].base_stat,
                  height : pokemon.data.height,
                  weight: pokemon.data.weight,
                  type: pokemon.data.types.map(pokemon => pokemon.type.name),
                  image: pokemon.data.sprites.front_default
              })
          })
          return pokeArr;
      }   
  )
};





// Traemos los Pokémons de la base de datos.
async function getDbPokemons() {
// Buscamos todo lo que tenga la base de datos en la tabla Pokémon que incluya el modelo Type
  const pokesDb = await Pokemon.findAll({
      includes: {
      model: Type,
      attributes: ['name'],
      through: {
          attributes: [],
      },
      },
  });
  return pokesDb;
};





// Devuelve un ARRAY con TODOS los Pokémons de la API y la Base de Datos juntos.
async function getAllPokemons() {
  const apiData = await getApiPokemons();
  const dbData = await getDbPokemons();
  const dbAndApiPokemons = apiData.concat(dbData);
  return dbAndApiPokemons;
}



async function searchPokemonByIdApi(id) {
  const pokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
      id: pokeId.data.id,
      name: pokeId.data.name,
      healthPoints: pokeId.data.stats[0].base_stat,
      attack: pokeId.data.stats[1].base_stat,
      defense: pokeId.data.stats[2].base_stat,
      speed: pokeId.data.stats[5].base_stat,
      height : pokeId.data.height,
      weight: pokeId.data.weight,
      type: pokeId.data.types.map(pokemon => pokemon.type.name),
      image: pokeId.data.sprites.front_default
  };
}




module.exports = {getApiPokemons, getDbPokemons, getAllPokemons, searchPokemonByIdApi}
