import {
  GET_PRODUCTS,
  GET_DETAIL,
  GET_NAME_PRODUCTS,
  FILTER_BY_CATEGORY,
  ORD_BYNAME,
  ORD_BYPRICE,
  REST_ITEM,
  DELETE_CART_DB,
  UPDATE_CART,
  ADD_ITEM,
  DELETE_ITEM,
  GET_CART,
  DELETE_CART
} from '../actions/types'

import {
  getCartLocalStorage,
  saveCartLocalStorage
} from '../Helpers/localstorage'

import { putCart } from '../actions/carrito'

const initialState = {
  allProducts: [],
  filtered: [],
  detalles: [],
  cart: getCartLocalStorage(),
  carts: {},
  allProductsStock: []
}


export default function productsReducer (state = initialState, action) {
  const { type, payload } = action

  let newCart = state.cart,
    newProducts,
    itemCart

  switch (type) {
    //Carrito
    case UPDATE_CART:
      if (localStorage.getItem('token_ecommerce')) {
        const localS = getCartLocalStorage()
        if ( state.carts.id) {
          localS.products?.forEach(el => putCart(el, state.carts.id))
        }
        console.log('-----------------' + localS)
      }
      return {
        ...state,
        cart: getCartLocalStorage()
      }

    // case ADD_ITEM:
    //   itemCart = state.cart.products.find(e => e.id === payload)
    //   if (itemCart) {
    //     newProducts = state.cart.products.map(item =>
    //       item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
    //     )

    //     if (localStorage.getItem('token_ecommerce')) {
    //       newProducts?.forEach(el => putCart(el, state.carts.id))
    //     }

    //     newCart = {
    //       products: newProducts,
    //       precioTotal: newProducts.reduce((prev, e) => {
    //         let prod = state.allProducts.find(el => el.id === e.id)

    //         return Math.round((prev + prod.price * e.quantity) * 100) / 100
    //       }, 0)
    //     }
    //   } else {
    //     newCart = {
    //       products: [...state.cart.products, { id: payload, quantity: 1 }],
    //       precioTotal:
    //         Math.round(
    //           (state.cart.precioTotal +
    //             state.allProducts.find(e => e.id === payload).price) *
    //             100
    //         ) / 100
    //     }
    //   }
    //   saveCartLocalStorage(newCart)

    //   return {
    //     ...state,
    //     cart: newCart,
    //     flag: true
    //   }

    case REST_ITEM:
      itemCart = state.cart.products.find(e => e.id === payload)
      if (itemCart) {
        newProducts = state.cart.products.map(item =>
          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item
        )

        newCart = {
          ...newCart,
          products: newProducts,
          precioTotal:
            Math.round(
              (state.cart.precioTotal -
                state.allProducts.find(e => e.id === payload).price) *
                100
            ) / 100
        }
        saveCartLocalStorage(newCart)
      }
      return {
        ...state,
        cart: newCart
      }

    // case DELETE_ITEM:
    //   itemCart = state.cart.products.find(e => e.id === payload)

    //   if (localStorage.getItem('token_ecommerce')) {
    //     deleteProductCart(payload, state.carts.id)
    //   }
    //   itemCart &&
    //     (newCart = {
    //       products: state.cart.products.filter(e => e.id !== payload),
    //       precioTotal:
    //         Math.round(
    //           (state.cart.precioTotal -
    //             itemCart.quantity *
    //               state.allProducts.find(e => e.id === payload).price) *
    //             100
    //         ) / 100
    //     })
    //   saveCartLocalStorage(newCart)
    //   return {
    //     ...state,
    //     cart: newCart,
    //     flag: false
    //   }
    // case GET_CART:
    //   const localS = getCartLocalStorage()
    //   if (state.flag && state.carts.id) {
    //     const carritoDB = state.carts.CarritoDetalles?.map(el => {
    //       return { ...el, id: el.productoId, quantity: el.cantidad }
    //     })
    //     const cartDB = {
    //       products: carritoDB || localS.products,
    //       precioTotal:
    //         carritoDB?.reduce((prev, e) => {
    //           let prod = state.allProducts.find(el => el.id === e.id)

    //           return Math.round((prev + prod.price * e.quantity) * 100) / 100
    //         }, 0) || localS.precioTotal
    //     }
    //     saveCartLocalStorage(cartDB)
    //   }

    //   return {
    //     ...state,
    //     carts: payload,
    //     flag: true
    //   }

    case DELETE_CART:
      newCart = {
        products: [],
        precioTotal: 0
      }
      saveCartLocalStorage(newCart)
      return {
        ...state,
        cart: newCart
      }
    case DELETE_CART_DB:
      return {
        ...state,
        carts: payload
      }
    //Productos
      case GET_PRODUCTS:
          return {

              ...state,
              allProducts: payload.filter(e => e.stock > 0),
              filtered: payload
          }
    case GET_DETAIL:
      return {
        ...state,
        detalles: payload
      }

    // case RESET_DETAIL :
    // return {
    //   ...state,
    //   detalles : []
    // }

      case GET_NAME_PRODUCTS:
          return {
              ...state,
              allProducts: payload.filter(e => e.stock > 0)
          }

    case FILTER_BY_CATEGORY:
      const Todos = state.filtered
      let categoriesProducts =
        payload === 'All'
          ? Todos
          : Todos.filter(elem => elem.Categorium.nombre === action.payload)
      return {
        ...state,
        allProducts: categoriesProducts
      }
    case ORD_BYNAME:
      var sorted
      var copyproduct = [...state.allProducts]
      if (action.payload === 'nada') {
        sorted = copyproduct
      }
      if (action.payload === 'asc') {
        sorted = copyproduct.sort((a, b) => {
          if (a.title > b.title) return 1
          if (a.title < b.title) return -1
          return 0
        })
      }
      if (action.payload === 'desc') {
        sorted = copyproduct.sort((a, b) => {
          if (a.title > b.title) return -1
          if (a.title < b.title) return 1
          return 0
        })
      }
      return {
        ...state,
        allProducts: sorted
      }
    case ORD_BYPRICE:
      var sortedpri
      var copyproductprice = [...state.allProducts]
      if (action.payload === 'nada') {
        sortedpri = copyproductprice
      }
      if (action.payload === 'asce') {
        sortedpri = copyproductprice.sort((a, b) => {
          if (a.price > b.price) return 1
          if (a.price < b.price) return -1
          return 0
        })
      }
      if (action.payload === 'desce') {
        sortedpri = copyproductprice.sort((a, b) => {
          if (a.price > b.price) return -1
          if (a.price < b.price) return 1
          return 0
        })
      }
      return {
        ...state,
        allProducts: sortedpri
      }
    default:
      return { ...state }
  }
}
