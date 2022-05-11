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
    .flat(1)
  console.log(
    JSON.stringify(products.map(e => e.title)) + 'JEEEEEENENNNNNNNYYYYYYY'
  )

  const orders = pedidos.map(e => e.total)
  console.log(orders + ' aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

  return (
    <div className='containerOrden'>
      <img className='imagenimgOrden' src={vino} alt='vino' />

        <span className=' titleOrder'>Ordenes Completados</span>
      <div className='productsContainer'>
        {pedidos.map(e => (
          <div className='pedidos'>
            <div>
              Nombre:{' '}
              {e.products
                .map(ell => JSON.parse(ell))
                .flat(2)
                .map(a => a.title)+",  "}
               
            </div>
            <div>
              Cantidad:{' '}
              {e.products
                .map(ell => JSON.parse(ell))
                .flat(0)
                .map(a => a.quantity)
                .reduce((a, b) => a + b)}
            </div>

            <div>Status: {e.status}</div>
            <div>Fecha: {e.date}</div>
            {/* <div>
              Precio Unitario: $
              {e.products
                .map(ell => JSON.parse(ell))
                .flat(0)
                .map(a => a.price).reduce((a, b) => a + b)}
            </div> */}
            <div>Total: ${e.total}</div>
            <div>
              <Link
                to={`/detalles/${e.products
                  .map(ell => JSON.parse(ell))
                  .flat(0)
                  .map(a => a.productoId)}`}
              >
                Comprar de Nuevo
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to='/'>
        <button className='btnOrders'>Home</button>
      </Link>
    </div>
  )
}
