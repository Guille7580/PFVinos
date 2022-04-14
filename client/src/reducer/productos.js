
import { GET_PRODUCTS, GET_DETAIL, GET_NAME_PRODUCTS,FILTER_BY_CATEGORY} from "../actions/types";


const initialState = {
  
  allProducts: [],
  filtered: [],
  detalles: [],
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
        detalles: payload,
      };


    case GET_NAME_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };

    case FILTER_BY_CATEGORY:
      const Todos = state.filtered
      let categoriesProducts = payload === "All" ? Todos : Todos.filter((elem) => elem.Categorium.nombre === action.payload)
      return {
        ...state,
        allProducts: categoriesProducts
      }
    default:
      return { ...state };
  }
}
