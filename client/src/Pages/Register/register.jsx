import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, updateUser } from '../../actions/auth'
import './register.css'
import Swal from 'sweetalert2'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { validateEmail, validateTlf } from '../../Helpers/validateForm'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../Helpers/firebase'
import { postCart } from '../../actions/carrito'

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

function Createform ({ updateUser, register, isAuth, user, edit = false }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(
    edit ? { ...user, confirm_contrasena: '', contrasena: '' } : initialForm
  )
  const [errors, setErrors] = useState({})
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
    delete userForm.confirm_contrasena

    edit ? updateUser(userForm) : register(userForm)
  }

  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user && !edit) {
      setForm(initialForm)
      const { nombre, rol } = user
      Swal.fire({
        text: `Bienvenidx ${nombre}`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      // async function db() {
      //   await postCart();
      // }
      //isAuth && db();
      if (rol === '1') return navigate('/')
      if (rol === '2') return navigate('/dashboard/admin')
    }
  }, [isAuth, navigate, user, edit])

  const handleSesionGoogle = async e => {
    e.preventDefault()
    const userG = await signInWithPopup(auth, provider)
    try {
      const userGoogle = {
        nombre: userG._tokenResponse.displayName,
        usuario: userG._tokenResponse.firstName,
        contrasena: userG._tokenResponse.localId,
        email: userG._tokenResponse.email,
        pais: '',
        provincia: '',
        direccion: '',
        telefono: '',
        token: userG._tokenResponse.idToken
      }
      console.log(userGoogle)
      register(userGoogle)
    } catch (e) {
      if (
        e.message.split('/')[1] === 'account-exists-with-different-credential).'
      ) {
        Swal.fire({
          title: 'Ya tiene una cuenta con el mismo email',
          text:
            'no puede iniciar sesión en una cuenta no registrada en la base de datos que tenga el mismo email. Use la cuenta con la que se haya registrado',
          icon: 'error'
        })
      }
    }
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
                type='password'
                name='confirm_contrasena'
                placeholder='Confirme Contraseña...'
                value={form.confirm_contrasena}
              />
              {errors.confirm_contrasena && <p>{errors.confirm_contrasena}</p>}
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
            <button onClick={handleSesionGoogle} className='buttonReg'>
              Registrar con Google
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
