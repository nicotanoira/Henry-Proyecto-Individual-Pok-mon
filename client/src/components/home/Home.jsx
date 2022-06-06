import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterPokemonsByType, filterCreated, orderByName } from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import SearchBar from '../search_bar/SearchBar';
import Card from '../card/Card';
import Paginado from '../paginado/Paginado';
import './home.css'

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFisrtPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFisrtPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    function handleClick(e){
        dispatch(getPokemons());
    };

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleTypeFilter(e) {
        dispatch(filterPokemonsByType(e.target.value))
    };

    function handleCreatedFilter(e) {
        dispatch(filterCreated(e.target.value))
    };

    return (
        <div className="homepage">
            <Link to='/pokemon'>Create Pokémon</Link>
            <h1>POKÉMON</h1>
            <button onClick={e => {handleClick(e)}}>
                Pokédex Order
            </button>
            <div>
                <div className='header'>
                    <select onChange={e => handleSort(e)}>
                        <option>Choose an order</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                    </select>

                    <select onChange={e => handleTypeFilter(e)}>
                        <option value='All'>All</option>
                        <option value='normal'>Normal</option>
                        <option value='fighting'>Fighting</option>
                        <option value='flying'>Flying</option>
                        <option value='poison'>Poison</option>
                        <option value='ground'>Ground</option>
                        <option value='rock'>Rock</option>
                        <option value='bug'>Bug</option>
                        <option value='ghost'>Ghost</option>
                        <option value='steel'>Steel</option>
                        <option value='fire'>Fire</option>
                        <option value='water'>Water</option>
                        <option value='grass'>Grass</option>
                        <option value='electric'>Electric</option>
                        <option value='psychic'>Psychic</option>
                        <option value='ice'>Ice</option>
                        <option value='dragon'>Dragon</option>
                        <option value='dark'>Dark</option>
                        <option value='fairy'>Fairy</option>
                        <option value='unknown'>Unknown</option>
                        <option value='shadow'>Shadow</option>
                    </select>

                    <select onChange={e => handleCreatedFilter(e)}>
                        <option value='all'>All</option>
                        <option value='created'>Created</option>
                        <option value='api'>Original</option>
                    </select>

                    <Paginado 
                    pokemonsPerPage = {pokemonsPerPage}
                    allPokemons = {allPokemons.length}
                    paginado = {paginado}
                    />

                    <SearchBar/>
                </div>

                <section className="home-pokemons">
                    {currentPokemons?.map( poke => {
                        return (
                            <div className="pokemon">
                                <Link to={"/home/" + poke.id}>
                                    <Card name={poke.name} image={poke.image} types={poke.types}/>
                                </Link>
                            </div>
                        );
                    })}
                </section>

            </div>
        </div>
    );
};