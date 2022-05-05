import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
//import { useSearchParams } from "react-router-dom";
import './pagoexitoso.css'
import { changeStatusToComplete } from '../../actions/pedidos'

export default function PagoExitoso (handleEmptyCart) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loginReducer.userDetail)
  console.log('lpmmmmmmmmmmmmmmm', user)

  useEffect(() => {
    console.log('pruebaaaaaaaaaaa')
    return function () {
      if (user) {
        dispatch(changeStatusToComplete(user.email))
      }
    }
  }, [user])

  return (
    <div className='pagoContainer'>
      <h1 className='pagoGracias'>
        !Muchas gracias por tu compra! Estará llegando a tu correo electrónico
        la información de pago.
      </h1>
      <Link to='/'>
        <button className='pagosButton'>Home </button>
      </Link>
    </div>
  )
}
