import React from 'react';

export default function Card({ name, image, tipo}) {
    return (
        <div>
            <h3>{ name }</h3>
            <img src={image} alt='Not found' width="200px" height="250px"/>
            <h5>{ tipo }</h5>
        </div>
    );
};