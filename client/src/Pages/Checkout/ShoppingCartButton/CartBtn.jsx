import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import cart from "./shoppingCartIcon.png";
import "./CartBtn.css";
import { BsCart3 } from "react-icons/bs";
//import Cart from '../Cart'

function CartBtn({cartItems}) {
//console.log
  useEffect(() => {}, []);

  return (
    <div>
      <BsCart3 />
      {cartItems?.length}
    </div>
  );
}

export default CartBtn;
