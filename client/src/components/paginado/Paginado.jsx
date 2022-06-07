import React from 'react';
import './paginado.css'

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return(
        <div>
            <ul className='paginado'>
                {
                pageNumbers?.map(number => (
                    <li className='number'>
                        <a onClick={ () => paginado(number)}>{number}</a>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}