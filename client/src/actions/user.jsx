import axios from 'axios'
import { BASEURL } from '../assets/URLS'
import { GET_USER_DETAIL, POST_USER, GET_ALL_USERS } from './types'

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
      var json = await axios(`${BASEURL}/login`)
      return dispatch({
        type: GET_USER_DETAIL,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAllUser() {
    return async function (dispatch) {
        console.log('Soy el actions!!!!!!')
        try {
            var json = await axios(`${BASEURL}/users`)
            console.log(json.data)
            return dispatch({
                type: GET_ALL_USERS,
                payload: json.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}