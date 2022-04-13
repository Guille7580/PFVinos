import React from 'react'
import './iniciar.css'
import NavBar from '../../components/navBar/navBar'
import Footer from '../../components/Footer/footer'

export default function IniciarSession () {
  return (
      <div>
      <NavBar />
    <div className='iniciar'>
      <h1>Iniciar Session</h1>
      <div className='containerIn'>
        <div>
          <label>
            <input type='text' placeholder='Email' />
            Email
          </label>
        </div>
        <div>
          <label>
            <input type='text' placeholder='Contrasena' />
            Contrasena
          </label>
        </div>
          <button className='buttonSess'>Iniciar</button>
      </div>
      <Footer />
    </div>
    </div>
  )
}
