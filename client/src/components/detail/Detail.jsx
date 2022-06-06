import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './detail.css'

export default function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const myPokemon = useSelector((state) => state.detail)

    return (
        <div>
            <div>

            {myPokemon ?
                <div>
                    <h1>{myPokemon.name}</h1>
                    <img src={myPokemon.img ? myPokemon.img : myPokemon.image } />
                    <p>HP: {myPokemon.healthPoints}</p>
                    <p>Attack: {myPokemon.attack}</p>
                    <p>Defense: {myPokemon.defense}</p>
                    <p>Speed: {myPokemon.speed}</p>
                    <p>Height: {myPokemon.height}</p>
                    <p>Weight: {myPokemon.weight}</p>
                    <h4>Types: </h4>
                    {myPokemon.type?.map(el => {
                        if (typeof (el) === 'string') {
                            return (
                                <span className="" key={el}>{el.replace(el[0], el[0].toUpperCase())} </span>
                            )
                        } else {
                            return (
                                <span key={el.name}>
                                    {el.name} 
                                </span>
                            )
                        }
                    })}
                </div> : <div><p>Loading...</p></div>}
            </div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}