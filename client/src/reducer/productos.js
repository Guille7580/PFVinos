import {

} from '../actions/types';

const initialState = {
}

export default function productsReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        
        default:
            return { ...state }
    }
}