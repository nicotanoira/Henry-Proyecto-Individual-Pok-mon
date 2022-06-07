const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

// SERVICIOS = Son los programas que acceden a la API externas o Bases de datos.

// Axios despues de hacer un request devuelve un arreglo ENORME donde -             !!!!!!
// la info que buscamos del URL esta almacenada en una propiedad llamada 'data' -   !!!!!!



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
    ...pokesApi.data.results,           // Esto me devuelve un ARRAY concatenado de 40 objetos que tienen 
    ...pokesApiNext.data.results,       // {name: POKENAME, url: 'https://pokeapi.co/api/v2/pokemon/NUM/' }.
  ];                                    

  // Obtengo la info de CADA Pokémon via su URL en formato de PROMESAS. ---- [Promise { <pending> }, Promise { <pending> }.........etc]
  const pokeUrl = all40Pokes.map(pokemon => { return axios(pokemon.url) });


  // Proceso las PROMESAS y devuelvo el resultado final.
// Return de la FUNCION
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
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          types: pokemon.data.types.map(pokemon => pokemon.type.name),
          image: pokemon.data.sprites.front_default
        })
      })
      // Return de la PROMESA
      return pokeArr;
    }
  );
};





// Traemos los Pokémons de la base de datos.
async function getDbPokemons() {
  // Buscamos todo lo que tenga la base de datos en la tabla Pokémon que incluya el modelo Type.
  const pokesDb = await Pokemon.findAll({
    include:[{
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }],
  });
  return pokesDb;
};




// Devuelve un ARRAY con TODOS los Pokémons de la API y la Base de Datos juntos.
async function getAllPokemons() {
  const apiData = await getApiPokemons();
  const dbData = await getDbPokemons();
  //console.log('DB!!!!!! ' + dbData)
  const dbAndApiPokemons = apiData.concat(dbData);
  return dbAndApiPokemons;
};


// Busca un Pokémon ESPECIFICO pasado por parametro id (que el controlador se va a encargar de manejar) y trae todas sus propiedades.
async function searchPokemonByIdApi(id) {
  const pokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
    id: pokeId.data.id,
    name: pokeId.data.name,
    healthPoints: pokeId.data.stats[0].base_stat,
    attack: pokeId.data.stats[1].base_stat,
    defense: pokeId.data.stats[2].base_stat,
    speed: pokeId.data.stats[5].base_stat,
    height: pokeId.data.height,
    weight: pokeId.data.weight,
    type: pokeId.data.types.map(pokemon => pokemon.type.name),
    image: pokeId.data.sprites.front_default
  };
};

async function searchPokemonByIdDb(id) {
  const pokeId = await Pokemon.findByPk(id, 
    {include: [{ 
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }}]});
  return pokeId
}

// Busca en la API los 20 TIPOS de Pokémon y los devuelve en un ARRAY.
async function getApiTypes() {
  let typeArr = [];
  const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
  const pokeTypes = typesApi.data.results.map(type => { typeArr.push(type.name) });
  return typeArr;
}

// Id is given automatically.
// Creamos el "molde" donde vamos a insertar la informacion que nos pasen por Body para despues devolverla ya completa.
function createPokemonForm(name, healthPoints, attack, defense, speed, height, weight, type, image) {
  return {
    name,
    healthPoints,
    attack,
    defense,
    speed,
    height,
    weight,
    type,
    image
  };
};

module.exports = { getApiPokemons, getDbPokemons, getAllPokemons, searchPokemonByIdApi, getApiTypes, createPokemonForm, searchPokemonByIdDb }
