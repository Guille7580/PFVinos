import {validateEmail, validateTlf} from '../../../Helpers/validateForm'

export const validateform =  (form) =>{
    const errors = {}
    if (!form.nombre.trim()) {
      errors.nombre = 'Campo requerido'
    } else if (form.nombre.length < 4) {
      errors.nombre = 'Mínimo 4 caracteres'
    } else if (form.nombre.length > 25) {
      errors.nombre = 'Máximo 25 caracteres'
    }
  
    if (!form.usuario.trim()) {
      errors.usuario = 'Campo requerido'
    } else if (form.usuario.length < 5) {
      errors.usuario = 'Mínimo 5 caracteres'
    } else if (form.usuario.length > 15) {
      errors.usuario = 'Máximo 15 caracteres'
    }
  
    if (!form.email.trim()) {
      errors.email = 'Campo requerido'
    } else if (!validateEmail(form.email)) {
      errors.email = 'Escriba un email válido'
    }
  
    if (!form.pais.trim()) {
      errors.pais = 'Campo requerido'
    }
  
    if (!form.provincia.trim()) {
      errors.provincia = 'Campo requerido'
    }
  
    if (!form.direccion.trim()) {
      errors.direccion = 'Campo requerido'
    } else if (form.direccion.length < 10) {
      errors.direccion = 'Mínimo 10 caracteres'
    } else if (form.direccion.length > 40) {
      errors.direccion = 'Máximo 40 caracteres'
    }
  
    if (!form.telefono.trim()) {
      errors.telefono = 'Campo requerido'
    } else if (!validateTlf(form.telefono)) {
      errors.telefono = 'Escriba un número de telefono válido'
    }
  
    return errors
  }