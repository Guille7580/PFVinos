import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Home from './Pages/Home/home.jsx'
import Cart from './Pages/Checkout/Cart'
import AboutUs from './Pages/AboutUs/aboutUs.jsx'
import Register from './Pages/Register/register.jsx'
// import IniciarSession from './Pages/IniciarSession/iniciar.jsx'
import Detail from './components/Detail/detail.jsx'
import Dashboard from './Pages/Dashboard/Principal/Dashboard'

import { getAllProducts } from './actions/productos'
import { getUserDetail } from "./actions/auth";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/carrito' element={<Cart />} />
          <Route path='/aboutUs' element={<AboutUs />} />

          <Route path='/register' element={<Register />} />
          {/* <Route path='/iniciar' element={<IniciarSession />} /> */}

          <Route exact path="/dashboard/admin" element={<Dashboard />} />

          <Route path='/detalles/:id' element={<Detail />}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
