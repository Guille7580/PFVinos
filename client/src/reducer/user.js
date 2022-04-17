import { GET_USER_DETAIL } from '../actions/types.js'

const initialState = {
  getUser: []
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAIL:
      return { ...state, getUser: action.payload }

    default:
      return state
  }
}
