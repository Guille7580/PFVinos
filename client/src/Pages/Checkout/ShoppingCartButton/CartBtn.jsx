import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import cart from "./shoppingCartIcon.png";
//import  {cartItems}  from '../../../App'
import "./CartBtn.css";
import { BsCart3 } from "react-icons/bs";
//import Cart from '../Cart'

function CartBtn() {
  const [items, setItems] = useState([]);
   useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("carrito")));
  }, []);
  const json= JSON.parse(localStorage.getItem("carrito")); 
  const [contador, setContador] = useState(0)
 /*  if(items && items.length > 0) {
    console.log(items)
  for (let i = 0; i < [...items].length; i++) {
    setContador(contador + items[i].amount)

  }
  }  */
  /* items.length > 0
      ? items.reduce((a, b) => ({ amountTotal: a.amount + b.amount }))
      : []; */
  

  return (
    <div>
    {/*   { items.length > 0
      ? items.reduce((a, b) => ({ amountTotal: a.amount + b.amount })).amountTotal
      : [] } */}
      {/* <img src={cart} className='cartButton' alt='icon of a cart' /> */}
      <BsCart3 /> 
    {json?.length}
    </div>
  );
}

export default CartBtn;
