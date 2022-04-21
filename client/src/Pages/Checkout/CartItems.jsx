import React from 'react'

const CartItems = ({product, handleAddToCart, handleRemoveFromCart, handleDeleteFromCart}) => {
  return (
    <div>
        <img src = {product.image} alt = "img not found" width= {100} />
        <h4> nombre :{product.title}</h4>
        <h4>precio : {product.price}</h4>
        <h4>subtotal : {(product.price * product.amount).toFixed(2)}</h4>
        <h4>stock : {product.stock}</h4>
        <h4>cantidad : {product.amount}</h4>

        <button onClick={() => handleAddToCart(product)}>+</button>
        <button onClick={() => handleRemoveFromCart(product.id)}>-</button>
        <button onClick={() => handleDeleteFromCart(product.id)}>borrar</button>

    </div>
  )
}

export default CartItems