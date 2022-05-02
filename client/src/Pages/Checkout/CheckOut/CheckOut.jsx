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
import { getMercadoPago } from "../../../actions/checkout";
//import './Payment.css'


export function calculateTotal(items) {
  return items
    ?.reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2);
}

export function addCheckout(prefId, check) {

  var mp = new window.MercadoPago('TEST-4639441c-428c-455b-a470-ff0171c740b0', {
      locale: 'es-AR'
  })

  mp.checkout({
      preference: {
          id: prefId,
      },
      render: {
          container: `#pay_button`, // Indica el nombre de la clase donde se mostrará el botón de pago
          label: 'Comprar', // Cambia el texto del botón de pago 
      },
  });
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
  //const Url = useSelector((state) => state.mercadoPago.url);
  console.log(user);

  const products = cartItems.map((product) => ({
    productoId: product.id,
    title: product.title,
    amount: product.amount,
    price: product.price,
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
    dispatch(getMercadoPago({email: user.email, products: products}));
    return navigate('/mercadopago')
    //window.location.href = Url;
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
            <Link to="/pedido/payment">
            <button className="button-mercadopago-payment">
                    Pagar 
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
