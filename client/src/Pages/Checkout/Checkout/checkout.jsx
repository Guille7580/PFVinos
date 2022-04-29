import React from 'react'
import { useSelector } from 'react-redux'
import './checkout.css'
import { Link } from "react-router-dom";
// import CartItems from '../CartItems/CartItems'

import { WineLoader } from '../../../components/wineLoader/wineLoader'

export default function Checkout ({product}) {
    let user = useSelector(state => state.loginReducer.userDetail)
  const { nombre, email, pais, provincia, direccion, telefono } =
    user || {}


    let cart = useSelector(state=> state.getCarrito)
    const {productoId, title, amount } = cart || {}
  return user ? (
    <div className='perfilContainer'>
      <div className='btnContainer'>
        <Link to='#'>
          <button className='editBtn'> Pagar</button>
        </Link>
        <Link to='/'>
          <button className='editBtn'> Volver</button>
        </Link>
      </div>
      <div className='dataContainer'>
        <div>
          <h5>Nombre: </h5>
          <h5>Email: </h5>
          <h5>Dirección: </h5>
          <h5>País: </h5>
          <h5>Provincia: </h5>
          <h5>Teléfono: </h5>
          <h5>Product Id: </h5>
          <h5>Title: </h5>
          <h5>Cantidad: </h5>
        </div>

        <div className='infoPerfil'>
          <h5> {nombre}</h5>
          <span></span>
          <h5>{email}</h5>
          <span></span>
          <h5>{direccion}</h5>
          <span></span>
        
          <h5> {provincia}</h5>
          <span></span>
          <h5>{pais}</h5>
          <span></span>
          <h5>{telefono}</h5>
          <span></span>
          <h5>{productoId}</h5>
          <span></span>
          <h5>{title}</h5>
          <span></span>
          <h5>{amount}</h5>
          <span></span>
   
        </div>
        {/* <CartItems /> */}
      </div>
    </div>
  ) : (
    <WineLoader />
  )

}
