import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postPokemon, getTypes} from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux";
import "./form.css"


function validate(input) {
    let errors = {};
    if (!input.name || (input.name.length < 3 && input.name.length > 0)) {
        errors.name = "Name is required. (At least 3 characters)";
    } else if (input.healthPoints > 255 || input.healthPoints < 1 ) {
        errors.healthPoints = "Number must be between 1 and 255."
    } else if (input.attack > 255 || input.attack < 1 ) {
        errors.attack = "Number must be between 1 and 255."
    } else if (input.defense > 255 || input.defense < 1 ) {
        errors.defense = "Number must be between 1 and 255."
    } else if (input.speed > 255 || input.speed < 1 ) {
        errors.speed = "Number must be between 1 and 255."
    } else if (input.height > 65 || input.height < 1 ) {
        errors.height = "Number must be between 1 and 200."
    } else if (input.weight > 2094 || input.weight < 1 ) {
        errors.weight = "Number must be between 1 and 9500."
    } else if (input.types.length > 2 || input.types.length < 1 ) {
        errors.types = "Possible up to 2 types."
    } else if (!input.image) {
        errors.image = "Image is required.";
    }
    
    return errors;
}


export default function PokemonCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "", 
        healthPoints: "", 
        attack: "", 
        defense: "", 
        speed: "", 
        height: "", 
        weight: "", 
        types: [], 
        image: ""
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
        if (input.types.includes(e.target.value) || input.types.length > 1) {
            return null;
        } else {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            });
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name) {
           alert("Add a name.");
        } else if (!input.types) {
            alert("Add at least 1 type.");
        } else if (!input.image) {
           alert("Image is required. - Pick any photo from Google and right-click 'Copy image address'");
        } else if (!errors.name || !errors.types || !errors.image) {
            dispatch(postPokemon(input));
            alert("Pokémon created successfully!");
            setInput({
                name: "", 
                healthPoints: "", 
                attack: "", 
                defense: "", 
                speed: "", 
                height: "", 
                weight: "", 
                types: [], 
                image: ""
            });
            navigate("/home");
        }
    };

    function handleDelete(el){
        setInput({
            ...input,
            types: input.types.filter(type => type !== el)
        });
    };


    return(
        <div className="componentCreate">
            <div className="NavBar">

                {/* Left NavBar Segment */}
                <div className="NavBar-left">
                    {/* Return button */}
                    <Link to="/home">
                        <button className="buttonHome">Back to Home</button>
                    </Link>
                </div>

                {/* Center NavBar Segment */}
                <div className="NavBar-center">
                    {/* Logo and Landing Page button */}
                    <Link to="/">
                            <img className="pokeImg" src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png" alt="logo" height="60"/>
                    </Link>
                </div>

                {/* Right NavBar Segment */}
                <div className="NavBar-right">
                </div>

            </div>
            <div className="create-form">       
                <img className="pokeImg-form" src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png" alt="logo" height="75"/>
                <form onSubmit={(e) => handleSubmit(e)}>

                    {/* Name */}
                    <div className="nameForm">
                        <label>Name: </label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.name} name="name"/>
                        {errors.name && (<p className="error">{errors.name}</p>)}
                    </div>

                    {/* HP */}
                    <div className="nameForm">
                        <label>HP: </label>
                        <input onChange={(e) => handleChange(e)} type="number" value={input.healthPoints} name="healthPoints"/>
                        {errors.healthPoints && (<p className="error">{errors.healthPoints}</p>)}
                    </div>

                    {/* Attack */}
                    <div className="nameForm">
                        <label>Attack: </label>
                        <input onChange={(e) => handleChange(e)} type="number" value={input.attack} name="attack"/>
                        {errors.attack && (<p className="error">{errors.attack}</p>)}
                    </div>

                    {/* Defense */}
                    <div className="nameForm">
                        <label>Defense:</label>
                        <input onChange={(e) => handleChange(e)} type="number" value={input.defense} name="defense"/>
                        {errors.defense && (<p className="error">{errors.defense}</p>)}
                    </div>


                    {/* Speed */}
                    <div className="nameForm">
                        <label>Speed:</label>
                        <input onChange={(e) => handleChange(e)} type="number" value={input.speed} name="speed"/>
                        {errors.speed && (<p className="error">{errors.speed}</p>)}
                    </div>

                    {/* Height */}
                    <div className="nameForm">
                        <label>Height:</label>
                        <input onChange={(e) => handleChange(e)} type="number" value={input.height} name="height"/>
                        {errors.height && (<p className="error">{errors.height}</p>)}
                    </div>

                    {/* Weight */}
                    <div className="nameForm">
                        <label>Weight:</label>
                        <input onChange={(e) => handleChange(e)} type="number" value={input.weight} name="weight"/>
                        {errors.weight && (<p className="error">{errors.weight}</p>)}
                    </div>

                    {/* Image */}
                    <div className="nameForm">
                        <label>Image:</label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.image} name="image"/>
                        {errors.image && (<p className="error">{errors.image}</p>)}
                    </div>

                    {/* Types */}
                    <div className="nameForm">
                        <span className="span-type">Select 1 or 2 Types.</span>
                        <br/>
                        <select className="selectBox" onChange={(e) => handleSelect(e)}>
                            {/* TYPES TO SELECT FROM */}
                            <option>Types</option>
                            {types?.map((el) => (
                                <option value={el.name}>{el.name.replace(el.name[0], el.name[0].toUpperCase())}</option>
                            ))}
                        </select>

                        <div>
                            
                            <label className="cajita">Types selected</label>
                            <br/>
                            {input.types?.map(el => 
                                <div>
                                    <span>{el.replace(el[0], el[0].toUpperCase())}</span>
                                    <button className="ButtonX" type="reset" onClick={() => handleDelete(el)}>X</button>
                                    {errors.image && (<p className="error">{errors.types}</p>)}
                                </div>
                            )}
                        </div>   
                    </div>
                    <button className="buttonHome-form" type="submit">Create Pokémon</button>

                
                    
                </form>
            </div>              
        </div>
    )
};


