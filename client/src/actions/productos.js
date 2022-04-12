import axios from 'axios';
import { BASEURL } from '../assets/URLS';
import {
   GET_PRODUCTS,
} from './types';
import Swal from "sweetalert2";

export const getAllProducts = () => async dispatch => {
   try {
      const res = await axios(`${BASEURL}/products`);
      return dispatch({ type: GET_PRODUCTS, 
                        payload: res.data });
   } catch {
      return console.log('NO llega la informacion');
   }
}



