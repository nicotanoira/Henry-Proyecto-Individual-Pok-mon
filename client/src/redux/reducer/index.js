const initialState = {
    pokemons: [],
    allPokemons: [],
    detail: [],
    types: []
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case "GET_NAME_POKEMONS":
            return {
                ...state,
                pokemons: [action.payload]
            }

        case "GET_TYPES":
            return {
                ...state,
                types: action.payload
            }

        case "ORDER_BY_NAME":
            let sortedArr = action.payload === "asc" ?
                state.allPokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allPokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: sortedArr
            }

        case "FILTER_BY_TYPE":
            const allPokemons = state.allPokemons

            if (action.payload === "All") {
                return {
                    ...state,
                    pokemons: allPokemons

                }
            } else {
                let typeFiltered = allPokemons.filter((poke) => {
                    for (let i = 0; i < poke.types.length; i++) {
                        if (poke.types[i] === action.payload) {
                            return true;
                        } else if (poke.types[i].name === action.payload) {
                            return true;
                        }
                    }
                    return false;
                })

                return {
                    ...state,
                    pokemons: [...typeFiltered]
                }
            }
        
        case "POST_POKEMON":
            return {
                ...state
            }

        case "FILTER_CREATED":
            const allPokemons2 = state.allPokemons
            const createdFilter = action.payload === "created" ? allPokemons2.filter(poke => poke.createdInDb) : allPokemons2.filter(poke => !poke.createdInDb)
            return {
                ...state,
                pokemons: action.payload === "All" ? state.allPokemons : createdFilter
            }

        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;