import {
    GET_PRODUCT_BY_ID,
    DELETE_PRODUCT, EDIT_PRODUCT, ADD_PRODUCT
} from '../actions/types';

const initialState = {
    singleProduct: [],
    details: {},
    allProducts: [],
    products: []
}

export default function adminReducer(state = initialState, action) {

    switch (action.type) {

        case ADD_PRODUCT:
            return { ...state, products: state.products.concat(action.payload)};

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                singleProduct: action.payload,
                details: action.payload
            }
        case DELETE_PRODUCT:
            let deletedProduct = state.products.filter(el => el._id !== action.payload._id)
            return {
                ...state,
                allProducts: [...deletedProduct]
            };
        case EDIT_PRODUCT:
            let index = state.allProducts.findIndex(product => product.id === action.payload.id);
            state.allProducts[index] = action.payload;
            return {
                ...state,
                allProducts: [...state.products]
            };
        default: return state
    }
}