import React from 'react'

const CheckOutItems = ({ product }) => {
  return (
    <div className='cartItemsContainer'>
      <div className='itemsDetalle'>
        <h4> Nombre: {product.title}</h4>
        <h4>Precio: $ {product.price}</h4>

        <h4>Stock: {product.stock}</h4>
        <h4>Cantidad: {product.amount}</h4>
      </div>

      <div className='subtotalItems'>
        <h4>Subtotal: $ {(product.price * product.amount).toFixed(2)}</h4>
      </div>
    </div>
  )
}

export default CheckOutItems
