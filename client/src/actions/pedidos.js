import axios from 'axios';
import { toast } from 'react-toastify';
import { BASEURL } from '../assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken'
import {
   EDIT_STATUS_PEDIDO,
   GET_PEDIDOS,
   GET_PEDIDO_BY_USER,
   GET_PEDIDO_DETAIL
} from './types';


export const getDetailPedido = (pedido) => {
   return { type: GET_PEDIDO_DETAIL, payload: pedido };
}

export const postPedido = (pedido) => {
   return async function (dispatch) {
      try {
         const { data } = await axios.post(
            `${BASEURL}/pedidos`,
            pedido,
            getHeaderToken()
         );
         // console.log(data);
         return dispatch(getDetailPedido(data));
      } catch (err) {
         console.log(err.response.data);
      }
   }
}

export const deletePedido = (pedidoId) => {
   return async function (dispatch) {
      try {
         await axios.delete(
            `${BASEURL}/pedidos/${pedidoId}`,
            getHeaderToken()
         );
         toast.success("Pedido eliminado exitosamente");
         return dispatch(getDetailPedido(null));
      } catch (err) {
         toast.error("No se ha podido eliminar el pedido");
         console.log(err.response.data);
      }
   }
}

export const getAllPedidos = () => {
   return async function (dispatch) {
      try {
         const { data } = await axios.get(
            `${BASEURL}/pedidos`,
            getHeaderToken()
         );
         return dispatch({ type: GET_PEDIDOS, payload: data });
      } catch (err) {
         console.log(err);
      }
   }
}

export function getPedidosByUser (payload) {
   console.log(payload + 'HOla accionessssss')
   const { email } = payload
   return async function (dispatch) {
     try {
       const { data } = await axios.get(`${BASEURL}/pedidos/${email}`)
       return dispatch({ type: GET_PEDIDO_BY_USER, payload: data })
     } catch (err) {
       //toast.error('No se han podido cargar los pedidos')
       return console.log(err.response.data)
     }
   }
 }
 
export function editStatusPedido(pedidoId, newStatus) {
   return async function (dispatch) {
      try {
         const config = getHeaderToken()
         const response = await axios.put(`${BASEURL}/pedidos/${pedidoId}`, newStatus, config)
         return {
            type: EDIT_STATUS_PEDIDO,
            payload: response.data
         }
      } catch (err) {
         return console.log(err.response.data);
      }
   }
}