import axios from "axios";
import { BASEURL } from "../assets/URLS";
import getHeaderToken from "../Helpers/getHeaderToken";
import { toast } from "react-toastify";
import {
  AUTHENTICATION_ERROR,
  GET_PEDIDO_BY_USER,
  GET_USER_DETAIL,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  UPDATE_USER,
} from "./types";
//import { getPedidosByUser } from './pedidos'



// export const recoveryPassword = async (email) => {
//   let post = await axios.post(
//     `${BASEURL}/password`,
//     { email: `${email}` },
//     {
//       "Content-Type": "application/json",
//     }
//   );

//   console.log("el retorno de post", post);
// };

export function updateUser(newUser) {
  return async function (dispatch) {
    try {
      await axios.put(`${BASEURL}/usuario/update`, newUser, getHeaderToken());
      dispatch(getUserDetail());
      return {
        type: UPDATE_USER,
      };
    } catch (err) {
      console.log(err.response.data);
    }
  };
}

export function logout() {
  return { type: LOGOUT };
}

export function login({email, contrasena}) {
  return async (dispatch) => {
     try {
        // Configuro los headers
        const config = {
           headers: {
              'Content-Type': 'application/json',
           },
        };
        
        // Armo el payload/body
        const body = { email, contrasena };
        
        // Envío la petición con el body y config armados
        const json = await axios.post(`${BASEURL}/user/login`, body, config);
        console.log(localStorage.token_ecommerce)
        // Si todo bien configuro al usuario como logueado
        dispatch({
           type: LOGIN_SUCCESS,
           payload: json.data
        });

        dispatch(getUserDetail());
     } catch (err) {
        toast.error(err.response.data);
        console.log(err);

        // Si ocurrió un error durante el logen, envio el login_fail
        return dispatch({
           type: LOGIN_FAILED
        });
     }
  }
};


export function register({
  nombre,
  usuario,
  contrasena,
  email,
  pais,
  provincia,
  direccion,
  telefono,
}) {
  return async function (dispatch) {
    try {
      // Configuro los headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Armo el payload/body
      const body = {
        nombre,
        usuario,
        contrasena,
        email,
        pais,
        provincia,
        direccion,
        telefono,
      };
      // console.log("body");
      // console.log(body);

      let { data } = await axios.post(`${BASEURL}/user/register`, body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      dispatch(getUserDetail());

    } catch (err) {
      toast.error(err.response.data);
      console.log(err.response.data);

      dispatch({
        type: REGISTER_FAILED,
      });
    }
  };
}

export const getUserDetail = () => {
  return async (dispatch) => {
     const headers = getHeaderToken();

     try {
        const { data } = await axios.get(`${BASEURL}/user`, headers);
        toast(`Bienvenido ${data.nombre}`)
        // console.log(data);
        dispatch({
           type: GET_USER_DETAIL,
           payload: data
        })
        //dispatch(getPedidosByUser(data.id));
     } catch (error) {
        console.log(error.response.data);
        dispatch({
           type: AUTHENTICATION_ERROR
        })
     }
  }
}

export const loginGoogle = ({
  nombre,
  usuario,
  contrasena,
  email,
  pais,
  provincia,
  direccion,
  telefono,
  token,
}) => {
  return async function (dispatch) {
    try {
      // Configuro los headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Armo el payload/body
      const body = {
        nombre,
        usuario,
        contrasena,
        email,
        pais,
        provincia,
        direccion,
        telefono,
        token,
      };

      await axios.post(`${BASEURL}/loginGoogle`, body, config);

      // console.log(data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: body,
      });
      dispatch(getUserDetail());
    } catch (err) {
      console.log(err.response);

      dispatch({
        type: REGISTER_FAILED,
      });
    }
  };
};
