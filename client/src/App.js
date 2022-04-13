import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home/home.jsx'
import Cart from './Pages/Checkout/Cart'
import AboutUs from './Pages/AboutUs/aboutUs.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllProducts } from './actions/productos'

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
