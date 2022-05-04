import React from 'react'
import { Link } from 'react-router-dom'
import './pagoexitoso.css'

export default function PagoExitoso (handleEmptyCart) {
  return (
    <div className='pagoContainer'>
      <h1 className='pagoGracias'>
        !Muchas gracias por tu compra! Estará llegando a tu correo electrónico
        la información de pago.
      </h1>
      <Link to='/' >
        <button className="pagosButton" onClick={handleEmptyCart}>Home </button>
      </Link>
    </div>
  )
}