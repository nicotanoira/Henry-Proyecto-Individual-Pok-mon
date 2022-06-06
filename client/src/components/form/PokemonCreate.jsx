import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postPokemon, getTypes} from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import './form.css'


function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required.';
    } else if (input.healthPoints > 255 || input.healthPoints < 1 ) {
        errors.healthPoints = 'Number must be between 1 and 255.'
    } else if (input.attack > 255 || input.attack < 1 ) {
        errors.attack = 'Number must be between 1 and 255.'
    } else if (input.defense > 255 || input.defense < 1 ) {
        errors.defense = 'Number must be between 1 and 255.'
    } else if (input.speed > 255 || input.speed < 1 ) {
        errors.speed = 'Number must be between 1 and 255.'
    } else if (input.height > 65 || input.height < 1 ) {
        errors.height = 'Number must be between 1 and 65.'
    } else if (input.weight > 2094 || input.weight < 1 ) {
        errors.weight = 'Number must be between 1 and 2094.'
    } else if (input.types.length > 2 || input.types.length < 1 ) {
        errors.types = 'Possible up to 2 types.'
    } else if (!input.image) {
        errors.image = 'Image is required.';
    }
    
    return errors;
}


export default function PokemonCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    
    const [input, setInput] = useState({
        name: '', 
        healthPoints: '', 
        attack: '', 
        defense: '', 
        speed: '', 
        height: '', 
        weight: '', 
        types: [], 
        image: ''
    });

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input));
        alert('Pokémon created successfully!');
        setInput({
            name: '', 
            healthPoints: '', 
            attack: '', 
            defense: '', 
            speed: '', 
            height: '', 
            weight: '', 
            types: [], 
            image: ''
        });
        navigate('/home');
    };

    function handleDelete(el){
        setInput({
            ...input,
            types: input.types.filter(type => type !== el)
        });
    };


    return(
        <div>
            <h1>Create your Pokémon!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input onChange={(e) => handleChange(e)} type='text' value={input.name} name='name'/>
                    {errors.name && (<p className='error'>{errors.name}</p>)}
                </div>

                <div>
                    <label>HP:</label>
                    <input onChange={(e) => handleChange(e)} type='number' value={input.healthPoints} name='healthPoints'/>
                    {errors.healthPoints && (<p className='error'>{errors.healthPoints}</p>)}
                </div>

                <div>
                    <label>Attack:</label>
                    <input onChange={(e) => handleChange(e)} type='number' value={input.attack} name='attack'/>
                    {errors.attack && (<p className='error'>{errors.attack}</p>)}
                </div>

                <div>
                    <label>Defense:</label>
                    <input onChange={(e) => handleChange(e)} type='number' value={input.defense} name='defense'/>
                    {errors.defense && (<p className='error'>{errors.defense}</p>)}
                </div>

                <div>
                    <label>Speed:</label>
                    <input onChange={(e) => handleChange(e)} type='number' value={input.speed} name='speed'/>
                    {errors.speed && (<p className='error'>{errors.speed}</p>)}
                </div>

                <div>
                    <label>Height:</label>
                    <input onChange={(e) => handleChange(e)} type='number' value={input.height} name='height'/>
                    {errors.height && (<p className='error'>{errors.height}</p>)}
                </div>

                <div>
                    <label>Weight:</label>
                    <input onChange={(e) => handleChange(e)} type='number' value={input.weight} name='weight'/>
                    {errors.weight && (<p className='error'>{errors.weight}</p>)}
                </div>

                <div>
                    <label>Image:</label>
                    <input onChange={(e) => handleChange(e)} type='text' value={input.image} name='image'/>
                    {errors.image && (<p className='error'>{errors.image}</p>)}
                </div>

                <select onChange={(e) => handleSelect(e)}>
                    <option>Types:</option>
                    {types?.map((el) => (
                        <option value={el}>{el.replace(el[0], el[0].toUpperCase())}</option>
                    ))}
                </select>

                <div>
                    <label>Select 1 or 2 Types.</label>
                    <br/>
                    <label>Types selected:</label>
                    <br/>
                    {input.types?.map(el => 
                        <div>
                            <span>{el.replace(el[0], el[0].toUpperCase())}</span>
                            <button className='botonX' type="reset" onClick={() => handleDelete(el)}>x</button>
                            {errors.image && (<p className='error'>{errors.image}</p>)}
                        </div>
                    )}
                </div>           
            
            
                <button type='submit'>Create Pokémon</button>
            </form>



            <Link to='/home'><button>Go Back</button></Link>
        </div>
    )
};







