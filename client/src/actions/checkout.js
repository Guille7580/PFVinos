import axios from "axios";
import { BASEURL } from "../assets/URLS";
import getHeaderToken from "../Helpers/getHeaderToken";
import { toast } from "react-toastify";

export function getMercadoPago(payload){
    return async(dispatch) => {
        const mercadopago = await axios.post(`${BASEURL}/mercadopago`, payload);
        return dispatch({
            type:"GET_MERCADOPAGO",
            payload: mercadopago.data
        })
    }
}