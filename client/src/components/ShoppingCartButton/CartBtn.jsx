import React from "react";
import { useSelector } from "react-redux";
import cart from './shoppingCartIcon.png'
import './CartBtn.css'

function CartBtn() {
  //const item = useSelector((state) => state.productsReducer.cart.products);

  return (
    <div>
      <img src={cart} className='cartButton' alt="" />
      {/* {item.length} */}
    </div>
  );
}

export default CartBtn;