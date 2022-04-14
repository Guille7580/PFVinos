import React from 'react'
import { Link } from 'react-router-dom'
import './navBar.css'
import logo from './LasMoritasLogo.png'
import CartBtn from '../ShoppingCartButton/CartBtn'

export default function NavBar () {
  return (
    <div className='container'>
      <Link to='/'>
        <img className='image' src={logo} alt='logo de las moritas' />
      </Link>
      <Link to='/aboutUs' className='button'>
        About Us
      </Link>
      <Link to='/register' className='button'>
        Register
      </Link>
      <Link to='/iniciar' className='button'>
        Iniciar Sesion
      </Link>
      <Link to='/carrito' className='button'>
        <CartBtn />
      </Link>
    </div>
  )
}
