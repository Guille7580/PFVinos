import React, { useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import './Cart.css'
import NavBar from '../../components/navBar/navBar'
//import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
//import { updateCart, getCartDb, deleteAllCart, deleteAllCartDB } from '../../actions/carrito'
//import Swal from "sweetalert2"




export default function Cart () {
  //const navigate = useNavigate();
  //const dispatch = useDispatch();

  //let items = useSelector((state) => {
  //let completeProducts = state.productsReducer.cart.products;
  //completeProducts = completeProducts.map((e) => {
      //const found = state.productsReducer.allProducts.find((el) => el.id === e.id)
     // return found ? { ...found, quantity : e.quantity } : null;
   // })
    // return completeProducts
 // });

//console.log(items);

//const total = useSelector((state)  => state.productsReducer.cart.precioTotal)
//const isAuth = useSelector((state) => state.loginReducer.isAuth);
//items = items?.filter((e) => e);
//const products = useSelector((state) => state.productsReducer.allProducts)
//const user = useSelector((state) => state.loginReducer.userDetail)
//const cartDB = useSelector((state) => state.productsReducer.carts)
  return (

    <div>
      <div div className='cartContainer'>
        <NavBar />
        <h1>Shopping Cart</h1>
        <div className='totalContainer'>
          <h2>Total: &nbsp; </h2>
          <h3>$0</h3>
        </div>
        <div className='cartButtons'>
          <div className='cartButton'>
            <button className='buttonss'>Eliminar Carrito</button>
            <button className='buttonss'>Pagar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
