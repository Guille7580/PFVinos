export const getCartLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart')
    
    return cart
      ? JSON.parse(cart)
      : {
          products: [],
          precioTotal: 0
        }
  } catch (err) {
    console.log(err)
  }
}

export const saveCartLocalStorage = cart => {
  cart = JSON.stringify(cart)
  localStorage.setItem('cart', cart)
}
