// import {
//   UPDATE_CART,
//   ADD_ITEM,
//   REST_ITEM,
//   DELETE_ITEM,
//   GET_CART,
//   DELETE_CART,
//   DELETE_CART_DB
// } from '../actions/carrito.js'
// import {
//   getCartLocalStorage,
//   saveCartLocalStorage
// } from '../helpers/localstorage'

// import { putCart, deleteProductCart } from '../actions/cart'

// const initialState = {
//   cart: getCartLocalStorage(),
//   carts: {}
// }

// export default function productsReducer (state = initialState, action) {
//   const { type, payload } = action
//   let newCart = state.cart,
//     newProducts,
//     itemCart

//   switch (type) {
//     //Cart
//     case UPDATE_CART:
//       if (localStorage.getItem('token_ecommerce')) {
//         const localS = getCartLocalStorage()
//         if (state.flag && state.carts.id) {
//           localS.products?.forEach(el => putCart(el, state.carts.id))
//         }
//       }

//       return {
//         ...state,
//         cart: getCartLocalStorage()
//       }

//     case ADD_ITEM:
//       itemCart = state.cart.products.find(e => e.id === payload)
//       if (itemCart) {
//         newProducts = state.cart.products.map(item =>
//           item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
//         )

//         if (localStorage.getItem('token_ecommerce')) {
//           newProducts?.forEach(el => putCart(el, state.carts.id))
//         }

//         newCart = {
//           products: newProducts,
//           precioTotal: newProducts.reduce((prev, e) => {
//             let prod = state.allProducts.find(el => el.id === e.id)

//             return Math.round((prev + prod.price * e.quantity) * 100) / 100
//           }, 0)
//         }
//       } else {
//         newCart = {
//           products: [...state.cart.products, { id: payload, quantity: 1 }],
//           precioTotal:
//             Math.round(
//               (state.cart.precioTotal +
//                 state.allProducts.find(e => e.id === payload).price) *
//                 100
//             ) / 100
//         }
//       }
//       saveCartLocalStorage(newCart)

//       return {
//         ...state,
//         cart: newCart,
//         flag: true
//       }
//     case REST_ITEM:
//       itemCart = state.cart.products.find(e => e.id === payload)
//       if (itemCart) {
//         newProducts = state.cart.products.map(item =>
//           item.id === payload ? { ...item, quantity: item.quantity - 1 } : item
//         )

//         newCart = {
//           ...newCart,
//           products: newProducts,
//           precioTotal:
//             Math.round(
//               (state.cart.precioTotal -
//                 state.allProducts.find(e => e.id === payload).price) *
//                 100
//             ) / 100
//         }
//         saveCartLocalStorage(newCart)
//       }
//       return {
//         ...state,
//         cart: newCart
//       }
//     case DELETE_ITEM:
//       itemCart = state.cart.products.find(e => e.id === payload)

//       if (localStorage.getItem('token_ecommerce')) {
//         deleteProductCart(payload, state.carts.id)
//       }
//       itemCart &&
//         (newCart = {
//           products: state.cart.products.filter(e => e.id !== payload),
//           precioTotal:
//             Math.round(
//               (state.cart.precioTotal -
//                 itemCart.quantity *
//                   state.allProducts.find(e => e.id === payload).price) *
//                 100
//             ) / 100
//         })
//       saveCartLocalStorage(newCart)
//       return {
//         ...state,
//         cart: newCart,
//         flag: false
//       }
//     case GET_CART:
//       const localS = getCartLocalStorage()
//       if (state.flag && state.carts.id) {
//         const carritoDB = state.carts.CarritoDetalles?.map(el => {
//           return { ...el, id: el.productoId, quantity: el.cantidad }
//         })
//         const cartDB = {
//           products: carritoDB || localS.products,
//           precioTotal:
//             carritoDB?.reduce((prev, e) => {
//               let prod = state.allProducts.find(el => el.id === e.id)

//               return Math.round((prev + prod.price * e.quantity) * 100) / 100
//             }, 0) || localS.precioTotal
//         }
//         saveCartLocalStorage(cartDB)
//       }

//       return {
//         ...state,
//         carts: payload,
//         flag: true
//       }
//     case DELETE_CART:
//       newCart = {
//         products: [],
//         precioTotal: 0
//       }
//       saveCartLocalStorage(newCart)
//       return {
//         ...state,
//         cart: newCart
//       }
//     case DELETE_CART_DB:
//       return {
//         ...state,
//         carts: payload
//       }
//     default:
//       return { ...state }
//   }
// }
const initialState = {
    pedidos: [],
    allPedidos: [],
  };
  
  export function rootReducer(state = initialState, action) {
    switch (action.type) {

        case "POST_PEDIDO":
            return {
              ...state,
            };

        }
    }
    
    export default rootReducer;
    