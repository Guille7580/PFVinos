import {
    GET_USER_DETAIL,
    GET_ALL_USERS,
    POST_USER,
    GET_BY_EMAIL,
    DELETE_USER,
    CHANGE_CATEGORY
} from '../actions/types.js'


const initialState = {
  getUser: [],
  allUser: [],
  userByEmail: {}
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case POST_USER:
      return {
        ...state
      }

    case DELETE_USER:
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
    case GET_BY_EMAIL:
      return {
        ...state,
        userByEmail: action.payload.filter(el => el.email === action.payload)
          }
      case CHANGE_CATEGORY:
          return {
              ...state
          }
    default:
      return state
  }
}
