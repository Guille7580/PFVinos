import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import cart from "./shoppingCartIcon.png";
//import  {cartItems}  from '../../../App'
import "./CartBtn.css";
import { BsCart3 } from "react-icons/bs";
//import Cart from '../Cart'

function CartBtn() {
  const [items, setItems] = useState([]);
  const json = JSON.parse(localStorage.getItem("carrito"));
  const [contador, setContador] = useState(0);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("carrito")));
  }, [json]);

  return (
    <div>
      <BsCart3 />
      {json?.length}
    </div>
  );
}

export default CartBtn;
