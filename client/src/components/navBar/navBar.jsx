import React from 'react'
import { Link } from 'react-router-dom'
import './navBar.css'
import logo from './LasMoritasLogo.png'
import CartBtn from '../ShoppingCartButton/CartBtn'

export default function NavBar () {
  return (
    <div className='navContainer'>
      <Link to='/'>
        <img className='image' src={logo} alt='logo de las moritas' />
      </Link>
      <Link to='/register' className='navButton'>
        Registrar
      </Link>
      <Link to='/iniciar' className='navButton'>
        Iniciar Sesion
      </Link>
      <Link to='/aboutUs' className='navButton'>
        Sobre Nosotros
      </Link>
      <Link to='#' className='navButton'>
       Contacta
      </Link>
      <Link to='/carrito' className='navButton'>
        <CartBtn />
      </Link>
    </div>
  )
}
