import React from 'react'
import './contact.css'
import Maps from '../../components/Map/maps'
import credentials from './credentials'
import { Link } from 'react-router-dom'

export default function Contact () {
  return (
    <div className='contactContainer'>
      <Maps
        lat={-34.6037851}
        lng={-58.381775}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${credentials.apiKey}&libraries=geometry,drawing,places&callback=initMap`}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        loadingElement={<p>Loading...</p>}
      />

      <div>whatsapp Telefono: 555-555-555</div>
      <form className='contactForm'>
        <div>
          <label>Email: </label>
          <input type='text' placeholder='Email' />
        </div>
        <div>
        <label>Nombre: </label>
          <input type='text' placeholder='Nombre' />
        </div>
        <div>
          <label>Telefono: </label>
          <input type='text' placeholder='Telefono' />
        </div>
        <div>
          <label>Consulta: </label>
          <input type='textArea' placeholder='Consulta' />
        </div>
      </form>
      <Link to='/'>
      <button className='bkButton'>Volver</button>
      </Link>
    </div>
  )
}
