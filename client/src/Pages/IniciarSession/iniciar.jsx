import React, { useEffect, useState } from 'react'
import { login, register } from '../../actions/auth'
import './iniciar.css'
import NavBar from '../../components/navBar/navBar'
import { Link, useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Swal from 'sweetalert2'
import { auth, provider } from '../Helpers/firebase'
import { signInWithPopup } from 'firebase/auth'
import { postCart } from '../../actions/carrito'
import { useDispatch } from 'react-redux'
//import { getUser } from '../../actions/user'
import { connect } from 'react-redux'
import { validateEmail } from '../Helpers/validateForm'

const initialForm = {
  contrasena: '',
  email: ''
}

const validateSesh = function (form) {
  const { email, contrasena } = form
  console.log(email)
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Email requirido'
  } else if (!validateEmail(email)) {
    errors.email = 'Escriba un email válido'
  }
  if (!contrasena.trim()) {
    errors.contrasena = 'Contrasena equivocada'
  }
}
const IniciarSession = ({ login, isAuth, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [form, setForm] = useState(initialForm)
  const [error, setErrors] = useState({})

  

  function handleChange (e) {
    const { name, value } = e.target

    const newForm = { ...form, [name]: value }

    setForm(newForm)
    setErrors(validateSesh(newForm))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errors = validateSesh(form)
    setErrors(errors)

    if (Object.keys(errors).length) {
      return window.alert('Hay errores')
    }
    login(form)
  }

  useEffect(() => {
    if (isAuth && user) {
      const { rol } = user
      setForm(initialForm)
      async function db () {
        await postCart()
      }
      isAuth && db()
      rol === '2' ? navigate('/dashboard/admin') : navigate('/')
    }
  }, [isAuth, navigate, user])

  const handleSesionGoogle = async e => {
    e.preventDefault()
    const userG = await signInWithPopup(auth, provider)
    try {
      const userGoogle = {
        contrasena: userG._tokenResponse.localId,
        email: userG._tokenResponse.email
      }
      console.log(userGoogle)
      login(userGoogle)
    } catch (e) {
      if (
        e.message.split('/')[1] === 'account-exists-with-different-credential).'
      ) {
        Swal.fire({
          title: 'Ya tiene una cuenta con el mismo email',
          text:
            'No puede iniciar sesión en una cuenta no registrada en la base de datos que tenga el mismo email. Use la cuenta con la que se haya registrado',
          icon: 'error'
        })
      }
    }
  }

  return (
    <div>
      <NavBar />
      <div className='iniciar'>
        <h1>Iniciar Session</h1>
        <form onSubmit={handleSubmit} className='containerIn'>
          <div>
            <label>
              <input
                onChange={handleChange}
                type='email'
                name='current-email'
                placeholder='Email'
                autocomplete="current-email"
                value={form.email}
              />
              {error.email && <span className='errorEmail'>{error.email}</span>}
            </label>
          </div>
          <div>
            <label>
              <input
                type='password'
                onChange={handleChange}
                name='password'
                autoComplete='current-password'
                placeholder='Contrasena'
                value={form.contrasena}
              />
              {error.contrasena && (
                <span className='errorPass'>{error.contrasena}</span>
              )}
            </label>
          </div>
          <Link to='/'>
            <button className='buttonSess'>Iniciar</button>
          </Link>
          <h4>Aún no te has registrado? </h4>
          <Link to='/register'>Registrarse</Link>
          {/* <Link to="/login/recoverpassword">¿Olvidaste la contraseña?</Link> */}
        </form>
      </div>
    </div>
  )
}
