import {
  EDIT_STATUS_PEDIDO,
  GET_PEDIDOS,
  GET_PEDIDO_DETAIL,
  GET_PEDIDO_BY_USER
} from '../actions/types'

const initialState = {
  allPedidos: [],
  filteredPedidos: [],
  pedidoDetail: null,
  userPedidos: [],
  pedidos: []
}

export default function pedidosReducer (state = initialState, action) {
  // console.log(JSON.stringify(state.userPedidos) + ' aaaaaaaaaaaaaaaaaaaa')
  //console.log(JSON.stringify(action) + "EEEEEEEEEEEEEEE")
  //const { type } = action
  console.log(JSON.stringify(action.payload) + ' ZZZZZZZZZZZreducerZZZZZZZZZZzzz')
  switch (action) {
    case GET_PEDIDO_BY_USER:
      return { state, userPedidos: action.payload }

    case EDIT_STATUS_PEDIDO:
      return {
        ...state
      }

    case GET_PEDIDOS:
      return {
        ...state,
        pedidos: action.payload
      }
    default:
      return { ...state }
  }
}
