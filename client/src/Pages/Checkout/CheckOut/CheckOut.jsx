import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Cart.css";
//import { getUserDetail } from "../../actions/auth";
//import NavBar from '../../components/navBar/navBar'
import { Link } from "react-router-dom";
//import { Loader } from '../../components/Loader/Loader'
//import { updateCart, getCartDb, deleteAllCart, deleteAllCartDB } from '../../actions/carrito'
//import Swal from 'sweetalert2'
import CartItems from "../CartItems/CartItems";
import AnimatedText from "react-animated-text-content";
import { useNavigate } from "react-router-dom";
import { postPedido } from "../../../actions/carrito";


export function calculateTotal(items) {
  return items
    ?.reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2);
}

export default function CheckOut({
  handleAddToCart,
  cartItems,
  setCartItems,
  handleAddToCartButton,
  handleRemoveFromCart,
  handleDeleteFromCart,
  getTotalItems,
}) {
 
  const user = useSelector((state) => state.loginReducer.userDetail);
  const dispatch = useDispatch();
  console.log(user);

  const products = cartItems.map((product) => ({
    productoId: product.id,
    title: product.title,
    amount: product.amount,
  }));
  console.log(products);

  let order = {
    usuarioId: user?.id,
    email: user?.email,
    products: products,
    total: Number(calculateTotal(cartItems)),
    date: new Date().toLocaleString(),
  };
  console.log("-------------------", order);

  const navigate = useNavigate();

  function onFinishPay(e) {
    e.preventDefault();
    dispatch(postPedido(order))
    return navigate('/checkout-page')

}

  return (
    <div>
      <div div className="cartContainer">

        <div className="animatedShopping">
          CheckOut
          </div>
        {/* </AnimatedText> */}
        <div>
          <ul>
            {cartItems?.length === 0 ? <p>No hay items en el carrito</p> : null}
            {cartItems?.map((product) => (
              <CartItems
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDeleteFromCart={handleDeleteFromCart}
                handleAddToCartButton={handleAddToCartButton}
              />
            ))}
          </ul>
          <div className="totalContainer">
            <Link to="/">
              <button className="btnBottom">Seguir Comprando</button>
            </Link>
            <h2>Total: &nbsp; $ {calculateTotal(cartItems)} </h2>
            <Link to="/chekout">
              <button className="btnBottom" onClick={onFinishPay}>Pagar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
