import axios from 'axios'
import { BASEURL } from '../assets/URLS'
import { GET_USER_DETAIL, GET_ALL_USERS, POST_USER, DELETE_USER } from './types'


export function getUser () {
  return async function (dispatch) {
    try {
      var json = await axios(`${BASEURL}/user/reg`)
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
        try {
            var json = await axios(`${BASEURL}/user/all`)
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

export function postUser(payload) {
    console.log(payload)
    return async function (dispatch) {
        try {
            const response = await axios.post(`${BASEURL}/user/register`, payload)
            console.log('response', response)
            return dispatch({
                type: POST_USER,
                payload: response.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export function deleteUser(payload) {
    return async function (dispatch) {
        const response = await axios.delete(`${BASEURL}/user/delete`, payload)
        dispatch({
            type: DELETE_USER,
            payload: response.data
        })
    }
}