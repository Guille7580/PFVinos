import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CheckOut.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { postPedido } from '../../../actions/carrito'
import CheckOutItems from './CheckOutItems/checkoutItems'
import { WineLoader } from '../../../components/wineLoader/wineLoader'

export function calculateTotal (items) {
  return items
    ?.reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2)
}

export default function CheckOut ({ product, cartItems }) {
  const user = useSelector(state => state.loginReducer.userDetail)
  const dispatch = useDispatch()
  console.log(user)

  const products = cartItems.map(product => ({
    productoId: product.id,
    title: product.title,
    amount: product.amount
  }))
  console.log(products)

  let order = {
    usuarioId: user?.id,
    email: user?.email,
    products: products,
    total: Number(calculateTotal(cartItems)),
    date: new Date().toLocaleString()
  }
  console.log('-------------------', order)

  const navigate = useNavigate()

  function onFinishPay (e) {
    e.preventDefault()
    dispatch(postPedido(order))
    return navigate('/checkout-page')
  }

  let users = useSelector(state => state.loginReducer.userDetail)
  const { nombre, usuario, email, pais, provincia, direccion, telefono } =
    user || {}

  return users ? (
    <div>
      <div div className='cartContainer'>
        <div>CheckOut</div>

        <div >
          <ul>
            {cartItems?.length === 0 ? <p>No hay items en el carrito</p> : null}
            {cartItems?.map(product => (
              <CheckOutItems key={product.id} product={product} />
            ))}
          </ul>
        <div>
            <Link to='/'>
              <button>Seguir Comprando</button>
            </Link>
            <h2>Total: &nbsp; $ {calculateTotal(cartItems)} </h2>
            <Link to='/chekout'>
              <button onClick={onFinishPay}>Pagar</button>
            </Link>
          </div>
          
        </div>
        <div className='infoPerfil'>
          <div>
    
            <h5>  Email:   {email} </h5>
            <h5>  Dirección:   {direccion} </h5>
            <h5>  Provincia:   {provincia} </h5>
            <h5>  País:   {pais} </h5>
           
          </div>
   
        </div>
  
      </div>
    </div>
  ) : (
    <WineLoader />
  )
}
