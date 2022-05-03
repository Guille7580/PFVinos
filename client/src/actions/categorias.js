import axios from 'axios';
import { BASEURL } from '../assets/URLS';
import { GET_CATEGORIA, FILTER_BY_CATEGORY, ORD_BYPRICE, ORD_BYNAME, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY  } from './types';

export function getShowActivity(){
    return async function(dispatch){
        try{
          var json= await axios(`${BASEURL}/categoria`);

          return dispatch({
            type: GET_CATEGORIA,
            payload:json.data
        })
        }catch (error) {
          console.log(error)
        }
        
    }
}
export function CreateCategory(payload) {

    let value = { nombre: payload }

    return async function (dispatch) {
        try {
            var json = await axios.post(`${BASEURL}/categoria`,value);
            console.log(json)
            return dispatch({
                type: CREATE_CATEGORY,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }

    }
}
export function UpdateCategory(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put(`${BASEURL}/categoria`, payload);
            console.log(json)
            return dispatch({
                type: UPDATE_CATEGORY,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function DeleteCategory(payload) {
    console.log(payload)
    return async function (dispatch) {
        try {
            var json = await axios.delete(`${BASEURL}/categoria/${payload}`);
            console.log(json)
            return dispatch({
                type: DELETE_CATEGORY,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}



export function filterByCategory(payload) {
    return {
       type: FILTER_BY_CATEGORY,
       payload
 
    }
  }
  export const order_ByPrice = (payload) => {
    return {
      type: ORD_BYPRICE,
      payload,
    };
  }
  export const order_ByName = (payload) => {
    return {
      type: ORD_BYNAME,
      payload,
    };
  }
 


