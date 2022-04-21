// import React, { useEffect, useState } from 'react'
// import { login } from '../../actions/auth'
// import './iniciar.css'
// import NavBar from '../../components/navBar/navBar'
// import { Link, useNavigate } from 'react-router-dom'
// //import { bindActionCreators } from 'redux'
// import Swal from 'sweetalert2'
// import { auth, provider, faceProvider } from '../../Helpers/firebase'
// import { signInWithPopup } from 'firebase/auth'
// import { postCart } from '../../actions/carrito'
// import { useDispatch } from 'react-redux'
// //import { getUser } from '../../actions/user'
// //import { connect } from 'react-redux'
// import { validateEmail } from '../../Helpers/validateForm'
// import { validateForm } from './control login/validatelogin'

// const initialForm = {
//   contrasena: '',
//   email: ''
// }
// console.log(initialForm)

// const validateSesh = function (form) {
//   const { email, contrasena } = form

//   const errors = {}

//   if (!email.trim()) {
//     errors.email = 'Email requirido'
//   } else if (!validateEmail(email)) {
//     errors.email = 'Escriba un email válido'
//   }
//   if (!contrasena.trim()) {
//     errors.contrasena = 'Contrasena equivocada'
//   }
// }

// export default function IniciarSession ({ login, isAuth, user }) {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [form, setForm] = useState(initialForm)
//   const [error, setErrors] = useState({})

//   // function handleChange (e) {
//   //   const { name, value } = e.target

//   //   const newForm = { ...form, [name]: value }

//   //   setForm(newForm)
//   //   setErrors(validateSesh(newForm))
//   // }

//   function handleChange (e) {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     })
//     setErrors(
//       validateForm({
//         ...form,
//         [e.target.name]: e.target.value
//       })
//     )
//     console.log(form)
//   }

//   const handleSubmit = e => {
//     e.preventDefault()
//     const errors = validateForm(form)
//     setErrors(errors)

//     if (Object.keys(errors).length) {
//       return window.alert('Hay errores')
//     }
//     login(form)
//   }

//   useEffect(() => {
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

//   // const handleFaceBook = async e => {
//   //   e.preventDefault()
//   //   const userF = await signInWithPopup(auth, faceProvider)
//   //   try {
//   //     const userFaceBook = {
//   //       contrasena: userF._tokenResponse.localId,
//   //       email: userF._tokenResponse.email
//   //     }
//   //     console.log(userFaceBook)
//   //     login(userFaceBook)
//   //   } catch (e) {
//   //     if (
//   //       e.message.split('/'[1] === 'account-exists-with-different-credential.')
//   //     ) {
//   //       Swal.fire({
//   //         title: 'Ya tiene una cuenta con el mismo email',
//   //         text:
//   //           'No puede iniciar sesión en una cuenta no registrada en la base de datos que tenga el mismo email. Use la cuenta con la que se haya registrado',
//   //         icon: 'error'
//   //       })
//   //     }
//   //   }
//   // }
//   // const handleSesionGoogle = async e => {
//   //   e.preventDefault()
//   //   const userG = await signInWithPopup(auth, provider)
//   //   try {
//   //     const userGoogle = {
//   //       contrasena: userG._tokenResponse.localId,
//   //       email: userG._tokenResponse.email
//   //     }
//   //     console.log(userGoogle)
//   //     login(userGoogle)
//   //   } catch (e) {
//   //     if (
//   //       e.message.split('/')[1] === 'account-exists-with-different-credential).'
//   //     ) {
//   //       Swal.fire({
//   //         title: 'Ya tiene una cuenta con el mismo email',
//   //         text:
//   //           'No puede iniciar sesión en una cuenta no registrada en la base de datos que tenga el mismo email. Use la cuenta con la que se haya registrado',
//   //         icon: 'error'
//   //       })
//   //     }
//   //   }
//   // }

