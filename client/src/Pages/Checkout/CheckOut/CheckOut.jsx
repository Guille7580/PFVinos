import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CheckOut.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postPedido } from "../../../actions/carrito";
import CheckOutItems from "./CheckOutItems/checkoutItems";
import { WineLoader } from "../../../components/wineLoader/wineLoader";
import { getMercadoPago, getPedidosPendiente } from "../../../actions/pedidos";
import { login } from "../../../actions/auth";
import Swal from "sweetalert2"

export function calculateTotal(items) {
  return items
    ?.reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2);
}

function addCheckout(prefId, check) {
  var mp = new window.MercadoPago("TEST-ea9e8942-0e18-4582-8050-97e6da6d6ad6", {
    locale: "es-CO",
  });

  mp.checkout({
    preference: {
      id: prefId,
    },
    render: {
      container: `#pay_button`, // Indica el nombre de la clase donde se mostrará el botón de pago
      label: "Comprar", // Cambia el texto del botón de pago
    },
  });
}

export default function CheckOut({ product, cartItems, setCartItems }) {
  const user = useSelector((state) => state.loginReducer.userDetail);
  //const Inicie = () => toast(`Por Favor Inicie sesion`, {duration: 4000, position: 'bottom-center',})
  const url = useSelector((state) => state.pedidosReducer.url);
  console.log("checkkkkkkkkkout", url);
  const dispatch = useDispatch();

  /* useEffect(() => {
    if (cartItems.length !== 0)
      localStorage.setItem('carrito', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('carrito'))

    if (items) setCartItems(items)
    else setCartItems([])
  }, []) */

  useEffect(() => {
    let inicioSesion = JSON.parse(localStorage.getItem("userData"));
    if (inicioSesion) {
      const fetchData = async () => {
        await dispatch(
          login({
            email: inicioSesion.email,
            password: inicioSesion.password,
          })
        );
      };
      fetchData();
    }
  }, []);

  const products = cartItems.map((product) => ({
    productoId: product.id,
    title: product.title,
    quantity: product.amount,
    price: product.price,
  }));

  let order = {
    usuarioId: user?.id,
    email: user?.email,
    products: products,
    total: Number(calculateTotal(cartItems)),
    date: new Date().toLocaleString(),
  };
  console.log(cartItems);
  const navigate = useNavigate();

  function onFinishPay(e) {
    e.preventDefault();
    dispatch(postPedido(order));
    dispatch(getMercadoPago({ email: order.email, items: order.products }));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Exitoso!",
      text: "Confirmaste direccion",
    }) 
  }
  function onFinish(e) {
    e.preventDefault();
    if (typeof url === "object") {
      Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Primero confirmar direccion",
    }) 
  } else {
    
    setTimeout(() => {
       window.location.href = url;
      setCartItems([]);
      localStorage.removeItem("carrito");
      
     }, 1500);
    
    
  }}

  let users = useSelector((state) => state.loginReducer.userDetail);
  const { nombre, usuario, email, pais, provincia, direccion, telefono } =
    user || {};

  return users ? (
    <div>
      <h1 className="title">CheckOut</h1>
      <div className="CKOContainer">
        <div className="cartItems">
          <h2>Resumen:</h2>
          <ul>
            {cartItems?.length === 0 ? <p>No hay items en el carrito</p> : null}
            {cartItems?.map((product) => (
              <CheckOutItems key={product.id} product={product} />
            ))}
            <h2>Total: &nbsp; $ {calculateTotal(cartItems)} </h2>
          </ul>
        </div>

        <div className="infoUsuario">
          <div>
            <h5> Email: {email} </h5>
            <h5> Dirección: {direccion} </h5>
            <h5> Provincia: {provincia} </h5>
            <h5> País: {pais} </h5>
          </div>

          <div className="totyBtnCont">
            <Link to="/">
              <button className="totandBut">Volver</button>
            </Link>
            <Link to="/#">
              <button className="totandBut" onClick={onFinishPay}>
                Confirmar dirección
              </button>
            </Link>
            <Link to="/#">
              <button type="module" className="totandBut" onClick={onFinish}>
                Pagar
              </button>
            </Link>
            <Link to="/perfil/edit">
              <button className="totandBut">Editar Direccion</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <WineLoader />
  );
}
