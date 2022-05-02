const initialState = {
    mercadoPago: {},
}

export default function checkReducer(state = initialState, action) {
    switch (action.type) {
case 'GET_MERCADOPAGO':
    return {
        ...state,
        mercadoPago: action.payload
    }
    default:
        return state

}

}