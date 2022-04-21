import React from 'react'
import style from '../card/card.module.css'

export default function Card ({
  id,
  category,
  age,
  title,
  descriptions,
  price,
  image
})
 {
  return (
    <div className={style.card}>
      <h2>{title}</h2>
      <h3>{category}</h3>
      <img className={style.image} src={image} alt='img not found' />
      <h3>{descriptions}</h3>
      <h4>{age}</h4>
      <h4>${price}</h4>
    </div>
  )
}
