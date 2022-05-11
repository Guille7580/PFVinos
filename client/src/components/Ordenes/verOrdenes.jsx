import React, { useState } from 'react'
import vino from './vino.jpeg'
import './verOrdenes.css'
import { getPedidosByUser } from '../../actions/pedidos'
import { Link } from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function VerOrdenes () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loginReducer.userDetail)
  const pedidos = useSelector(state => state.pedidosReducer.userPedidos)

  console.log(JSON.stringify(pedidos) + 'Acaaaaaaaaaaaaaaaaaaa')

  useEffect(() => {
    dispatch(getPedidosByUser(user.email))
  }, [user])
  console.log(user)

  const products = pedidos
    .map(el => el.products.map(ell => JSON.parse(ell)))
    .flat(2)
  console.log(
    JSON.stringify(products.map(e => e.title)) + 'JEEEEEENENNNNNNNYYYYYYY'
  )
  const orders =
    products.map(e => e.title) &&
    products.map(e => e.quantity) &&
    products.map(e => e.price)
  //const {title, quantity, price } = products
  //   const amount = pedidos
  //     .map(el => el.products.map(ell => JSON.parse(ell)))
  //     .flat()
  //     .map(elll => elll.quantity)
  //   const precio = pedidos.map(ep=> ep.total)
  //     // .map(el => el.products.map(ell => JSON.stringify(ell)))

  //   console.log(precio + 'GGGGGGGGGGGGGGGGGG')
  //   const array = pedidos
  //     .map(el => el.products.map(ell => JSON.parse(ell)))
  //     .flat()
  //     .map(elll => elll.title)

  //   //pedidos.data?.map(el => el.products.map(ell => JSON.parse(ell))).flat().map(elll => elll.title) 🌿
  //   const data = new Set(array)
  //   const pepe = [...data]
  //   console.log(pepe)
  //   const {title, quantity, price} =  products.flat()
  //   .map(elll => elll.title)

  return (
    <div className='containerOrden'>
        <img className = 'imagenimgOrden' src={vino} alt='vino'/>
      <span className=' title'>Ordenes Completados</span>
      <div className='encabezados'>
        <div className='productsContainer'>
          {products.map(e => (
            <div className='products'>
                
              <div>Nombre:   {e.title}</div>

              <div>Cuantidad: {e.quantity}</div>

              <div>Precio: {e.price}</div>
              <div>{e.image}</div>
            </div>
          ))}
   
        </div>
      </div>
      <Link to='/'>
        <button className='btnOrders'>Home</button>
      </Link>
    </div>
  )
}
