
import { GET_PRODUCTS, GET_DETAIL, GET_NAME_PRODUCTS, FILTER_BY_CATEGORY, ORD_BYNAME, ORD_BYPRICE} from "../actions/types";


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
    case ORD_BYNAME:
        var sorted 
        var copyproduct = [...state.allProducts]
            if(action.payload === 'nada'){
                sorted = copyproduct
            }
            if (action.payload === 'asc'){
                sorted = copyproduct.sort((a,b) => {
                    if (a.title > b.title) return 1;
                    if(a.title < b.title) return -1;
                    return 0;
                })
            }
            if(action.payload === 'desc'){
                sorted = copyproduct.sort((a,b) => {
                    if (a.title > b.title) return -1;
                    if(a.title < b.title)return 1;
                    return 0;
                })
            }
            return{
                ...state,
                allProducts:  sorted
            } 
    case ORD_BYPRICE:
        var sortedpri 
        var copyproductprice = [...state.allProducts]
            if(action.payload === 'nada'){
                sortedpri = copyproductprice
            }
            if (action.payload === 'asce'){
                sortedpri = copyproductprice.sort((a,b) => {
                     if (a.price > b.price) return 1;
                     if(a.price < b.price) return -1;
                     return 0;
                })
            }
            if(action.payload === 'desce'){
                sortedpri = copyproductprice.sort((a,b) => {
                     if (a.price > b.price) return -1;
                     if(a.price < b.price)return 1;
                     return 0;
                })
            }
            return{
                ...state,
                allProducts:  sortedpri
            }         
    default:
      return { ...state };
  }
}
