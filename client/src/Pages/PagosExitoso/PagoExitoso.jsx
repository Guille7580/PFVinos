import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//import { useSearchParams } from "react-router-dom";
import './pagoexitoso.css'
import { changeStatusToComplete, getPedidosByUser } from '../../actions/pedidos';

export default function PagoExitoso (handleEmptyCart) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginReducer.userDetail);
  const [mail, setmail] = useState("")
  console.log("lpmmmmmmmmmmmmmmm",user)

  useEffect(() => {
    console.log("pruebaaaaaaaaaaa")
    setmail(user.email)
    
    return (()=>dispatch(changeStatusToComplete(user.email)))
    }, [user]);

const datos = getPedidosByUser.map((product) => ({
  products:product.products
}))

console.log("aaaaaaaaaaaaaaaaaaa",datos)

  return (
    <div className='pagoContainer'>
      <h1 className='pagoGracias'>
        !Muchas gracias por tu compra! Estará llegando a tu correo electrónico
        la información de pago.
      </h1>
      <Link to='/' >
        <button className="pagosButton" >Home </button>
      </Link>
    </div>
  )
}