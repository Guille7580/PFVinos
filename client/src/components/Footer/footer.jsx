import React from 'react'
import './footer.css'
import { useNavigate } from 'react-router-dom'
import CartBtn from '../ShoppingCartButton/CartBtn'

export default function Footer () {
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/home')
      }
      
      const handleClick = () => {
        navigate('/cart')
      }
      
      const toContact = () => {
        navigate('/aboutUs')
      }

  return (
    <div className='containerFooter'>
      <button to='/home' onClick = {handleSubmit} className='buttons'>
        Home
      </button>
      <button to='/aboutUs' onClick={toContact} className='buttons'>
        About Us
      </button>
      <button to='/carrito' onClick={handleClick} className='buttons'>
        <CartBtn />
      </button>
    </div>
  )
}
