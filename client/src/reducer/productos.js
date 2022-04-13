import { GET_PRODUCTS, GET_DETAIL } from "../actions/types";

const initialState = {
  allProducts: [],
  filtered: [],
  detail: [],
};

export default function productsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        filtered: payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };
    default:
      return { ...state };
  }
}
