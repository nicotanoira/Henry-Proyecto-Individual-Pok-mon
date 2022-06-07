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
    const allPokemonsLoad = useSelector((state) => state.allPokemons)
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
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value))
    };

    function handleCreatedFilter(e) {
        dispatch(filterCreated(e.target.value))
    };

    return (
        <div className="homepage">
            {!allPokemonsLoad.length ?
                <div className="loading">
                    <img src='https://pa1.narvii.com/7359/696a2348274d41f3f9029e7ab0628b0c3057a9f8r1-500-250_hq.gif' alt="not found" />
                    <br />
                </div> 
            : 
            <div className="homepage">
                
                {/* --- NavBar ---     */}
                <div className='NavBar'>

                    <div className='NavBar-left'>
                        {/* Pokemon creator */}
                        <Link to='/pokemon'>
                            <button className="buttonHome">Create Pokémon</button>
                        </Link>


                        {/* Refreshes the page to get the Pokémons by Pokédex Order */}
                        <button className="buttonHome" onClick={e => {handleClick(e)}}>
                            Pokédex Order
                        </button>
                    </div>

                    <div className='NavBar-center'>
                        {/* Logo and Landing Page button */}
                        <Link to='/'>
                                <img className='pokeImg' src='https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png' alt='logo' height="60"/>
                        </Link>
                    </div>

                    <div className='NavBar-right'>
                        {/* Pokémon orders */}
                        <select class="custom-select" onChange={e => handleSort(e)}>
                            <option disabled={orden}>Choose an order</option>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                        </select>

                        {/* Pokémon Type filter */}
                        <select class="custom-select" onChange={e => handleTypeFilter(e)}>
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

                        {/* Pokémon origin filter */}
                        <select class="custom-select" onChange={e => handleCreatedFilter(e)}>
                            <option value='all'>All</option>
                            <option value='created'>Created</option>
                            <option value='api'>Original</option>
                        </select>
                    </div>

                </div>
                
                {/* --- SearchBar and Paginado ---     */}
                <div className="search-bar">

                    {/* Searchbar for searching specific pokemons by name */}
                    <SearchBar />

                    {/* Let's you run over the pages of the Pokémons brought by the API and the DataBase */}
                    <Paginado 
                    pokemonsPerPage = {pokemonsPerPage}
                    allPokemons = {allPokemons.length}
                    paginado = {paginado}
                    />

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
        }
        </div>
    );
};