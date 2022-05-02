import React from 'react';
import emailjs from '@emailjs/browser';


 function SendEmail(props){
 
    
 
    let templateParams = {
           nombre: props.nombre,
            email: props.email,
            total: props.total 
    };

    //cambiar params

    let serviceId = "service_8y00mht"
    let templateId = "template_8yix8hy"
    let userId = "user_vjPDUOydx5w5N83FrWH9m"


    console.log(templateParams)
        // e.preventDefault();
        emailjs.send(serviceId, templateId, templateParams, userId)
        .then(function(response)  {
            console.log("Success", response.status, response.text);
            
          }, function(error)  {
            console.log("Failed", error);
          });
    

    
  return (
    <div className='container'>
         
        
        <button  onClick={SendEmail}></button>
        
           <h3>Confirmation Email</h3>
           
        
        
        </div>
  )
}
    





export default SendEmail;