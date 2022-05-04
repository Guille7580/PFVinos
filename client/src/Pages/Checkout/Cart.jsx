import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { getUserDetail } from "../../actions/auth";
//import NavBar from '../../components/navBar/navBar'
import { Link } from "react-router-dom";
import Swal from "sweetalert2"
//import { Loader } from '../../components/Loader/Loader'
//import { updateCart, getCartDb, deleteAllCart, deleteAllCartDB } from '../../actions/carrito'
//import Swal from 'sweetalert2'
import CartItems from "./CartItems/CartItems";
import AnimatedText from "react-animated-text-content";
import { useNavigate } from "react-router-dom";


export function calculateTotal(items) {
  return items
    ?.reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2);
}

export default function Cart({
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
  const navigate = useNavigate()



  const products = cartItems.map((product) => ({
    productoId: product.id,
    title: product.title,
    price: product.price,
    amount: product.amount,
  }));
  //console.log(products)
  
  let order = {
    usuarioId: user?.id,
    email: user?.email,
    products: products,
    total: Number(calculateTotal(cartItems)),
    date: new Date().toLocaleString(),
  };
  console.log(user)

  const handleContinuar = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "No puedes continuar si no hay productos en carrito!",
    });
  }

  const handleLogin = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "No puedes continuar si no iniciaste sesion",
    }).then(r => {
      if(r.isConfirmed) {
    navigate("/login")
      }
    })

    
  }


  

  return (
    <div>
      <div div className="cartContainer">
        
        <div className="animatedShopping">
          Shopping Cart
          </div>
        {/* </AnimatedText> */}
        <div>
          <ul className='ulItems'>
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

            {products.length !==0? (
            <button className="btnBottom" onClick={user !== null?(() => navigate("/checkout")) : (() => handleLogin())  }>Continuar</button>
            ) : <button className="btnBottom" onClick={() => handleContinuar() }>Continuar</button>}
            
          </div>
        </div>
      </div>
    </div>
  );
}
