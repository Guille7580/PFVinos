import React from 'react'
import './Cart.css'
import NavBar from '../../components/navBar/navBar'
import Footer from '../../components/Footer/footer'

export default function Cart () {
  return (
    <div>
      <div div className='cartContainer'>
        <NavBar />
        <h1>Shopping Cart</h1>
        <div className='totalContainer'>
          <h2>Total: &nbsp; </h2>
          <h3>$</h3>
        </div>
        <div className='cartButtons'>
          <div className='cartButton'>
            <button className='buttons'>Eliminar Carrito</button>
            <button className='buttons'>Pagar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
