import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//import { useSearchParams } from "react-router-dom";
import './pagoexitoso.css'
import { changeStatusToComplete } from '../../actions/pedidos';



export default function PagoExitoso (handleEmptyCart) {
  const dispatch = useDispatch();
  //const [params] = useSearchParams();
  const user = useSelector((state) => state.loginReducer.userDetail);
  // const queryParams = {
  //     payment_id: params.get("payment_id"),
  //     status: params.get("status"),
  //     payment_type: params.get("payment_type"),
  //     external_reference: params.get("external_reference"),
  // };

  useEffect(() => {
    dispatch(changeStatusToComplete(user.email))
}, [dispatch]);

  return (
    <div className='pagoContainer'>
      <h1 className='pagoGracias'>
        !Muchas gracias por tu compra! Estará llegando a tu correo electrónico
        la información de pago.
      </h1>
      <Link to='/' >
        <button className="pagosButton" onClick={handleEmptyCart}>Home </button>
      </Link>
    </div>
  )
}