import React, { useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import './Cart.css'
//import NavBar from '../../components/navBar/navBar'
import { Link } from 'react-router-dom'
//import { Loader } from '../../components/Loader/Loader'
//import { updateCart, getCartDb, deleteAllCart, deleteAllCartDB } from '../../actions/carrito'
//import Swal from 'sweetalert2'
import CartItems from './CartItems/CartItems'

export function calculateTotal (items) {
  return items
    ?.reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2)
}

export default function Cart ({
  handleAddToCart,
  cartItems,
  setCartItems,
  handleRemoveFromCart,
  handleDeleteFromCart,
  getTotalItems
}) {
  /* const navigate = useNavigate();
  const dispatch = useDispatch();

 let items = useSelector((state) => {
    let completeProducts = state.productsReducer.cart.products;
    completeProducts = completeProducts.map((e) => {
      const found = state.productsReducer.allProducts.find((el) => el.id === e.id)
      return found ? { ...found, quantity : e.quantity } : null;
    })
     return completeProducts
   });

 

 const total = useSelector((state)  => state.productsReducer.cart.precioTotal)
const isAuth = useSelector((state) => state.loginReducer.isAuth);
items = items?.filter((e) => e);
 const products = useSelector((state) => state.productsReducer.allProducts)
 const user = useSelector((state) => state.loginReducer.userDetail)
 const cartDB = useSelector((state) => state.productsReducer.carts) */
  return (
    <div>
      <div div className='cartContainer'>
        <h1>Shopping Cart</h1>
        <div className='cartButtons'>
          <div className='cartButton'></div>
        </div>
        <div>
          <ul>
            {cartItems?.length === 0 ? <p>No hay items en el carrito</p> : null}
            {cartItems?.map(product => (
              <CartItems
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDeleteFromCart={handleDeleteFromCart}
              />
            ))}
          </ul>
          <div className='totalContainer'>
            <Link to='/'>
              <button className='btnBottom'>Seguir Comprando</button>
            </Link>
            <h2>Total: &nbsp; $ {calculateTotal(cartItems)} </h2>
            <Link to="#">
            <button className='btnBottom'>Pagar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