//---------------------------------------------------------------------------------------

// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useHistory } from "react-router-dom"
// import { getGenres, getPlatforms, postVideogameCreated } from '../redux/actions.js'
// import './styles/videoGameCreated.css'
// import axios from "axios"

// // const expresionDate = {
// //   date: /^(19|20)(((([02468][048])|([13579][26]))-02-29)|(\d{2})-((02-((0[1-9])|1\d|2[0-8]))|((((0[13456789])|1[012]))-((0[1-9])|((1|2)\d)|30))|(((0[13578])|(1[02]))-31)))$/
// // }
// const expresionDate = {
//   date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
// }


// function validate(videogame) {
//   let errors = {}
//   if (!videogame.name) {
//     errors.name = 'The name of the video game is required'
//   } else if (!videogame.description) {
//     errors.description = 'Add a description of your video game'
//   } else if (parseFloat(videogame.rating) < 1 || parseFloat(videogame.rating) > 5) {
//     errors.rating = 'The rating must be a number from 1 to 5'

//   } else if (!expresionDate.date.test(videogame.released)) {
//     errors.released = ' You must enter date with "dd-mm-yyyy" format '

//   } return errors;
// }


// export default function AddVideogame() {

//   const dispatch = useDispatch()
//   const history = useHistory()
//   const genres = useSelector((state) => state.genres)
//   const platforms = useSelector((state) => state.platforms)


//   const [videogame, setVideogame] = useState({
//     name: "",
//     description: "",
//     image: "",
//     rating: 0,
//     released: "",
//     genre: [],
//     platforms: [],
//   });
//   const [errors, setErrors] = useState({})

//   useEffect(() => {
//     dispatch(getGenres());
//     dispatch(getPlatforms())
//   }, [dispatch])


//   function handleChange(e) {
//     setVideogame({
//       ...videogame,
//       [e.target.name]: e.target.value,

//     })
//     setErrors(validate({
//       ...videogame,
//       [e.target.name]: e.target.value,
//     }))

//   }

//   function handleSelectGenre(e) {
//     setVideogame({
//       ...videogame,
//       genre: [...videogame.genre, e.target.value]

//     })
//   }
//   function handleSelectPlatforms(e) {

//     setVideogame({
//       ...videogame,
//       platforms: [...videogame.platforms, e.target.value]

//     })
//   }

//   function handleDeleteGenres(el) {

//     setVideogame({
//       ...videogame,
//       genre: videogame.genre.filter(e => e !== el)
//     })
//   }
//   function handleDeletePlatforms(el) {

//     setVideogame({
//       ...videogame,
//       platforms: videogame.platforms.filter(e => e !== el)
//     })
//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//     if (!errors.name && !errors.description && !errors.rating) {
//       if (!videogame.name) {
//         alert('You must add a name')
//       } else if (!videogame.description) {
//         alert('You must add a description')
//       } else if (videogame.genre.length < 1) {
//         alert('You must add at least one genre')
//       } else if (videogame.platforms.length < 1) {
//         alert('You must add at least one platform')
//       } else {
//         dispatch(postVideogameCreated(videogame))
//         alert('Videogame Created!')

//         setVideogame({
//           name: "",
//           description: "",
//           image: "",
//           rating: 0,
//           released: "",
//           genre: [],
//           platforms: [],
//         })
//         history.push('/home')
//       }

//     } else {
//       alert('Faltan datos necesarios para crear el videojuego')
//     }
//   }








