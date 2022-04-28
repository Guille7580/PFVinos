import React from 'react'
import './wineLoader.css'

export const WineLoader = () => {
  return (
        <div> 
      <div className='containerWine'>
      <div className='wine-glass'>
        <div className='wine'></div>
      </div>
      <div className='glass-stem'></div>
      <div className='glass-base'></div>
      Loading...
    </div>
    </div>
  )
}
