import axios from 'axios';
import { BASEURL } from '../assets/URLS';
import {GET_PRODUCTS} from './types';


export const getAllProducts = () => async dispatch => {
   try {
      const responseProduct = await axios.get(`${BASEURL}/products`)
      return dispatch({
          type: GET_PRODUCTS,
          payload: responseProduct.data
      })
  } catch (err) {
      console.log(err.response.data)
  }
}



