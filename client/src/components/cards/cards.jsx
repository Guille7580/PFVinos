import React from 'react'
import Card from '../card/card'
import { Link } from 'react-router-dom'
import style from './cards.module.css'

export default function Cards ({ currentProducts, handleAddToCart, cartItems, setCartItems}) {
  //console.log('paginado ' , currentCountries)

  return (
    <div className={style.cards}>
      {currentProducts?.map(el => (
        <div key={el.id}>
          <Link to={'/detalles/' + el.id}>
            <Card handleAddToCart = {handleAddToCart} cartItems = {cartItems} setCartItems = {setCartItems}
              id={el.id}
              category={el.Categorium.nombre}
              age={el.age}
              title={el.title}
              image={el.image}
              descriptions={el.descriptions}
              price={el.price}
            />
          </Link>
        </div>
      ))}
    </div>
  )
}
