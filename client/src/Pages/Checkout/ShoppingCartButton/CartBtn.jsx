import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import cart from './shoppingCartIcon.png'
//import  {cartItems}  from '../../../App'
import './CartBtn.css'
 import { BsCart3 } from 'react-icons/bs'
 import Cart from '../Cart'

function CartBtn ({cartItems}) {
  // const item = useSelector(state => state.productsReducer)
  //  const products = cartItems.map((product) => ({
  //   id: product.id,
  //   amount: product.amount,
  // }));
  //console.log(products)
  // {cartItems?.map((product) => (
  // <Cart
  // product={product} />
  // ))}
  // console.log(cartItems);
  // const products = cart
   console.log('=================' + Object.keys(cartItems).length)
  return (
    <div>
      {/* <img src={cart} className='cartButton' alt='icon of a cart' /> */}
       <BsCart3 /> 
       {cart.length} 
    </div>
  )
}

export default CartBtn
