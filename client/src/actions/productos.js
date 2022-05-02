import axios from "axios"; 
import Swal from "sweetalert2"
import { BASEURL } from "../assets/URLS";
import { GET_PRODUCTS, GET_DETAIL, GET_NAME_PRODUCTS, RESET_DETAIL, DELETE_PRODUCT, POST_PRODUCT, UPDATE_PRODUCT } from "./types";

export const getAllProducts = () => async (dispatch) => {
  try {
    const responseProduct = await axios.get(`${BASEURL}/products`);
    return dispatch({
      type: GET_PRODUCTS,
      payload: responseProduct.data,
    });
  } catch (err) {
    
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
    
  }
};
export function getNameProducts(title) {
  return async function (dispatch) {
    try {
      
      let response = await axios(`${BASEURL}/products?title=${title}`);
    
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
export function deleteProduct(payload) {
    
    return async function (dispatch) {
        try {
            const response = await axios.delete(`${BASEURL}/products/${payload}`);
            dispatch({
                type: DELETE_PRODUCT,
                payload: response.data,
            });
        } catch (err) {
            console.log(err.response.data);
        }
    };
}
export function resetDetail() {
    return {
      type: RESET_DETAIL
      
    }
}
export function postProduct(payload) {

    return async function (dispatch) {
       
        try {
            const response = await axios.post(
                `${BASEURL}/products`, payload
            );
            return dispatch({
                type: POST_PRODUCT,
                payload: response.data,
            });
        } catch (error) {
            console.log("desde error request", error);
        }
    };
}
export function updateProduct(payload) {
   
    return async function (dispatch) {
        try {
            const response = await axios.put(`${BASEURL}/products/${payload.id}`, payload)
            return dispatch({
                type: UPDATE_PRODUCT,
                payload: response.data,
            })

        } catch (error) {
            console.log("desde error request", error);
        }
    }
}
