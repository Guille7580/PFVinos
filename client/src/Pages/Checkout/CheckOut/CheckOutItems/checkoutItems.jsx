import React from 'react'
import './checkoutitems.css'

const CheckOutItems = ({ product }) => {
  return (
    <div className='itemsDetalle'>
      <div >
        <h4> Nombre: {product.title}</h4>
        <h4>Precio: $ {product.price}</h4>
        <h4>Cantidad: {product.amount}</h4>
      </div>

      <div>
        <h4>Subtotal: $ {(product.price * product.amount).toFixed(2)}</h4>
      </div>
    </div>
  )
}

export default CheckOutItems
