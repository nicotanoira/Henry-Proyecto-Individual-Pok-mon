import React from "react";
import "./card.css";
import { OBJECT_TYPE } from "../../shared/TypeImages";

export default function Card({ name, image, types}) {
    return (
        <div className="card">
            <h3 className="name-title">{ name.toUpperCase() }</h3>
            <img src={image} alt="Not found" width="200px" height="200px"/>
            <div>
                {types?.map(el => {
                    if (typeof (el) === "string") {
                        return (
                           <span className="type" key={el}><img src={OBJECT_TYPE[el]} width="45" height="45"/></span>
                        )
                    } else {
                        return (
                            <span className="type" key={el.name}><img src={OBJECT_TYPE[el.name]} width="45" height="45"/></span>
                        )
                    }

                })}
            </div>
        </div>
    );
};