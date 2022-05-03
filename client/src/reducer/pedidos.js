// import { EDIT_STATUS_PEDIDO, GET_PEDIDOS, GET_PEDIDO_DETAIL, GET_PEDIDO_BY_USER } from '../actions/types';

// const initialState = {
//     allPedidos: [],
//     filteredPedidos: [],
//     pedidoDetail: null,
//     userPedidos: []
// }

// export default function pedidosReducer(state = initialState, action) {
//     const { type, payload } = action;

//     switch (type) {
//         case GET_PEDIDO_BY_USER:
//             return { ...state, userPedidos: payload };
            
//         case GET_PEDIDO_DETAIL:
//             return { ...state, pedidoDetail: payload }
//         case GET_PEDIDOS:
//             return {
//                 ...state,
//                 allPedidos: payload,
//                 filteredPedidos: payload
//             }
//         // case EDIT_STATUS_PEDIDO:
//         //     return {
//         //         ...state,
//         //         allPedidos: payload,
//         //         filteredPedidos: payload
//         //     }
//         default:
//             return { ...state }
//     }
// }