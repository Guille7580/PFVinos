import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, updateUser } from '../../actions/auth'
import axios from 'axios'
import './Resetpasword.css'
import Swal from 'sweetalert2'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../Helpers/firebase'
import { BASEURL } from '../../assets/URLS'


const initialForm = {
    id:'',
    contrasena: '',
    confirm_contrasena: '',
}
const validateform = function (form) {
  const errors = {}
  
  if (!form.contrasena.trim()) {
    errors.contrasena = 'Campo requerido'
  } else if (form.contrasena.length < 10) {
    errors.contrasena = 'Mínimo 10 caracteres'
  }

  if (form.confirm_contrasena !== form.contrasena) {
    errors.confirm_contrasena = 'Las contraseñas no coinciden'
  }

  return errors
}


function Createform ({ updateUser, register, isAuth, user }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(
   { ...user, confirm_contrasena: '', contrasena: ''} 
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

  const handleSubmit =async e => {
    e.preventDefault()

    const errors = validateform(form)

    const userForm = { ...form }
    console.log(userForm)
    
    await axios.post(`${BASEURL}/resetPassword` , {userForm})
    // updateUser(userForm) 
    Swal.fire({
      text: `Contraseña cambiada con exito `,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    navigate('/')
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
                type='password'
                name='confirm_contrasena'
                placeholder='Confirme Contraseña...'
                value={form.confirm_contrasena}
              />
              {errors.confirm_contrasena && <p>{errors.confirm_contrasena}</p>}
            </label>
            

            <div className='regButtons'>
            <button type='submit' className='buttonReg'>
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
