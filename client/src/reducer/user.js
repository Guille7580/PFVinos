import { GET_USER_DETAIL, POST_USER } from '../actions/types.js'

const initialState = {
  getUser: []
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAIL:
      return { ...state, getUser: action.payload }
    case POST_USER:
      return { ...state }
    default:
      return state
  }
}
