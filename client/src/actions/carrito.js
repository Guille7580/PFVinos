import axios from 'axios'
import { BASEURL } from '../assets/URLS'
import getHeaderToken from "../Helpers/getHeaderToken"
import { ADD_ITEM, DELETE_CART, DELETE_CART_DB, DELETE_ITEM, GET_CART, REST_ITEM, UPDATE_CART, GET_CARRITO } from "./types"

export const addItem = id => {
  return {
    type: ADD_ITEM,
    payload: id
  }
}

export const deleteItem = id => {
  return {
    type: DELETE_ITEM,
    payload: id
  }
}

export const restItem = id => {
  return {
    type: REST_ITEM,
    payload: id
  }
}

export function updateCart () {
  return { type: UPDATE_CART }
}

export const getCartDB = userId => async dispatch => {
  try {
    // let config = getHeaderToken();
    const { data } = await axios.get(
      `${BASEURL}/carrito/${userId}`
      //config
    )
    return dispatch({ type: GET_CART, payload: data })
  } catch (err) {
    return console.log(err.response.data)
  }
}

export const postCart = async () => {
  await axios.post(`${BASEURL}/carrito`, {})
}
//getHeaderToken()

export const putCart = async (cart, id) => {
  await axios.put(`${BASEURL}/carrito/add`, {
    carritoId: id,
    productoId: cart.id,
    cantidad: cart.quantity
  } , getHeaderToken())
}
//, getHeaderToken()

export const deleteProductCart = async (product, id) => {
  await axios.put(`${BASEURL}/carrito/delete`, {
    carritoId: id,
    productoId: product
  })
}
//, getHeaderToken()
export const deleteAllCartDB = id => async dispatch => {
  try {
    const res = await axios.delete(`${BASEURL}/carrito/${id}`)
    const data = res.data
    return dispatch({ type: DELETE_CART_DB, payload: data })
  } catch (err) {
    return console.log(err.response.data)
  }
} //, getHeaderToken()

export const deleteAllCart = () => {
  return {
    type: DELETE_CART
  }
}

export function getCarrito () {
  return async function (dispatch) {
    try {
      var json = await axios(`${BASEURL}/pagar`)
      console.log(json.data)
      return dispatch({
        type: GET_CARRITO,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function postPedido(order) {
  return async function () {
    try {
    var json = await axios.post(`${BASEURL}/pedidos/:email`, order)
  } catch (error) {
    console.log(error)
  }
}}
