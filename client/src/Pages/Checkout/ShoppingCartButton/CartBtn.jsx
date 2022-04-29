import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cart from './shoppingCartIcon.png'
import { wineLoading } from '../../../components/wineLoader/wineLoader'
import './CartBtn.css'
 import { BsCart3 } from 'react-icons/bs'


function CartBtn ({addItemToIcon}) {
   const [item, setItem ] = useState([])
   useEffect(() => {
     setItem(JSON.parse(localStorage.getItem("carrito")))
   }, [])
   
   const items = JSON.parse(localStorage.getItem('carrito'))

   console.log(items)
  
{if(items?.length > 0){
    return (
      <div>
       <BsCart3 /> 
       {items.length} 
      
       </div>
    )
} else {
  return (
    <div>
  <BsCart3 />
  <wineLoading />
  </div>
  )
}}
    
  
}

export default CartBtn


//  const products = cartItems.map((product) => ({
  //   id: product.id,
  //   amount: product.amount,
  // }));
 
  // {cartItems?.map((product) => (
  // <Cart
  // product={product} />
  // ))}
  // console.log(cartItems);
  // const products = cart
   //console.log('=================' + Object.keys(cartItems).length)
    {/* <img src={cart} className='cartButton' alt='icon of a cart' /> */}