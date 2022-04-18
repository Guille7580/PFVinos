import React, { useState } from 'react'
import './iniciar.css'
import NavBar from '../../components/navBar/navBar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from '../../actions/user'
import { validateEmail } from '../Helpers/validateForm'

const validateSesh = function (input) {
  const errors = {}
  if (!input.email.trim()) {
    errors.email = 'Email requirido'
  } else if (!validateEmail(input.email)) {
    errors.email = 'Escriba un email válido'
  }
  if (!input.contrasena.trim()) {
    errors.contrasena = 'Contrasena equivocada'
  }
}
export default function IniciarSession () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [input, setInput] = useState({
    email: '',
    contrasena: ''
  })
  const handleSubmit = e => {
    e.preventDefault()
    console.log(input)
    if (input.email && input.contrasena) {
      dispatch(getUser(input))
      alert(`Bienvenidos`)
      setInput({
        email: '',
        contrasena: ''
      })
      navigate('/')
    } else {
      alert(
        'Hubo error, chequear que tu usuario y contrasena estan correctos o tenes que registrarse'
      )
    }
  }

  function handleChange (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(
      validateSesh({
        ...input,
        [e.target.name]: e.target.value
      })
    )
    console.log(input)
  }

  const [errors, setErrors] = useState({})
  return (
    <div>
      <NavBar />
      <div className='iniciar'>
        <h1>Iniciar Sesión</h1>
        <form className='containerIn'>
          <div>
            <label>
              
              <input type='text' name='email' placeholder='Email' />
            </label>
          </div>
          <div>
            <label>
              <input type='text' name='contrasena' placeholder='Contraseña' />
            </label>
          </div>
          <button className='buttonSess'>Iniciar</button>
        </form>
      
      </div>
    </div>
  )
}
