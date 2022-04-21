import React, { useEffect, useState } from 'react'
import { login, register } from '../../actions/auth'
import { Link, useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { validateEmail } from '../../Helpers/validateForm'
import { Col, Form, Row, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { auth, provider } from '../../Helpers/firebase'
import { signInWithPopup } from 'firebase/auth'
import NavBar from '../../components/navBar/navBar'
import './iniciar.css'
import { useDispatch } from 'react-redux'
import { postCart } from '../../actions/carrito'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";

const initialForm = {

  contrasena: "",
  email: "",

};

const validateForm = function (form) {
  const { email, contrasena } = form
  console.log(form)
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Campo requerido'
  } else if (!validateEmail(email)) {
    errors.email = 'Escriba un email válido'
  }

  if (!contrasena.trim()) {
    errors.contrasena = 'La contraseña es requerida'
  }

  return errors
}

export default function SignIn(isAuth,user ) {
  //   const [form, setForm] = useState(initialForm)
  //   const [error, setError] = useState({})

  //   const handleChange = e => {
  //     const { name, value } = e.target

  //     const newForm = { ...form, [name]: value }

  //     setForm(newForm)
  //     setError(validateForm(newForm))
  //   }

  //   const handleSubmit = e => {
  //     e.preventDefault()
  //     const errors = validateForm(form)
  //     setError(errors)

  //     if (Object.keys(errors).length) {
  //       return window.alert('El formulario contiene errrores')
  //     }
  //     login(form)
  //   }

  //   useEffect(() => {
  //     // Si ya está logueado que lo redireccione al dashboard
  //     if (isAuth && user) {
  //       const { rol } = user
  //       setForm(initialForm)
  //       async function db () {
  //         await postCart()
  //       }
  //       isAuth && db()

  //       rol === '2' ? navigate('/dashboard/admin') : navigate('/')
  //     }
  //   }, [isAuth, navigate, user])

  //   const handleSesionGoogle = async e => {
  //     e.preventDefault()
  //     const userG = await signInWithPopup(auth, provider)
  //     try {
  //       const userGoogle = {
  //         contrasena: userG._tokenResponse.localId,
  //         email: userG._tokenResponse.email
  //       }
  //       console.log(userGoogle)
  //       login(userGoogle)
  //     } catch (e) {
  //       if (
  //         e.message.split('/')[1] === 'account-exists-with-different-credential).'
  //       ) {
  //         Swal.fire({
  //           title: 'Ya tiene una cuenta con el mismo email',
  //           text:
  //             'No puede iniciar sesión en una cuenta no registrada en la base de datos que tenga el mismo email. Use la cuenta con la que se haya registrado',
  //           icon: 'error'
  //         })
  //       }
  //     }
  //   }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //const {isAuthenticated} = useAuth0();
  //const user = useSelector((state) => state.User);
  const guestCart = useSelector((state) => state.basket);
  const Error = () => toast.error("El email o la contraseña son incorrectos")
  const [error, setError] = useState({});
  const [form, setForm] = useState();

  function handleSignIn(e) {
    e.preventDefault();

    let email = e.target.email;
    console.log(email.value)
    let contrasena = e.target.contrasena;

    const data = {
      email : email.value, contrasena : contrasena.value
    };
console.log
    dispatch(login(data));
    navigate('/');
  }
  // function handleSignIn(e) {
  //   e.preventDefault();
  //     const fetchData = async () => {
  //     await dispatch(login({
  //       email: email,
  //       contrasena: contrasena
  //     }, guestCart))
  //     await setValidate(validate + 1)
  //   }
  //   fetchData()

  // }

  return (
    <div className='box'>
      <div className='containerWine'>
        <div className='wine-glass'>
          <div className='wine'></div>
        </div>
        <div className='glass-stem'></div>
        <div className='glass-base'></div>
      </div>

      <div className='iniciar'>
        <h1>Iniciar Sesion</h1>
        <form className='containerIn' onSubmit ={(e) => handleSignIn(e)}>
          <div>
            <label>
              <input 
                type='email'
                name='email'
                placeholder='Email'

              />
              {error.email && <span className='errorEmail'>{error.email}</span>}
            </label>

            <label>
              <input
                type='contrasena'
                name='contrasena'
                autoComplete='current-password'
                placeholder='Contraseña'

              />
              {error.contrasena && (
                <span className='errorPass'>{error.contrasena}</span>
              )}
            </label>
          </div>
          <div className='buttonsSession'>
            <div className='box1'>
             
                <button className='buttonSess' >
                  Iniciar
                </button>
            
              {/* <Button
                className='googleBtn'
                variant='primary'
                onClick={handleSesionGoogle}
              >
                Iniciar sesión con Google
              </Button> */}
            </div>
            <div className='box2'>
              <h4>Aún no te has registrado? </h4>
              <Link to='/register'>Registrarse</Link>
            </div>
            {/* <Link to="/login/recoverpassword">¿Olvidaste la contraseña?</Link> */}
          </div>
        </form>
      </div>
    </div>
  )
}