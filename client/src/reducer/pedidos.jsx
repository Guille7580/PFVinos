import { GET_PEDIDOS, GET_PEDIDO_BY_USER, GET_PEDIDO_DETAIL, EDIT_STATUS_PEDIDO } from '../actions/types'

const initialState = {
    pedidos: []
}

export default function pedidosReducer(state = initialState, action) {

    switch (action.type) {

        case EDIT_STATUS_PEDIDO:
            return {
                ...state,    
            }

        case GET_PEDIDOS:
            return {
                ...state,
                pedidos: action.payload
            }
        default:
            return{
                ...state
            }
    }

}
