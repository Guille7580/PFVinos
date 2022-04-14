import axios from 'axios';
import { BASEURL } from '../assets/URLS';
import {GET_CATEGORIA, FILTER_BY_CATEGORY, ORD_BYPRICE, ORD_BYNAME  } from './types';



export function getShowActivity(){
    return async function(dispatch){
        try{
          var json= await axios(`${BASEURL}/categoria`);
          console.log(json)
          return dispatch({
            type: GET_CATEGORIA,
            payload:json.data
        })
        }catch (error) {
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
 


