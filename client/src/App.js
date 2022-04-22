import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './Pages/Home/home.jsx'
import Cart from './Pages/Checkout/Cart'
import Contact from './Pages/Contact/contact.jsx'
import Perfil from './Pages/Perfil/perfil.jsx'
import AboutUs from './Pages/AboutUs/aboutUs.jsx'
import Register from './Pages/Register/register.jsx'
import IniciarSession from './Pages/IniciarSession/iniciar'
import Detail from './components/Detail/detail.jsx'
import Dashboard from './Pages/Dashboard/Principal/Dashboard'
import NavBar from './components/navBar/navBar'
import { getAllProducts } from './actions/productos'
import { getUserDetail } from './actions/auth'

const App = () => {
  const token = useSelector(state => state.loginReducer.token)
  const isAuth = useSelector(state => state.loginReducer.isAuth)
  const userDetail = useSelector(state => state.loginReducer.userDetail)
  const dispatch = useDispatch()
  const [cartItems, setCartItems] = useState([])

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

  const handleRemoveFromCart = id => {
    //if (cartItems.length === 1) localStorage.removeItem("carrito");

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
    //if (cartItems.length === 1) localStorage.removeItem("carrito");

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
        <NavBar />
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
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<IniciarSession />} />
          <Route path='/contact' element={<Contact />} />
          <Route exact path='/dashboard/admin' element={<Dashboard />} />

          <Route
            path='/detalles/:id'
            element={<Detail handleAddToCart={handleAddToCart} />}
          />

          <Route path='*' element={<Navigate replace to='/' />} />

          <Route
            path='/detalles/:id'
            element={<Detail handleAddToCart={handleAddToCart} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
