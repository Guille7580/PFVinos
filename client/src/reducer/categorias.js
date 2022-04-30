import { GET_CATEGORIA, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from "../actions/types";


const initialState = {
  allCategory: [],
};

export default function productsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIA:
        return {
            ...state,
            allCategory: payload
          }
      case CREATE_CATEGORY:
          return {
              ...state
          }
      case UPDATE_CATEGORY: {
          return {
            
              ...state
          }
      }
      case DELETE_CATEGORY: {
          return {
              ...state
          }
      }
    default:
      return { ...state };
  }
}
