import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, updateUser } from "../../actions/auth";
import './register.css'
import Swal from "sweetalert2";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { validateEmail, validateTlf } from "../../Helpers/validateForm";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { signInWithPopup} from "firebase/auth";


import NavBar from '../../components/navBar/navBar'


import { auth, provider } from '../../Helpers/firebase'

import {validateForm} from './control registro/validate'
import { postCart } from '../../actions/carrito'




const initialForm = {
  nombre: "",
  usuario: "",
  contrasena: "",
  confirm_contrasena: "",
  email: "",
  pais: "",
  provincia: "",
  direccion: "",
  telefono: "",
};
const validateform = function (form) {

  const errors = {};
  if (!form.nombre.trim()) {
    errors.nombre = "Campo requerido";
  } else if (form.nombre.length < 4) {
    errors.nombre = "Mínimo 4 caracteres";
  } else if (form.nombre.length > 25) {
    errors.nombre = "Máximo 25 caracteres";
  }

  if (!form.usuario.trim()) {
    errors.usuario = "Campo requerido";
  } else if (form.usuario.length < 5) {
    errors.usuario = "Mínimo 5 caracteres";
  } else if (form.usuario.length > 15) {
    errors.usuario = "Máximo 15 caracteres";
  }

function Register ({ updateUser, register, isAuth, user, edit = false }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [form, setForm] = useState(
  //   edit ? { ...useReducer, contrasena: '', contrasena: '' } : initialForm
  // )
  const [form, setForm] = useState(
    edit ? { ...user, confirm_contrasena: "", contrasena: "" } : initialForm
  );
  const [input, setInput] = useState({
    nombre: '',
    usuario: '',
    contrasena: '',
    confirm_contrasena: '',
    email: '',
    pais: '',
    provincia: '',
    direccion: '',
    telefono: ''
  })

  // const handleClick = () => {
  //   navigate('/')
  // }
  const [errors, setErrors] = useState({})

  // const handleInputChange = function (e) {
  //   e.preventDefault()
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value
  //   })

  //   setErrors(
  //     validateForm({
  //       ...input,
  //       [e.target.name]: e.target.value
  //     })
  //   )
  // }

  // const [showPassword, setShowPasword] = useState(true)
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(form);

    const userForm = { ...form };
    delete userForm.confirm_contrasena;

    edit ? updateUser(userForm) : register(userForm);

  };
  // const handleSubmit = e => {
  //   e.preventDefault()

  //   if (
  //     input.nombre &&
  //     input.usuario &&
  //     input.contrasena &&
  //     input.email &&
  //     input.pais &&
  //     input.provincia &&
  //     input.direccion &&
  //     input.telefono
  //   ) {
  //     dispatch(postUser(input))
  //     Swal.fire({
  //       text: `Bienvenid@ ${input.nombre}` ,
  //       icon: "success",
  //       confirmButtonText: "Ok",
  //     });
  //     //alert('Registro exitoso')
  //     setInput({
  //       nombre: '',
  //       usuario: '',
  //       contrasena: '',
  //       email: '',
  //       pais: '',
  //       provincia: '',
  //       direccion: '',
  //       telefono: ''
  //     })
  //     navigate('/')
  //   } else {
  //     Swal.fire({
  //       text: `Completar el Formulario`,
  //       icon: "error",
  //       confirmButtonText: "Ok",
  //     });
  //     // alert('Completar el Formulario')
  //   }
  // }

  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user && !edit) {
      setForm(initialForm);
      const { nombre, rol } = user;
      Swal.fire({
        text: `Bienvenidx ${nombre}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      // async function db() {
      //   await postCart();
      // }
      //isAuth && db();
      if (rol === "1") return navigate("/");
      if (rol === "2") return navigate("/dashboard/admin");
    }
  }, [isAuth, navigate, user, edit]);

  function handleChange (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value
      })
    )
    }
    
  

  return (
        <div className='containReg'>
          <h1>Registro</h1>
          <form className='formReg' onSubmit={e => handleSubmit(e)}>
            <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='text'
                name='nombre'
                placeholder='Nombre Completo...'
                value={form.nombre}
              />
              {errors.nombre && <p>{errors.nombre}</p>}
            </label>
            <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='text'
                name='usuario'
                placeholder='Usuario...'
                value={form.usuario}
              />
              {errors.usuario && <p>{errors.usuario}</p>}
            </label>
            <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='password'
                name='contrasena'
                placeholder='Contraseña...'
                value={form.contrasena}
              />
              {errors.contrasena && <p>{errors.contrasena}</p>}
            </label>
            <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='text'
                name='email'
                placeholder='Email...'
                value={form.email}
              />
              {errors.email && <p>{errors.email}</p>}
            </label>
            <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='text'
                name='pais'
                placeholder='Pais...'
                value={form.pais}
              />
              {errors.pais && <p>{errors.pais}</p>}
            </label>
            <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='text'
                name='provincia'
                placeholder='Provincia...'
                value={form.provincia}
              />
              {errors.provincia && <p>{errors.provincia}</p>}
            </label>
            <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='text'
                name='direccion'
                placeholder='Dirección...'
                value={form.direccion}
              />
              {errors.direccion && <p>{errors.direccion}</p>}
            </label>
            <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='text'
                name='telefono'
                placeholder='Teléfono...'
                value={form.telefono}
              />
            </label>
            {errors.telefono && <p>{errors.telefono}</p>}
            <div className='regButtons'>
            <button type='submit' className='buttonReg'>
              Registrar
            </button>
            <button type='submit' className='buttonReg'>
              Registrar con Google
            </button>
            </div> 
          </form>
        </div>
      )
    }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ register, updateUser }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
  };
};
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
