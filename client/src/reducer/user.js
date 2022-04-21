import { GET_USER_DETAIL, POST_USER,  GET_ALL_USERS } from '../actions/types.js'

const initialState = {
    getUser: [],
    allUser:[]
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAIL:
      return { ...state, getUser: action.payload }
    case POST_USER:
      return {
        ...state
      }

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