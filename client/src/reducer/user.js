import { GET_USER_DETAIL, GET_ALL_USERS } from '../actions/types.js'
console.log('Hola Reducer')

const initialState = {
    getUser: [],
    allUser:[]
}

export default function users(state = initialState, action) {

    console.log('Hola Reducer')

    switch (action.type) {

        case GET_USER_DETAIL:
            return { ...state, getUser: action.payload }

        case GET_ALL_USERS:
            console.log('Soy el reducer!!!')
            return {
                ...state,
                allUser: action.payload
            }
        default:
            return state
    }
}


