import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './checkout.css'
import { Link, useNavigate } from 'react-router-dom'
import { WineLoader } from '../../../components/wineLoader/wineLoader'
import { getPedidosByUser } from '../../../actions/pedidos'

// let order = {
//   usuarioId: user?.id,
//   email: user?.email,
//   products: products,
//   total: Number(calculateTotal(cartItems)),
//   date: new Date().toLocaleString(),
// };

export default function Checkout (order) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //  const email = useSelector(state => state.pedidosReducer.getPedidosByUser)
  //  console.log(email + "++++++++++++++++" )
  //  const user = useSelector((state) => state.loginReducer.userDetail);
  let user = order.map(el => {
    el.usuario,
    el.email ,
    el.products ,
    el.total,
    el.date
  })
  console.log(user)

  return (
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
        </div>
        {/* 
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
        
   
        </div> */}
      </div>
    </div>
  )
  // ) : (
  //   <WineLoader />
  // )
}
