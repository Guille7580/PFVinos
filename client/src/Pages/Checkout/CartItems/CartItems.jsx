import React from 'react'
import './CartItems.css'

const CartItems = ({
  product,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
  handleAddToCartButton
}) => {
  return (
    <div className='cartItemContainer'>
      <div>
        <img src={product.image} alt='img not found' className='itemImg' />
      </div>
      <div className='itemDetalle'>
        <h4> Nombre: {product.title}</h4>
        <h4>Precio: $ {product.price}</h4>

        <h4>Stock: {product.stock}</h4>
        <h4>Cantidad: {product.amount}</h4>
      </div>
      <div className='btnMasMenos'>
      <button
          className='btnItems1'
          onClick={() => handleRemoveFromCart(product.id)}
        >
          -
        </button>
        <button
className='btnItems2'
          onClick={() => handleDeleteFromCart(product.id)}
        >
          Borrar
          </button>
        <button className='btnItems3' onClick={() => handleAddToCart(product) }>
          +
          
        </button>
      </div>
      <div className='subtotalItem'>
        <h4>Subtotal: $ {(product.price * product.amount).toFixed(2)}</h4>
      </div>
    </div>
  )
}

export default CartItems
