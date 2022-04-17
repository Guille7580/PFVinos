// import React, { useState } from 'react'
import './iniciar.css'
import NavBar from '../../components/navBar/navBar'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { getUser } from '../../actions/user'
import { validateForm} from './control login/validatelogin'

import React, { useEffect, useState } from "react";
import { login, register } from "../../actions/auth";
import { Link, useNavigate } from "react-router-dom";
//import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux'
import { Col, Form, Row, Button } from "react-bootstrap";
import style from "./Style/LoginAdm.module.css";
import Swal from "sweetalert2";
//import { Col, Form, Row } from "react-bootstrap";
import styles from "./Style/LoginAdm.module.css";


const initialForm = {
  contrasena: "",
  email: "",
};


function Login () {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.loginReducer.isAuth)
  const user = useSelector(state => state.loginReducer.userDetail)

  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(register())
    dispatch(login())
  }, [])

  

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
      // async function db() {
      //   await postCart();
      // }
      
      rol === "2" ? navigate("/dashboard/admin") : navigate("/home");
    }
  }, [isAuth, navigate, user]);

  return (
    <main>
      <NavBar/>
      <div className={styles.contain}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.email}>Email</label>
          <div className={styles.containInputEmail}>
            <input
              className={styles.inputEmail}
              type="email"
              onChange={handleChange}
              name="email"
              value={form.email}
            />
            {error.email && (
              <span className={styles.errorEmail}>{error.email}</span>
            )}
          </div>
          <label className={styles.password}>Contraseña</label>
          <div className={styles.containInputEmail}>
            <input
              className={styles.inputPass}
              type="password"
              onChange={handleChange}
              name="contrasena"
              value={form.contrasena}
            />
            {error.contrasena && (
              <span className={styles.errorPass}>{error.contrasena}</span>
            )}
          </div>
          <input type="submit" value="Ingresar" className={styles.btn_submit} />
          <Button variant="primary" >
            iniciar sesión con Google
          </Button>
          <h4>Aún no te has registrado? </h4>
          <Link to="/register" className={style.btn}>
            Registrarse
          </Link>
          <Link to="/login/recoverpassword">¿Olvidaste la contraseña?</Link>
        </form>
      </div>
    </main>
  );
};
export default Login



