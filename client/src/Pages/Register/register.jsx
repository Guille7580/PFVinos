import React, { useReducer, useState, useEffect } from 'react'
import './register.css'
import NavBar from '../../components/navBar/navBar'
import { useNavigate } from 'react-router-dom'
//import Swal from 'sweetalert2'
import { validateEmail, validateTlf } from '../Helpers/validateForm'
import { auth, provider } from '../Helpers/validateAuth'

const initialForm = {
  nombre: '',
  usuario: '',
  contrasena: '',
  confirm_contrasena: '',
  email: '',
  pais: '',
  provincia: '',
  direccion: '',
  telefono: ''
}

const validateForm = function (form) {
  const errors = {}
  if (!form.nombre.trim()) {
    errors.nombre = 'Campo requirido'
  } else if (form.nombre.length < 4) {
    errors.nombre = 'Minimo 4 caracters'
  } else if (form.nombre > 25) {
    errors.nombre = 'Maximo 25 caracters'
  }

  if (!form.usuario.trim()) {
    errors.usuario = 'Campo requirido'
  } else if (form.usuario.length < 5) {
    errors.usuario = 'Minimo 5 caracters'
  } else if (form.usuario.length > 25) {
    errors.usuario = 'Maximo 25 caracters'
  }
  if (!form.contrasena.trim()) {
    errors.contrasena = 'Campo requerido'
  } else if (form.contrasena.length < 10) {
    errors.contrasena = 'Mínimo 10 caracteres'
  }
  if (!form.email.trim()) {
    errors.email = 'Campo requerido'
  } else if (!validateEmail(form.email)) {
    errors.email = 'Escriba un email válido'
  }
  if (!form.pais.trim()) {
    errors.pais = 'Campo requerido'
  }
  if (!form.provincia.trim()) {
    errors.provincia = 'Campo requerido'
  }
  if (!form.direccion.trim()) {
    errors.direccion = 'Campo requerido'
  } else if (form.direccion.length < 10) {
    errors.direccion = 'Mínimo 10 caracteres'
  } else if (form.direccion.length > 40) {
    errors.direccion = 'Máximo 40 caracteres'
  }
  if (!form.telefono.trim()) {
    errors.telefono = 'Campo requerido'
  } else if (!validateTlf(form.telefono)) {
    errors.telefono = 'Escriba un número de telefono válido'
  }
  if (form.confirm_contrasena !== form.contrasena) {
    errors.confirm_contrasena = 'Las contraseñas no coinciden'
  }
  return errors
}

export default function Register ({
  updateUser,
  register,
  isAuth,
  user,
  edit = false
}) {
  const [form, setForm] = useState(
    edit
      ? { ...useReducer, confirm_contrasena: '', contrasena: '' }
      : initialForm
  )
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target

    const newform = { ...form, [name]: value }
    setForm(newform)
    const errors = validateForm(newform, edit)
    setErrors(errors)
    return newform
  }

  const handleSubmit = e => {
    e.preventDefault()

    const errors = validateForm(form)

    const userForm = { ...form }
    delete userForm.confirm_contrasena

    edit ? updateUser(userForm) : register(userForm)
  }

  // useEffect(() => {
  //   // Si ya está logueado que lo redireccione al dashboard
  //   if (isAuth && user && !edit) {
  //     setForm(initialForm);
  //     const { nombre, rol } = user;
  //     Swal.fire({
  //       text: `Bienvenidx ${nombre}`,
  //       icon: "success",
  //       confirmButtonText: "Ok",
  //     });
  //     async function db() {
  //       await postCart();
  //     }
  //     isAuth && db();
  //     if (rol === "1") return navigate("/dashboard/user");
  //     if (rol === "2") return navigate("/dashboard/admin");
  //   }
  // }, [isAuth, navigate, user, edit]);

  return (
    <div className='containReg'>
      <NavBar />
      <h1>Register</h1>
      <form className='formReg'>
        <label className='label'>
          Nombre Completa{' '}
          <input
            className='regInput'
            type='text'
            placeholder='Nombre Completa'
          />
        </label>
        <label className='label'>
          User Name{' '}
          <input
            className='regInput'
            type='text'
            placeholder='Usuario'
            value={form.nombre}
          />
        </label>
        <label className='label'>
          Contrasena
          <input
            className='regInput'
            type='text'
            placeholder='Contrasena'
            value={form.contrasena}
          />
        </label>
        <label className='label'>
          Email{' '}
          <input
            className='regInput'
            type='text'
            placeholder='Email'
            value={form.email}
          />
        </label>
        <label className='label'>
          Pais{' '}
          <input
            className='regInput'
            type='text'
            placeholder='Pais'
            value={form.pais}
          />
        </label>
        <label className='label'>
          Provincia{' '}
          <input
            className='regInput'
            type='text'
            placeholder='Provincia'
            value={form.provincia}
          />
        </label>
        <label className='label'>
          Direccion{' '}
          <input
            className='regInput'
            type='text'
            placeholder='Direccion'
            value={form.direccion}
          />
        </label>
        <label className='label'>
          Telefono{' '}
          <input
            className='regInput'
          
            value={form.telefono}
          />
        </label>
      </form>
      <button className='buttonReg' onClick={handleClick}>
        Register
      </button>
    </div>
  )
}
