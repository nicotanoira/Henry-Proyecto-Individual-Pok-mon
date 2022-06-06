import React from 'react';
import './card.css'

export default function Card({ name, image, types}) {
    return (
        <div className="card">
            <h3 className="NameTitle">{ name.toUpperCase() }</h3>
            <img src={image} alt='Not found' width="200px" height="250px"/>
            {types?.map(el => {
                if (typeof (el) === 'string') {
                    return (
                        <span className="" key={el}>
                            {el.replace(el[0], el[0].toUpperCase())}
                        </span>
                    )
                } else {
                    return (
                        <span key={el.name}>
                            {el.name}
                        </span>
                    )
                }

            })}
        </div>
    );
};