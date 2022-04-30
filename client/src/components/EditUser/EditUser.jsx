import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, updateUser } from '../../actions/auth'
import './register.css'
import Swal from 'sweetalert2'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../Helpers/firebase'
import {validateform} from './Validate/Validate'

const initialForm = {
  nombre: '',
  usuario: '',
  email: '',
  pais: '',
  provincia: '',
  direccion: '',
  telefono: ''
}


function Createform ({ updateUser, register, isAuth, user, edit = false }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(
   { ...user } 
  )
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    nombre: '',
    usuario: '',
    email: '',
    pais: '',
    provincia: '',
    direccion: '',
    telefono: ''
  })

  const handleChange = e => {
    const { name, value } = e.target

    const newform = { ...form, [name]: value }
    setForm(newform)
    const errors = validateform(newform, edit)
    setErrors(errors)
    return newform
  }

  const handleSubmit = e => {
    e.preventDefault()

    const errors = validateform(form)

    const userForm = { ...form }

    updateUser(userForm) 
  }

  const handleClick = () => {
    navigate('/')
  }


  return (
        <div className='containReg'>
          <h1>Editar Usuario</h1>
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
              Registrar Cambios
            </button>

            <button className='buttonReg'>
              Cambiar Contraseña
            </button>
            
            <button  className='buttonReg' onClick = {handleClick}>          
              Volver
            </button>

            </div> 
          </form>
        </div>
      
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ register, updateUser }, dispatch)
}

const mapStateToProps = state => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Createform)
