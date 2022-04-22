import React, { useState } from 'react'
import './perfil.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { WineLoader } from '../../components/wineLoader/wineLoader'

export default function Perfil () {
  let user = useSelector(state => state.loginReducer.userDetail)
  const { nombre, usuario, email, pais, provincia, direccion, telefono } =
    user || {}

  return user ? (
      
    <div className='perfilContainer'>
        <div>
      <Link className="edit_btn" to='/profile/edit'>
        Editar
      </Link>
      <Link
        className="edit_btn"
        to='/profile/orders'
        style={{ textAlign: 'center' }}
      >
        Ver mis compras
      </Link>
      </div>
      <div className='dataContainer'>
      <div>
        <h5>Nombre: </h5>
        <h5>Email: </h5>
        <h5>Usuario: </h5>
        <h5>Teléfono: </h5>
        <h5>País: </h5>
        <h5>Provincia: </h5>
        <h5>Dirección:   </h5>
      </div>

      <div className='infoPerfil'>
        <h5> {nombre}</h5>
        <span></span>
        <h5>{email}</h5>
        <span></span>
        <h5>{telefono}</h5>
        <span></span>
        <h5>{usuario}</h5>
        <span></span>
        <h5>{pais}</h5>
        <span></span>
        <h5> {provincia}</h5>
        <span></span>
        <h5>{direccion}</h5>
        <span></span>
      </div>
      </div>
    </div>
  ) : (
    <WineLoader />
  )
}
