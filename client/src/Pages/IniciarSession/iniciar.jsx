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

  //   const navigate = useNavigate()
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
  const [email, setEmail] = useState('')
  const [modalInsertar, setStateModalInsectar] = useState(false)
  const [contrasena, setPassword] = useState('');
  const [validate, setValidate] = useState(0);
  //const user = useSelector((state) => state.User);
  const guestCart = useSelector((state) => state.basket);
  const Error = () => toast.error("El email o la contraseña son incorrectos")
  const Bienvenido = () => setStateModalInsectar(true)
  const [error, setError] = useState({});
  const [form, setForm] = useState();

  useEffect(() => {


    // Si ya está logueado que lo redireccione al dashboard
    if (email && contrasena) {
      setForm(initialForm);
      const { rol } = user;
      Swal.fire({
        text: `Bienvenidx`,
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
  }, [isAuth, , user, navigate]);

  function handleEmail(e) {
    e.preventDefault()
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    e.preventDefault()
    setPassword(e.target.value)
  }

  function handleSignIn(e) {
    e.preventDefault();
    const fetchData = async () => {
      await dispatch(login({
        email: email,
        contrasena: contrasena
      }, guestCart))
      await setValidate(validate + 1)
    }
    fetchData()

  }
  // const IniciarCompra = (e) => {
  //   e.preventDefault()
  //   Navigate('/')
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
        <form className='containerIn'>
          <div>
            <label>
              <input
                type='email'
                name='email'
                placeholder='Email'
                onChange={handleEmail}
              />
              {error.email && <span className='errorEmail'>{error.email}</span>}
            </label>

            <label>
              <input
                type='contrasena'
                name='contrasena'
                autoComplete='current-password'
                placeholder='Contraseña'
                onChange={handlePassword}
              />
              {error.contrasena && (
                <span className='errorPass'>{error.contrasena}</span>
              )}
            </label>
          </div>
          <div className='buttonsSession'>
            <div className='box1'>
              <Link to='/'>
                <button className='buttonSess' onClick={(e) => handleSignIn(e)}>
                  Iniciar
                </button>
              </Link>
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