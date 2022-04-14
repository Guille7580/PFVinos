import axios from 'axios'
import { BASEURL } from '../assets/URLS'
import { GET_USER_DETAIL, POST_USER } from './types'

export function postUser (payload) {
  return async function (dispatch) {
    const response = await axios.post(`${BASEURL}/register`, payload)
    dispatch({
      type: POST_USER,
      payload: response.data
    })
  }
}

export function getUser () {
  return async function (dispatch) {
    try {
      var json = await axios(`${BASEURL}/user`)
      return dispatch({
        type: GET_USER_DETAIL,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}
