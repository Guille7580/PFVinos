import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNameProducts } from '../../actions/productos'
import './searchBar.css'

export default function SearchBar () {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  //console.log(title)
  function handleInputProducts (e) {
    e.preventDefault()
    setTitle(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    dispatch(getNameProducts(title))
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='searchBar'
        value={title}
        type='text'
        placeholder='Buscar Productos...'
        onChange={e => handleInputProducts(e)}
      />
      <button
        className='searchBtn'
        type='submit'
        onClick={e => handleSubmit(e)}
      >
        Buscar
      </button>
    </form>
  )
}
