import React, { useReducer, useState, useEffect } from 'react'
import './register.css'
import { useDispatch } from 'react-redux'
import NavBar from '../../components/navBar/navBar'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
// import { auth, provider } from '../Helpers/validateAuth'
import { postUser } from '../../actions/user'
import {validateForm} from './control registro/validate'


// const initialForm = {
//   nombre: '',
//   usuario: '',
//   contrasena: '',
//   confirm_contrasena: '',
//   email: '',
//   pais: '',
//   provincia: '',
//   direccion: '',
//   telefono: ''
// }


export default function Register ({ edit = false }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [form, setForm] = useState(
  //   edit ? { ...useReducer, contrasena: '', contrasena: '' } : initialForm
  // )

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

  const handleSubmit = e => {
    e.preventDefault()

    if (
      input.nombre &&
      input.usuario &&
      input.contrasena &&
      input.email &&
      input.pais &&
      input.provincia &&
      input.direccion &&
      input.telefono
    ) {
      dispatch(postUser(input))
      Swal.fire({
        text: `Bienvenido ${input.nombre}` ,
        icon: "success",
        confirmButtonText: "Ok",
      });
      //alert('Registro exitoso')
      setInput({
        nombre: '',
        usuario: '',
        contrasena: '',
        email: '',
        pais: '',
        provincia: '',
        direccion: '',
        telefono: ''
      })
      navigate('/')
    } else {
      Swal.fire({
        text: `Completar el Formulario`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      // alert('Completar el Formulario')
    }
  }

  // const handleChange = e => {
  //   const { name, value } = e.target

  //   const newform = { ...input, [name]: value }
  //   setInput(newform)
  //   const errors = validateForm(newform, edit)
  //   setErrors(errors)
  //   return newform
  // }
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
    console.log(input)
  }

  return (
    <div className='containReg'>
      <NavBar />
      <h1>Register</h1>
      <form className='formReg' onSubmit={e => handleSubmit(e)}>
        <label className='label'>
          Nombre Completa
          <input
            onChange={e => handleChange(e)}
            className='regInput'
            type='text'
            name='nombre'
            placeholder='Nombre Completa'
            value={input.nombre}
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </label>
        <label className='label'>
          User Name
          <input
            onChange={e => handleChange(e)}
            className='regInput'
            type='text'
            name='usuario'
            placeholder='Usuario'
            value={input.usuario}
          />
          {errors.usuario && <p>{errors.usuario}</p>}
        </label>
        <label className='label'>
          Contrasena
          <input
            onChange={e => handleChange(e)}
            className='regInput'
            type='text'
            name='contrasena'
            placeholder='Contrasena'
            value={input.contrasena}
          />
          {errors.contrasena && <p>{errors.contrasena}</p>}
        </label>
        <label className='label'>
          Email
          <input
            onChange={e => handleChange(e)}
            className='regInput'
            type='text'
            name='email'
            placeholder='Email'
            value={input.email}
          />
          {errors.email && <p>{errors.email}</p>}
        </label>
        <label className='label'>
          Pais
          <input
            onChange={e => handleChange(e)}
            className='regInput'
            type='text'
            name='pais'
            placeholder='Pais'
            value={input.pais}
          />
          {errors.pais && <p>{errors.pais}</p>}
        </label>
        <label className='label'>
          Provincia
          <input
            onChange={e => handleChange(e)}
            className='regInput'
            type='text'
            name='provincia'
            placeholder='Provincia'
            value={input.provincia}
          />
          {errors.provincia && <p>{errors.provincia}</p>}
        </label>
        <label className='label'>
          Direccion
          <input
            onChange={e => handleChange(e)}
            className='regInput'
            type='text'
            name='direccion'
            placeholder='Direccion'
            value={input.direccion}
          />
          {errors.direccion && <p>{errors.direccion}</p>}
        </label>
        <label className='label'>
          Telefono{' '}
          <input
            onChange={e => handleChange(e)}
            className='regInput'
            type='text'
            name='telefono'
            placeholder='Telefono'
            value={input.telefono}
          />
        </label>
        {errors.telefono && <p>{errors.telefono}</p>}
        <button type='submit' className='buttonReg'>
          Registrar
        </button>
      </form>
    </div>
  )
}
