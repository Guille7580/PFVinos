import React, { useState } from 'react'
import './perfil.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { WineLoader } from '../../components/wineLoader/wineLoader'

// function PerfilGoogle () {
//   let user = useSelector(state => state.loginReducer.userDetail)
//   const { nombre, usuario, email } = user || {}
//   return user ? (
//     <div className='perfilContainer'>
//       <div className='btnContainer'>
//         <Link className='editBtn' to='/profile/edit' >
//           Editar
//         </Link>
//         <Link
//           className='editBtn'
//           to='/profile/orders'
//           style={{ textAlign: 'center' }}
//         >
//           Ver mis compras
//         </Link>
//       </div>
//       <div className='dataContainer'>
//         <div>
//           <h5>Nombre: </h5>
//           <h5>Email: </h5>
//           <h5>Usuario: </h5>
//         </div>

//         <div className='infoPerfil'>
//           <h5> {nombre}</h5>
//           <span></span>
//           <h5>{email}</h5>
//           <span></span>
//           <h5>{usuario}</h5>
//           <span></span>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <WineLoader />
//   )
// }

function RegPerfil () {
  let user = useSelector(state => state.loginReducer.userDetail)
  const { nombre, usuario, email, pais, provincia, direccion, telefono } =
    user || {}
  return user ? (
    <div className='perfilContainer'>
      <div className='btnContainer'>
        <h1>Datos de Perfil</h1>
        {/* <Link to='/profile/edit'>
          <button className='editBtn'> Editar</button>
        </Link>
        <Link to='/profile/orders'>
          <button className='editBtn'> Ver mis compras</button>
        </Link> */}
      </div>
      <div className='dataContainer'>
        {/* <div>
          <h5>Nombre: </h5>
          <h5>Email: </h5>
          <h5>Teléfono: </h5>
          <h5>Usuario: </h5>
          <h5>País: </h5>
          <h5>Provincia: </h5>
          <h5>Dirección: </h5>
        </div> */}

        <div className='infoPerfil'>
          <div>
            <h3> Nombre: {nombre}</h3>
          </div>
          <div>
            <h3> Email: {email} </h3>
          </div>
          <div>
            <h3> Teléfono: {telefono} </h3>
          </div>
          <div>
            <h3> Usuario: {usuario} </h3>
          </div>
          <div>
            <h3> País: {pais} </h3>
          </div>
          <div>
            <h3> Provincia: {provincia} </h3>
          </div>
          <div>
            <h3> Dirección: {direccion} </h3>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <WineLoader />
  )
}

export default function Perfil () {
  let user = useSelector(state => state.loginReducer.userDetail)
  //console.log(user)

  return (
    <div>
      <RegPerfil />
    </div>
  )
  // if (user.email.includes('gmail')) {

  //   return (
  //     <div>
  //       <PerfilGoogle />
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div>
  //       <RegPerfil />
  //     </div>
  //   )
  // }
}
