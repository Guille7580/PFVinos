import React from 'react'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps'

import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  
`
const Button = styled.button`

`

function Maps() {
  return (
    <div>
       <GoogleMap
         defaultZoom={15}
         defaultCenter={{ lat: -34.6037851, lng: -58.381775 }}
       ></GoogleMap>

       <Marker
         draggable={true}
         position={{ lat: -34.6037851, lng: -58.381775 }}
      ></Marker>

      <p>Podes encontrarnos en Av. 9 de Julio, C1043 CABA, Argentina</p>
     
      </div>
  )
}

// //lat: -34.6037851, lng: -58.381775
export default withScriptjs(withGoogleMap(Maps))