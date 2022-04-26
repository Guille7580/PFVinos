import React,{useState} from "react";
import styles from './RecoverPassword.module.css'
import { recoveryPassword } from "../../actions/auth";


export const RecoverPass = ()=>{
    
    const [state, setState] = useState({
        email:'example@example.com'
    })
    let expRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let Result = expRegular.test(state.email)
    


     const handleChange = (e)=>{
         setState({
             email:e.target.value
            })
            
            console.log('esto es result',Result)
            
        }
        
        const handleSubmit = async(e)=>{
            e.preventDefault()
            if(state.email === '' || state.email === 'example@example.com'){
             alert('Debes incluir un correo valido')
            }
            recoveryPassword(state.email)

       

     }


           let err = styles.none
           let errInp = styles.inputText
           if(Result){
            err = styles.none
            errInp = styles.inputText
           }else{
            err = styles.error
            errInp = styles.errorInp
           }
           
           
           return(
               <main>
           <div className={styles.contain}>
            <form onSubmit={handleSubmit} className={styles.form}>

              <label className={styles.name} >Ingresa tu correo</label>
              <input className={errInp} type='text' onChange={handleChange} icon={'f'}/>
              <p className={err}>Introduce un correo valido</p>
              
              <input className={styles.btn} type='submit' value='Recuperar'/>

            </form>
           </div>
        </main>
    )
}