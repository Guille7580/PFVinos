import { GET_PEDIDOS, GET_PEDIDO_BY_USER, GET_PEDIDO_DETAIL, EDIT_STATUS_PEDIDO, GET_PEDIDOS_STATUS, GET_MERCADOPAGO, GET_BASKET_LOCAL_STORAGE } from '../actions/types'

const initialState = {
    pedidos: [],
    getpedidobyUser: [],
    basket:[],
    mercadoPago: {},
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

            case GET_PEDIDOS_STATUS:
                return {
                    ...state,
                    getpedidobyUser: action.payload
                }
                case GET_BASKET_LOCAL_STORAGE:
                    return{
                        ...state,
                        basket:action.payload
        
                    }
                    case GET_MERCADOPAGO:
                        return {
                            ...state,
                            mercadoPago: action.payload
                        }
        default:
            return{
                ...state
            }
    }

}

