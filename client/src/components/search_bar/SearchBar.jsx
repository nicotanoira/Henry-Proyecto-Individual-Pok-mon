import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../../redux/actions';
import "./searchbar.css"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');


    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }



    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNamePokemons(name));
        setName("")
    }

    return (
        <div className="container-search">
            <input type="text" className="input-search" onChange={e => handleInputChange(e)} name="name" placeholder="Search Pokémon..."  />
            <button type="submit" className="buttonHome"  onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
    )
}