//   return (
//     <div>
//       <NavBar />
//       <div className='iniciar'>
//         <h1>Iniciar Session</h1>
//         <form onSubmit={handleSubmit} className='containerIn'>
//           <div>
//             <label>
//               <input
//                 onChange={e => handleChange(e)}
//                 type='email'
//                 name='email'
//                 placeholder='Email'
//                 autoComplete='current-email'
//                 value={form.email}
//               />
//               {error.email && <span className='errorEmail'>{error.email}</span>}
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type='contrasena'
//                 onChange={handleChange}
//                 name='contrasena'
//                 autoComplete='current-password'
//                 placeholder='Contrasena'
//                 value={form.contrasena}
//               />
//               {error.contrasena && (
//                 <span className='errorPass'>{error.contrasena}</span>
//               )}
//             </label>
//             <div className='buttonsSession'>
//               {/* <input type="submit" value="Ingresar"  /> */}
//               <Link to='/'>
//                 <button className='buttonSess'>Iniciar</button>
//               </Link>
//               <h3>Ingresar con Gmail o Facebook</h3>
//               <div className='googFace'>
//                 {/* <button
//                   variant='primary'
//                   className='google'
//                   onClick={handleSesionGoogle}
//                 >
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     width='16'
//                     height='16'
//                     fill='currentColor'
//                     class='bi bi-google'
//                     viewBox='0 0 16 16'
//                   >
//                     <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />
//                   </svg>
//                   oogle
//                 </button> */}
//                 {/* <button
//                   variant='primary'
//                   className='facebook'
//                   onClick={handleFaceBook}
//                 >
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     width='16'
//                     height='16'
//                     fill='currentColor'
//                     class='bi bi-facebook'
//                     viewBox='0 0 16 16'
//                   >
//                     <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
//                   </svg>
//                   acebook
//                 </button> */}
//              </div>
//             </div>
//             <h4>Aún no te has registrado? </h4>
//             <Link to='/register'>Registrarse</Link>
//             <Link to='/login/recoverpassword'>¿Olvidaste la contraseña?</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
import React, { useState } from 'react'
import './iniciar.css'
import NavBar from '../../components/navBar/navBar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from '../../actions/user'
import { validateEmail } from '../../Helpers/validateForm'
import { login,updateUser } from "../../actions/auth";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


const initialForm = {
  contrasena: "",
  email: "",
};

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
function IniciarSession (login,  email, contrasena, edit=false) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [input, setInput] = useState()

  const [showPassword, setShowPasword] = useState(true)

  //   useEffect(() => {
  //   // Si ya está logueado que lo redireccione al dashboard
  //   if (isAuth && user && !edit) {
  //     setForm(initialForm);
  //     const { nombre, rol } = user;
  //     Swal.fire({
  //       text: `Bienvenidx ${nombre}`,
  //       icon: "success",
  //       confirmButtonText: "Ok",
  //     });
  //     // async function db() {
  //     //   await postCart();
  //     // }
  //     //isAuth && db();
  //     if (rol === "1") return navigate("/");
  //     if (rol === "2") return navigate("/dashboard/admin");
  //   }
  // }, [isAuth, navigate, user, edit]);


  const handleSubmit = e => {
    e.preventDefault()
    if (input.email && input.contrasena) {
      dispatch(getUser(input))
      alert(`Bienvenid@`)
      const userForm = { ...input};
      setInput({
        email: '',
        contrasena: ''
      })
      edit ? updateUser(userForm) : login(userForm);
      //navigate('/')
    } else {
      alert(
        'Hubo error, chequear que tu usuario y contrasena estan correctos o tenes que registrarse'
      )
    }
  }

    const handleInputChange = function (e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

  const [errors, setErrors] = useState({})
  return (
    <div>
      <div className='iniciar'>
        <h1>Iniciar Session</h1>
        <form onSubmit={handleSubmit} className='containerIn'>
          <div>
            <label>
              <input onChange={handleInputChange} type='text' name='email' placeholder='Email' />
            </label>
 

          <label>
            <input
              type='contrasena'
              onChange={handleChange}
              name='contrasena'
              autoComplete='current-password'
              placeholder='Contraseña'
              value={form.contrasena}
            />
            {error.contrasena && (
              <span className='errorPass'>{error.contrasena}</span>
            )}
          </label>
          </div>
          <div className='buttonsSession'>
            <div className="box1">
            <Link to='/'>
              <button type='submit' className='buttonSess'>
                Iniciar
              </button>
            </Link>
            <Button
              className='googleBtn'
              variant='primary'
              onClick={handleSesionGoogle}
            >
              Iniciar sesión con Google
            </Button>
            </div>
            <div className="box2">
            <h4>Aún no te has registrado? </h4>
            <Link to='/register'>Registrarse</Link>
            </div>
            {/* <Link to="/login/recoverpassword">¿Olvidaste la contraseña?</Link> */}
          </div>
          <button className='buttonSess'>Iniciar</button>
        </form>
      
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login, updateUser }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSession);

