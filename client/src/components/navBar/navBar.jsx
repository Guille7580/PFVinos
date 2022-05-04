import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navBar.css'
import logo from './LasMoritasLogo.png'
import CartBtn from '../../Pages/Checkout/ShoppingCartButton/CartBtn'
import { useState, useEffect } from 'react'
import { logout } from '../../actions/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

const options = [
  { value: 'Perfil', label: 'Perfil' },
  { value: 'Editar', label: 'Editar' },
  { value: 'Tus Compras', label: 'Tus Compras' }
]

const NavBarAll = ({cartItems}) => {
 // console.log(cartItems)
  return (
    <>
      <Link to='/aboutUs' className='navButton'>
         Nosotros
      </Link>
      <Link to='/contact' className='navButton'>
        Contacto
      </Link>
      <Link to='/carrito' className='navButton'>
        <CartBtn cartItems={cartItems}/>
      </Link>
    </>
  )
}

//login y register
const NavBarLogin = () => {
  return (
    <>
      <Link to='/login' className='navButton'>
        Iniciar Sesión
      </Link>
      <Link to='/register' className='navButton'>
        Registrarse
      </Link>
    </>
  )
}
const NavBarAdmin = () => {
  const [admin, setAdmin] = useState(true)
  const navigate = useNavigate()

  const handleAdmin = e => {
    e.preventDefault()

    setAdmin(true)
    navigate('/dashboard/admin')
  }

  const handleUsuarioNormal = e => {
    e.preventDefault()

    setAdmin(false)
    navigate('/home')
  }

  return (
    <>
      {admin ? (
        <>
          <NavLink to='/dashboard/admin'>Dashboard</NavLink>
          <NavLink to='/dashboard/sales'>Sales</NavLink>
          <NavLink to='/dashboard/offers'>Ofertas</NavLink>
        </>
      ) : (
        <NavBarAuthenticated className="navAuth" />
      )}
      {admin ? (
        <button className='btn btn-success' onClick={handleUsuarioNormal}>
          Comprador
        </button>
      ) : (
        <button className='btn btn-success' onClick={handleAdmin}>
          Administrador
        </button>
      )}
    </>
  )
}

const NavBarAuthenticated = ({cartItems}) => {
  let navigate = useNavigate()
    const handleClickPerfil=(e)=>{
      
      if (e.value === "Perfil") {
        navigate("/perfil")}
      if (e.value === "Editar"){
        navigate("/perfil/edit")
      }
      if ( e.value === 'Tus Compras'){
        navigate("./perfil/ordenes")
      }
    }

  return (
    <div className="navContainer">
      <NavBarAll cartItems={cartItems}/>

      <Select options={options}
              onChange = { handleClickPerfil } />
      {/* <Link to='/perfil' className='navButton'>
       Perfil
      </Link> */}
    </div>
  )
}

function NavBar ({cartItems}) {
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.loginReducer.userDetail)
  const isAuth = useSelector(state => state.loginReducer.isAuth)

  const handleLogout = () => {
    setFlag(true)
    dispatch(logout())
    navigate('/home')
  }

  // useEffect(() => {
  //   if (flag) dispatch(updateCart());
  //   setFlag(false);
  // }, [setFlag, updateCart, dispatch]);

  return (
    <div className='navContainer'>
      <Link to='/'>
        <img className='image' src={logo} alt='logo de las moritas' />
      </Link>

      {isAuth && user ? (
        <>
          {user.rol === '2' ? <NavBarAdmin /> : <NavBarAuthenticated className="navAuth" cartItems={cartItems}/>}
          <div className='navButtonHola'> Hola, {user.usuario} </div>
          <Link to='/' className='navButton' onClick={handleLogout}>
            Salir
          </Link>
        </>
      ) : (
        <>
          <NavBarLogin />
          <NavBarAll cartItems={cartItems}/>
          
        </>
      )}
    </div>
  )
}

export default NavBar
