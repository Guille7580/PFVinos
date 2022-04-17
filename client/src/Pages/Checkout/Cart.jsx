import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Cart.css'
import NavBar from '../../components/navBar/navBar'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
import  Item  from '../Item/Item.jsx'
import {
  updateCart,
  getCartDb,
  deleteAllCart,
  deleteAllCartDB,
  getCartDB
} from '../../actions/carrito'
import Swal from 'sweetalert2'
import { getAllProducts } from '../../actions/productos'

export default function Cart () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let items = useSelector(state => {
    let completeProducts = state.productsReducer.cart.products
    completeProducts = completeProducts.map(e => {
      const found = state.productsReducer.allProducts.find(el => el.id === e.id)
      return found ? { ...found, quantity: e.quantity } : null
    })
    return completeProducts
  })

  console.log(items)

  const total = useSelector(state => state.productsReducer.cart.precioTotal)
  const isAuth = useSelector(state => state.loginReducer.isAuth)
  items = items?.filter(e => e)
  const products = useSelector(state => state.productsReducer.allProducts)
  const user = useSelector(state => state.loginReducer.userDetail)
  const cartDB = useSelector(state => state.productsReducer.carts)

  useEffect(() => {
    if (products.length === 0) dispatch(getAllProducts())
  }, [dispatch, products])

  useEffect(() => {
    dispatch(updateCart())
    if (isAuth) dispatch(getCartDB(user.id))
  }, [dispatch, isAuth, user])

  const handlebtnCompra = () => {
    if (!isAuth) {
      Swal.fire({
        title: 'Necesita estar registrado para realizar la compra',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Registrarse'
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/register')
        }
      })
    } else {
      if (items.length > 0) {
        let pedido = {
          pedidos: items.map(e => ({
            productoId: e.id,
            cantidad: e.quantity
          }))
        }
        navigate('/')
        //cuando tenemos el postpedido////////////////////////////////
        // dispatch(postPedido(pedido));
        // navigate("/pedido/detail");
      } else {
        Swal.fire({
          title: 'No hay ningun producto en el carrito',
          showDenyButton: false,
          showCancelButton: true,
          // confirmButtonText: 'Registrarse'
        })
      }
    }
  }
  const handleDeleteAll = () => {
    Swal.fire({
      title: "¿ Esta seguro que quiere eliminar el carrito?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAllCart());
        if (cartDB.usuarioId) {
          dispatch(deleteAllCartDB(cartDB.usuarioId));
        }
        Swal.fire(
          "ELiminado!",
          "El carrito se eliminó correctamente.",
          "success"
        );
      }
    });
  };

  // const emptyCart = () => {
  //   return (
  //     <div className={style.container}>
  //       <Row>
  //         <h3>Su Carrito esta vacío</h3>
  //       </Row>
  //     </div>
  //   );
  // };

  return (
    <div>
 {products.length > 0 ? (
        <div>
          <div>
            <h1>Shopping Cart</h1>
            {/* <div className='cartContainer'>
              {items?.length === 0 && emptyCart()}
              {items?.map((i) => (
                <Item
                  key={i.id}
                  title={i.title}
                  image={i.image}
                  price={i.price}
                  id={i.id}
                  stock={i.cantidad}
                  quantity={i.quantity}
                />
              ))}
            </div> */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                textAlign: "end",
              }}
            >
              <div className = 'cartTotal'>
              <h1>Total: </h1>
              <h3 className='cartPriceline'>&nbsp; $  {total}</h3>
              </div>
              <div className='cartbuttonContainer'>
                <button variant="danger" onClick={handleDeleteAll}>
                  Eliminar carrito
                </button>
                <button className='cartButton' onClick={handlebtnCompra}>
                  Comprar
                </button>
              </div>
            </div>
          </div>
       
        </div>
      ) : (
        <Loader/>
      )}


      {/* <div div className='cartContainer'>
        <NavBar />
        <h1>Shopping Cart</h1>
        <div className='totalContainer'>
          <h2>Total: &nbsp; </h2>
          <h3>$</h3>
        </div>
        <div className='cartButtons'>
          <div className='cartButton'>
            <button className='buttonss'>Eliminar Carrito</button>
            <button className='buttonss'>Pagar</button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
