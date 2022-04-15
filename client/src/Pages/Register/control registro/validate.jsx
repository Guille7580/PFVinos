
export const validateForm = (input) => {
    function validateEmail (value) {
        let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      
        return validRegex.test(value)
    }
      
    function validateTlf (value) {
        let regex = /[0123456789]{10}/
      
        return regex.test(value)
    }

    const errors = {}
    if (!input.nombre.trim()) {
      errors.nombre = 'Campo requirido'
    } else if (input.nombre.length < 4) {
      errors.nombre = 'Minimo 4 caracters'
    } else if (input.nombre > 25) {
      errors.nombre = 'Maximo 25 caracters'
    }
  
    if (!input.usuario.trim()) {
      errors.usuario = 'Campo requirido'
    } else if (input.usuario.length < 5) {
      errors.usuario = 'Minimo 5 caracters'
    } else if (input.usuario.length > 25) {
      errors.usuario = 'Maximo 25 caracters'
    }
    if (!input.contrasena.trim()) {
      errors.contrasena = 'Campo requerido'
    } else if (input.contrasena.length < 10) {
      errors.contrasena = 'Mínimo 10 caracteres'
    }
    if (!input.email.trim()) {
      errors.email = 'Campo requerido'
    } else if (!validateEmail(input.email)) {
      errors.email = 'Escriba un email válido'
    }
    if (!input.pais.trim()) {
      errors.pais = 'Campo requerido'
    }
    if (!input.provincia.trim()) {
      errors.provincia = 'Campo requerido'
    }
    if (!input.direccion.trim()) {
      errors.direccion = 'Campo requerido'
    } else if (input.direccion.length < 5) {
      errors.direccion = 'Mínimo 5 caracteres'
    } else if (input.direccion.length > 40) {
      errors.direccion = 'Máximo 40 caracteres'
    }
    if (!input.telefono.trim()) {
      errors.telefono = 'Campo requerido'
    } else if (!validateTlf(input.telefono)) {
      errors.telefono = 'Escriba un número de telefono válido'
    }
    if (input.confirm_contrasena !== input.contrasena) {
      errors.confirm_contrasena = 'Las contraseñas no coinciden'
    }
    return errors
  }