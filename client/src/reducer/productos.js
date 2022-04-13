import {
    GET_PRODUCTS,
} from '../actions/types';

const initialState = {
    allProducts: [],
    filtered: [],
}

export default function productsReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case GET_PRODUCTS: return {
            ...state,
            allProducts: payload,
            filtered: payload
        }
        
        default:
            return { ...state }
    }
}