import axios from 'axios'
import { BASEURL } from '../assets/URLS'
import {
    CHECKOUT_EMAIL
} from './types'


export function checkoutEmail (payload) {
    console.log(payload)
    return async function (dispatch) {
        try {
            const response = await axios.post(`${BASEURL}/checkout/${payload}`)
            console.log(response.data)
            dispatch({
                type: CHECKOUT_EMAIL,
                payload: response.data,
            });
        } catch (error) {
            console.log("No se pudo enviar el email")
        }
    }
}