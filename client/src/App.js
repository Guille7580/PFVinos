import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './Pages/Home/home.jsx'
import Cart from './Pages/Checkout/Cart'
import Contact from './Pages/Contact/contact.jsx'
import Perfil from './Pages/Perfil/perfil.jsx'
import PagoExitoso from './Pages/PagosExitoso/PagoExitoso.jsx'
import EditUser from './components/EditUser/EditUser'
import VerOrdenes from './components/Ordenes/verOrdenes.jsx'
import AboutUs from './Pages/AboutUs/aboutUs.jsx'
import Register from './Pages/Register/register.jsx'
import IniciarSession from './Pages/IniciarSession/iniciar'
import { RecoverPass } from './components/Recover_password/RecoverPass'
import  ResetPass  from './components/Reset_password/Resetpasword'
import Detail from './components/Detail/detail.jsx'
import Dashboard from './Pages/Dashboard/Principal/Dashboard'
import NavBar from './components/navBar/navBar'
import CartBtn from './Pages/Checkout/ShoppingCartButton/CartBtn.jsx'
import { getAllProducts } from './actions/productos'
import { getUserDetail } from './actions/auth'
import VerificacionDeChekout from './Pages/Checkout/VerificacionDeChekout.jsx'
import Swal from 'sweetalert2'
import CheckOut from './Pages/Checkout/CheckOut/CheckOut.jsx'




const App = () => {
  const token = useSelector(state => state.loginReducer.token)
  const isAuth = useSelector(state => state.loginReducer.isAuth)
  const userDetail = useSelector(state => state.loginReducer.userDetail)
  const dispatch = useDispatch()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (cartItems.length !== 0)
      localStorage.setItem('carrito', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('carrito'))

    if (items) setCartItems(items)
  }, [])

  const handleAddToCart = clickedItem => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? {
                ...item,
                amount: item.amount < item.stock ? item.amount + 1 : item.amount
              }
            : item
        )
      }

      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }

  const handleAddToCartButton = clickedItem => {
    setCartItems(
      prev => {
        const isItemInCart = prev.find(item => item.id === clickedItem.id)

        if (isItemInCart) {
          return prev.map(item =>
            item.id === clickedItem.id
              ? {
                  ...item,
                  amount:
                    item.amount < item.stock ? item.amount + 1 : item.amount
                }
              : item
          )
        }

        return [...prev, { ...clickedItem, amount: 1 }]
      } /* addItemToIcon() */
    )
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 2000
    })
  }

  const handleRemoveFromCart = id => {
    if (cartItems.length === 1) localStorage.removeItem('carrito')

    setCartItems(prev =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc
          return [...acc, { ...item, amount: item.amount - 1 }]
        } else {
          return [...acc, item]
        }
      }, [])
    )
  }

  const getTotalItems = items => {
    return items.reduce((acc, item) => acc + item.amount, 0)
  }

  const handleDeleteFromCart = id => {
    if (cartItems.length === 1) localStorage.removeItem('carrito')

    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  useEffect(() => {
    token && !isAuth && !userDetail && dispatch(getUserDetail())
  }, [token, dispatch, userDetail, isAuth])

  // useEffect(() => {
  //   !isAuth && dispatch(updateCart());
  // }, [isAuth, dispatch]);

  useEffect(() => {
    dispatch(getAllProducts())
    //dispatch(getAllOfertas());
  }, [dispatch])

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <NavBar cartItems={cartItems} setCartItems={setCartItems} />

        <Routes>
          <Route
            path='/'
            element={
              <Home
                handleAddToCart={handleAddToCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path='/carrito'
            element={
              <Cart
                getTotalItems={getTotalItems}
                handleDeleteFromCart={handleDeleteFromCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleAddToCart={handleAddToCart}
                handleAddToCartButton={handleAddToCartButton}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          <Route path='/checkout' element={<CheckOut cartItems={cartItems}/>} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/pagoexitoso' element={<PagoExitoso />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/perfil/edit' element={<EditUser />} />
          <Route path='/perfil/ordenes' element={<VerOrdenes />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<IniciarSession />} />
          <Route path='/login/recoverpassword' element={<RecoverPass />} />
          <Route path='/login/resetpassword' element={<ResetPass />} />

          <Route path='/contact' element={<Contact />} />

          <Route exact path='/dashboard/admin' element={<Dashboard />} />

          <Route
            path='/detalles/:id'
            element={
              <Detail
                handleAddToCart={handleAddToCart}
                handleAddToCartButton={handleAddToCartButton}
              />
            }
          />

          <Route path='*' element={<Navigate replace to='/' />} />

          <Route
            path='/detalles/:id'
            element={<Detail handleAddToCart={handleAddToCart} />}
          />

          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
