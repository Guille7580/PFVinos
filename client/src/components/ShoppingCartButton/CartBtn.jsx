import React from 'react'
import { useSelector } from 'react-redux'
import cart from './shoppingCartIcon.png'
import './CartBtn.css'
//import { BsCart3 } from 'react-icons/bs'

function CartBtn () {
  /* const item = useSelector(state => state.products)
  console.log('=================' + item) */
  return (
    <div>
      {<img src={cart} className='cartButton' alt='icon of a cart' /> 
    /*  {/*  <BsCart3 /> */}
      {/* {item.length} */} 
    </div>
  )
}

export default CartBtn