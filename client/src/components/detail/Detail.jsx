import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { OBJECT_TYPE } from "../../shared/TypeImages";
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
            <div className="all-card">
                {myPokemon.id != id ?
                <div className="loading">
                    <img className='loading-detail' src='https://pa1.narvii.com/7359/696a2348274d41f3f9029e7ab0628b0c3057a9f8r1-500-250_hq.gif' alt="loading"/>
                    <br/>
                </div> : 

                <div className='all-detail'>

                    <div className='NavBar'>

                        {/* Left NavBar Segment */}
                        <div className='NavBar-left'>
                            {/* Return button */}
                            <Link to='/home'>
                                <button className="buttonHome">Back to Home</button>
                            </Link>
                        </div>

                        {/* Center NavBar Segment */}
                        <div className='NavBar-center'>
                            {/* Logo and Landing Page button */}
                            <Link to='/'>
                                    <img className='pokeImg' src='https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png' alt='logo' height="60"/>
                            </Link>
                        </div>

                        {/* Right NavBar Segment */}
                        <div className='NavBar-right'></div>

                    </div>

                    <div className="detail-body">

                        
                        <div className="card-detail">
                            <h1 className="title">{(myPokemon.name)}</h1>
                            <img className="imgDetailCard" src={myPokemon.img ? myPokemon.img : myPokemon.image } />
                            <p className="text">HP: {myPokemon.healthPoints}</p>
                            <p className="text">Attack: {myPokemon.attack}</p>
                            <p className="text">Defense: {myPokemon.defense}</p>
                            <p className="text">Speed: {myPokemon.speed}</p>
                            <p className="text">Height: {myPokemon.height}</p>
                            <p className="text">Weight: {myPokemon.weight}</p>
                            <h3 className="types">Types: </h3>
                            {myPokemon.type?.map(el => {
                                if (typeof (el) === 'string') {
                                    return (
                                        <span className="type" key={el}><img src={OBJECT_TYPE[el]} width="35" height="35"/></span>
                                    )
                                } else {
                                    return (
                                        <span key={el}>
                                            {el} 
                                        </span>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}