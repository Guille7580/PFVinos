import {validateEmail} from '../../../Helpers/validateForm'

export const validateForm = (form) => {
  const { email, contrasena } = form;
  const errors = {};

  if (!email.trim()) {
    errors.email = "El email es requerido";
  } else if (!validateEmail(email)) {
    errors.email = "Email no válido";
  }

  if (!contrasena.trim()) {
    errors.contrasena = "La contraseña es requerida";
  }

  return errors;
};