//   return (
//     <div className="componentCreate">
//       <div className="createButton">
//         <Link to="/home">
//           <button>
//             <h3>Back to Home</h3>
//           </button>
//         </Link>
        
//       </div>

//       <div className="Formulario">
//       <h1>¡Add a new videogame!</h1>
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <div>


//           </div>
          

//           <div className="nameForm">
//             <label>Name:</label>
//             <br />
//             <input
//               type="text"
//               name="name"
//               placeholder="Video game name"
//               value={videogame.name}
//               onChange={(e) => handleChange(e)}
//             />
//             {errors.name && (
//               <p className="error">{errors.name}</p>
//             )}
//           </div>

//           {/* DESCRIPTION */}
//         <div className="nameForm">
//             <label>Description:</label>
//             <br />
//             <input
//               type="text"
//               name="description"
//               placeholder="Description of the video game"
//               value={videogame.description}
//               onChange={(e) => handleChange(e)}
//             />
//             {errors.description && (
//               <p className="error">{errors.description}</p>
//             )}
//           </div>

//           {/* ....IMAGE INPUT.... */}
//           <div className="nameForm">
//             <label>Image URL:</label>
//             <br />

//             <input
//               name="image"
//               type="text"
//               placeholder="URL of the videogame image"
//               value={videogame.image}
//               onChange={(e) => handleChange(e)}
//             />

//           </div>

//           {/* ..... Rating ..... */}
//           <div className="nameForm">
//             <label>Rating:</label>
//             <br />

//             <input
//               name="rating"
//               type="number"
//               value={videogame.rating}
//               onChange={(e) => handleChange(e)}
//             />
//             {errors.rating && (
//               <p className="error">{errors.rating}</p>
//             )}
//           </div>


//           {/* ..... Released ..... */}
//           <div className="nameForm">
//             <label>Released:</label>
//             <br />

//             <input
//               name="released"
//               type="text"
//               placeholder="DD-MM-YYYY"
//               value={videogame.released}
//               onChange={(e) => handleChange(e)}
//             />
//             {errors.released && (
//               <p className="error">{errors.released}</p>
//             )}
//           </div>

//           <div className="genres">

//             <div>
//               {/* ..... Géneros ..... */}
//               <label>Genres: </label>
//               <br />
//             </div>
//             <div>
//               <select  className="selectBox" onChange={(e) => handleSelectGenre(e)} >
//                 <option disabled={videogame.genre.length}>Select Genre</option>
//                 {genres?.map((e) => (
//                   <option value={e.name}>{e.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               {/* ..... Generos Seleccionadas ..... */}

//               <div cassName="cajita">
//                 <label>Genres selected:</label>
//                 <br/>
//                 {videogame.genre?.map(el =>
//                   <div className="cajitaElemento">
//                     <span>{el}</span>
//                     <button className="ButtonX" type="reset" onClick={() => handleDeleteGenres(el)}>X</button>
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>


//           {/* ..... Plataformas ..... */}

//           <div>
//             <div cassName="cajita">
//               <label>Platforms*</label>
//               <br />
//             </div>
//             <div>
//               <select  className="selectBox" onChange={(e) => handleSelectPlatforms(e)} >
//                 <option disabled={videogame.platforms.length}>Select Platform</option>
//                 {platforms?.map((e) => (
//                   <option value={e.name}>{e.name}</option>
//                 )
//                 )}
//                 {errors.genre && (
//                   <p className="error">{errors.genre}</p>
//                 )}
//               </select>
//             </div>

//             {/* ..... Plataformas Seleccionadas ..... */}
//             <div>
//               <label>Platforms selected:</label>
//               <br />
//               {videogame.platforms?.map(el =>
//                 <div className="cajitaElemento">
//                   <span>{el}</span>
//                   <button className="ButtonX" type="reset" onClick={() => handleDeletePlatforms(el)}>X</button>
//                 </div>
//               )}
//             </div>
//           </div>


//           {/* Botón de envío */}
//           <div className="createButton">
//             <button type="submit">Create</button>

//           </div>

//           <br />

//         </form>
//       </div>

//     </div>
//   )
// }