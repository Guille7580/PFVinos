import { GET_CATEGORIA } from "../actions/types";

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
    default:
      return { ...state };
  }
}
