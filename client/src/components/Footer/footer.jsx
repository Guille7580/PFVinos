import React from 'react'
import './footer.css'
import { useNavigate } from 'react-router-dom'
import CartBtn from '../ShoppingCartButton/CartBtn'

export default function Footer () {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/')
  }

  const handleClick = () => {
    navigate('/carrito')
  }

  const toContact = () => {
    navigate('/aboutUs')
  }

  return (
    <div className='containerFooter'>
      <button onClick={handleSubmit} className='buttons'>
        Home
      </button>
      <button onClick={toContact} className='buttons'>
        About Us
      </button>
      <button onClick={handleClick} className='buttons'>
        <CartBtn />
      </button>
    </div>
  )
}
