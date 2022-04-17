// import React, { useState } from 'react'
import './iniciar.css'
import NavBar from '../../components/navBar/navBar'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { getUser } from '../../actions/user'
import { validateForm} from './control login/validatelogin'


// export default function IniciarSession () {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [errors, setErrors] = useState({})

//   const [input, setInput] = useState({
//     email: '',
//     contrasena: ''
//   })
//   const handleSubmit = e => {
//     e.preventDefault()
//     console.log(input)
//     if (input.email && input.contrasena) {
//       dispatch(getUser(input))
//       alert(`Bienvenidos`)
//       setInput({
//         email: '',
//         contrasena: ''
//       })
//       navigate('/')
//     } else {
//       alert(
//         'Hubo error, chequear que tu usuario y contrasena estan correctos o tenes que registrarse'
//       )
//     }
//   }

//   function handleChange (e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value
//     })
//     setErrors(
//       validateSesh({
//         ...input,
//         [e.target.name]: e.target.value
//       })
//     )
//     console.log(input)
//   }

import React, { useEffect, useState } from "react";
import { login, register } from "../../actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect , useDispatch} from "react-redux";
import { validateEmail } from "../../helpers/validateForm";
import { Col, Form, Row, Button } from "react-bootstrap";
import style from "./Style/LoginAdm.module.css";
import Swal from "sweetalert2";
import { auth, provider } from "../../helpers/firebase";
import { signInWithPopup } from "firebase/auth";
// import { Col, Form, Row } from "react-bootstrap";
import styles from "./Style/LoginAdm.module.css";
import {postCart} from '../../actions/cart'

const initialForm = {
  contrasena: "",
  email: "",
};



const Login = ({ login, isAuth, user, register }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...form, [name]: value };

    setForm(newForm);
    setError(validateForm(newForm));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    setError(errors);

    if (Object.keys(errors).length) {
      return window.alert("El formulario contiene errrores");
    }
    login(form);
  };

  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user) {
      const { rol } = user;
      setForm(initialForm);
      async function db() {
        await postCart();
      }
      isAuth && db();
      rol === "2" ? navigate("/dashboard/admin") : navigate("/home");
    }
  }, [isAuth, navigate, user]);

  const handleSesionGoogle = async (e) => {
    e.preventDefault();
    const userG = await signInWithPopup(auth, provider);
    try {
      const userGoogle = {
        contrasena: userG._tokenResponse.localId,
        email: userG._tokenResponse.email,
      };
      console.log(userGoogle);
      login(userGoogle);
    } catch (e) {
      if (
        e.message.split("/")[1] === "account-exists-with-different-credential)."
      ) {
        Swal.fire({
          title: "Ya tiene una cuenta con el mismo email",
          text: "No puede iniciar sesión en una cuenta no registrada en la base de datos que tenga el mismo email. Use la cuenta con la que se haya registrado",
          icon: "error",
        });
      }
    }
  };

  
  return (
    <div>
      <NavBar />
      <div className='iniciar'>
        <h1>Iniciar Session</h1>
        <form className='containerIn'>
          <div>
            <label>
              Email
              <input type='text' name='email' placeholder='Email' />
            </label>
          </div>
          <div>
            <label>
              Contrasena
              <input type='text' name='contrasena' placeholder='Contrasena' />
            </label>
          </div>
          <button className='buttonSess'>Iniciar</button>
        </form>
      
      </div>
    </div>
  )
}
