import React from "react";
import style from '../card/card.module.css'

export default function Card ({id,title,descriptions,price,image}) {
    return (
        <div className={style.card}>
            
            <h2>{title}</h2>
            <img src={image} alt="img not found" width="150px" height="100px" />
            <h3>{descriptions}</h3>
            <h4>{id}</h4>
            <h4>{price}</h4>
            
        </div>
    )
}