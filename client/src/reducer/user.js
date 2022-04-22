import { GET_USER_DETAIL, GET_ALL_USERS, POST_USER, DELETE_USER, GET_BY_EMAIL } from '../actions/types.js'
console.log('Hola Reducer')

const initialState = {
    getUser: [],
    allUser: [],
    userByMail: {}
}

export default function users (state = initialState, action) {

  switch (action.type) {
    case POST_USER:
      return {
        ...state
          }

      case DELETE_USER:
          return {
              ...state,
          }

    case GET_USER_DETAIL:
      return { ...state, getUser: action.payload }

    case GET_ALL_USERS:
      return {
        ...state,
        allUser: action.payload
          }

      case GET_BY_EMAIL:
          return {
              ...state,
              userByMail: state.allUser.filter(el => el.mail === action.payload)
          }
    default:
      return state
  }
}
