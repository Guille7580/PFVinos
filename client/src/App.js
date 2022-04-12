import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home/home.jsx'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
