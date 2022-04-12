import React from 'react'
import { Link } from 'react-router-dom'
import './navBar.css'

export default function NavBar() {
  return (
    <div className='container'>Hello 
      <Link to='/home' className='button'>
        Home
      </Link>
      <Link to='/register' className='button'>
        Register
      </Link>
      <Link to='/iniciarSesion' className='button'>
        Iniciar Sesion
      </Link>
      <Link to='/carrito' className='button'>
        Carrito
      </Link>
    </div>
  )
}



