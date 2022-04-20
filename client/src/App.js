import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Home from './Pages/Home/home.jsx'
import Cart from './Pages/Checkout/Cart'
import AboutUs from './Pages/AboutUs/aboutUs.jsx'
import Register from './Pages/Register/register.jsx'
import IniciarSesion from './Pages/IniciarSession/iniciar'
import Detail from './components/Detail/detail.jsx'
import Dashboard from './Pages/Dashboard/Principal/Dashboard'
import NavBar from "./components/navBar/navBar"
import { getAllProducts } from './actions/productos'
import { getUserDetail } from "./actions/auth";

const App = () => {
  const token = useSelector((state) => state.loginReducer.token);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  const userDetail = useSelector((state) => state.loginReducer.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    token && !isAuth && !userDetail && dispatch(getUserDetail());
  }, [token, dispatch, userDetail, isAuth]);

  // useEffect(() => {
  //   !isAuth && dispatch(updateCart());
  // }, [isAuth, dispatch]);

  useEffect(() => {
    dispatch(getAllProducts());
    //dispatch(getAllOfertas());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/carrito' element={<Cart />} />
          <Route path='/aboutUs' element={<AboutUs />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<IniciarSesion />} />

          <Route exact path="/dashboard/admin" element={<Dashboard />} />


          <Route path='/detalles/:id' element={<Detail />}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
