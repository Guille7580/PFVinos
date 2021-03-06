import React, { useState , useEffect} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import styles from './RecoverPassword.module.css'
import { ToastContainer } from 'react-toastify'
import { WarningAlert, SuccessAlert, ErrorAlert } from '../../assets/alerts'
import { BASEURL } from '../../assets/URLS'
import {getAllUser} from '../../actions/user'

export const RecoverPass = () => {
  function validateEmail (value) {
    let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return validRegex.test(value)
  }
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const alluser = useSelector(state => state.users.allUser)

  useEffect(() => {
    dispatch (getAllUser())
  }, [dispatch])

  const handleChange = e => {
    const { value } = e.target
    setEmail(value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    
    if (!email || !validateEmail(email)){
      return WarningAlert('Complete su Correo')}
      
    const filteruser= alluser.filter(elem => elem.email === email)
 
    if (filteruser[0] === undefined) {
      setEmail('')
      return WarningAlert('Su Correo no es valido , ingrese uno valido')}
    
    try {
      await axios.post(`${BASEURL}/password/${email}`)
      setEmail('')
      SuccessAlert('Revisa tu email')
    } catch (error) {
      ErrorAlert(
        (typeof error?.response?.data === 'string'
          ? error.response.data
          : error.response.data?.message) || 'Hubo un error :('
      )
    }
  }
  let err = styles.none
  let errInp = styles.inputText
  if (validateEmail(email)) {
    err = styles.none
    errInp = styles.inputText
  } else {
    err = styles.error
    errInp = styles.errorInp
  }

  return (
    <main>
      <div className={styles.contain}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.name}>Ingresa tu correo</label>
          <input
            className={errInp}
            type='text'
            onChange={handleChange}
            icon={'f'}
            name='email'
            value={email}
            placeholder='Correo...'
          />
          <input className={styles.btn} type='submit' value='Recuperar' />
        </form>
        <ToastContainer limit={3} />
      </div>
    </main>
  )
}
