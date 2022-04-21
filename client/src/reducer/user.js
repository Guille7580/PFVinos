import { GET_USER_DETAIL, GET_ALL_USERS, POST_USER } from '../actions/types.js'
console.log('Hola Reducer')

const initialState = {
  getUser: [],
  allUser: []
}

export default function users (state = initialState, action) {

  switch (action.type) {
    case POST_USER:
      return {
        ...state
      }

    case GET_USER_DETAIL:
      return { ...state, getUser: action.payload }

    case GET_ALL_USERS:
      return {
        ...state,
        allUser: action.payload
      }
    default:
      return state
  }
}
