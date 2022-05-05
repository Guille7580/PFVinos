import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//import { useSearchParams } from "react-router-dom";
import "./pagoexitoso.css";
import { checkoutEmail } from "../../actions/checkOutEmail";
import { changeStatusToComplete } from "../../actions/pedidos";

export default function PagoExitoso({ setCartItems }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginReducer.userDetail);

  useEffect(() => {
    return function () {
      if (user) {
        //dispatch(changeStatusToComplete( user.email ))
      }
    };
  }, [user]);

  useEffect(() => {
    if (user)
      //dispatch(checkoutEmail(user.email))
      setCartItems([]);
    localStorage.removeItem("carrito");
  }, []);

  return (
    <div className="pagoContainer">
      <h1 className="pagoGracias">
        !Muchas gracias por tu compra! Estará llegando a tu correo electrónico
        la información de pago.
      </h1>
      <Link to="/">
        <button className="pagosButton">Home </button>
      </Link>
    </div>
  );
}
