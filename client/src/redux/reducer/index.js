

const initialState = {
    pokemons: [],
    allPokemons: []
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }

        case 'ORDER_BY_NAME':
            // if(action.payload === 'pokedex') {
            //     return {
            //         ...state,
            //         pokemons: state.allPokemons
            //     }
            // }
            let sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: sortedArr
            }

        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons
            const typeFiltered = action.payload === 'All' ? allPokemons : allPokemons.filter(poke => poke.type === action.payload)
            return {
                ...state,
                pokemons: typeFiltered
            }

        case 'FILTER_CREATED':
            const allPokemons2 = state.allPokemons
            const createdFilter = action.payload === 'created' ? allPokemons2.filter(poke => poke.createdInDb) : allPokemons2.filter(poke => !poke.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
            }

        default:
            return state;
    }
}

export default rootReducer;