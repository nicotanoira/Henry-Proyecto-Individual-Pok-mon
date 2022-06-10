import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../../redux/actions';
import "./searchbar.css"

function validate(input) {
    let error = "";
    if (input === "") {
        error = "PLEASE INSERT A NAME  ";
    }
    return error;
}

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [error, setError] = useState('');


    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value.trim());
    }


    // The AWAIT waits for dispatch to finish getting the pokemon before CLEARING the input in the placeholder
    async function handleSubmit(e) {
        e.preventDefault();
        if (name !== "") {
            await dispatch(getNamePokemons(name));
            setName("")
        }
        setError(validate(name))
    }

    return (
        <div className="container-search">
            <input type="text" className="input-search" onChange={e => handleInputChange(e)} name="name" value={name} placeholder="Search Pokémon..."  />
            <button type="submit" className="buttonHome"  onClick={(e) => handleSubmit(e)}>Search</button>
            {error && (<p className="search-error">{error}<img src="https://www.pngplay.com/wp-content/uploads/12/Snorlax-Pokemon-PNG-Background.png" width="30px" height="28px" /></p>)}
        </div>
    )
}