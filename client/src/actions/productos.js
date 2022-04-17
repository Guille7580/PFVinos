import axios from "axios"; 
import Swal from "sweetalert2"
import { BASEURL } from "../assets/URLS";
import { GET_PRODUCTS, GET_DETAIL, GET_NAME_PRODUCTS, RESET_DETAIL } from "./types";


export const getAllProducts = () => async (dispatch) => {
  try {
    const responseProduct = await axios.get(`${BASEURL}/products`);
    return dispatch({
      type: GET_PRODUCTS,
      payload: responseProduct.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getDetail = (id) => async (dispatch) => {
  try {
    const json = await axios.get(`${BASEURL}/products/` + id);
    return dispatch({
      type: GET_DETAIL,
      payload: json.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export function getNameProducts(title) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${BASEURL}/products?title=${title}`);
      return dispatch({
        type: GET_NAME_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "No se encontro el producto!",
      });
    }
  }
  };

  export function resetDetail() {
    return {
      type: RESET_DETAIL
      
    }
  }
  

