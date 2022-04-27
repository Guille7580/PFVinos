import React, {useState} from 'react'
import Range from './Rating'




function Feedback() {
 
    
  return (
    <div>
        <h3>Rating</h3>
      
            <Range/>
             <textarea
            
            placeholder='Deja tu comentario aqui'
            rows='5' 
            style={{
              width: '100%',
              resize: 'vertical',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              marginTop: '10px',
              marginBottom: '10px',
              
              
          }}               
            />

            <button>Submit</button>

    </div>
  )
}

export default Feedback