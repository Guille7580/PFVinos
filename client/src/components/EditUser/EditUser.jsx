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
import { validateEmail, validateTlf } from '../../Helpers/validateForm'


const initialForm = {
  nombre: '',
  usuario: '',
  pais: '',
  provincia: '',
  direccion: '',
  telefono: '',
}
const validateform = function (form) {
  const errors = {}
  if (!form.nombre.trim()) {
    errors.nombre = 'Campo requerido'
  } else if (form.nombre.length < 4) {
    errors.nombre = 'Mínimo 4 caracteres'
  } else if (form.nombre.length > 25) {
    errors.nombre = 'Máximo 25 caracteres'
  }

  if (!form.usuario.trim()) {
    errors.usuario = 'Campo requerido'
  } else if (form.usuario.length < 5) {
    errors.usuario = 'Mínimo 5 caracteres'
  } else if (form.usuario.length > 15) {
    errors.usuario = 'Máximo 15 caracteres'
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


  return errors
}


function Createform ({ updateUser, register, isAuth, user }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(
   { ...user } 
  )
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
  ...user
  })

  const handleChange = e => {
    const { name, value } = e.target

    const newform = { ...form, [name]: value }
    setForm(newform)
    const errors = validateform(newform)
    setErrors(errors)
    return newform
  }

  const handleSubmit = e => {
    e.preventDefault()

    const errors = validateform(form)

    const userForm = { ...form }
    console.log(userForm)
    updateUser(userForm) 
    Swal.fire({
      text: `Perfil Editado con exito `,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    navigate('/')
  }

  const handleClick = () => {
    navigate('/')
  }
  const handleClickx = () => {
    navigate('/login/resetpassword')
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
            
            {/* <label className='label'>
    
              <input
                onChange={e => handleChange(e)}
                className='regInput'
                type='text'
                name='email'
                placeholder='Email...'
                value={form.email}
              />
              {errors.email && <p>{errors.email}</p>}
            </label> */}
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
             {errors.telefono && <p>{errors.telefono}</p>} 
            </label>
            

            <div className='regButtons'>
            <button type='submit' className='buttonReg'>
              Registrar Cambios
            </button>

            <button className='buttonReg' onClick = {handleClickx}>
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
