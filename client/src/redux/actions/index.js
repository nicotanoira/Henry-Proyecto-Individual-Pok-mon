import axios from 'axios';

export function getPokemons() {
    return async function(dispatch){
        let json = await axios("http://localhost:3001/pokemons");
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        });
    }
}

export function getNamePokemons(name) {
    return async function (dispatch) {
        try {
            let json = await axios("http://localhost:3001/pokemons?name=" + name)
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterPokemonsByType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}