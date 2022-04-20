import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getDetail } from '../../actions/productos'
import {
  addItem,
  deleteItem,
  deleteProductCart,
  putCart
} from '../../actions/carrito'
import './detail.css'

export default function Detail ({ handleAddToCart, cartItems, setCartItems }) {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch])

  const myProducts = useSelector(state => state.productosReducer.detalles)
  console.log(myProducts)
  console.log(cartItems)
  return (
    <div className='detailContainer'>
      {Object.keys(myProducts).length > 0 ? (
        <div className='info'>
          <div className='titleDet'>
            <h1>{myProducts.title}</h1>
            <img
              className='detailImage'
              src={myProducts.image}
              alt='img not found'
            />
          </div>
          <div className='description'>
            <h3>{myProducts.descriptions}</h3>
          </div>
          <div className='extraInfo'>
            <h3>Bodega: {myProducts.bodega}</h3>
            <h3>Cepa: {myProducts.cepa}</h3>
            <h3>Year: {myProducts.age}</h3>
            <h3>Stock: {myProducts.stock}</h3>
            <h3>Ratings: {myProducts.rate}</h3>
            {/* <h3>{myProducts.count}</h3> */}
            <h3>Precio: $ {myProducts.price}</h3>
          </div>
        </div>
      ) : (
        console.log('error')
      )}
      <div className='btnDetails'>
        <Link to='/'>
          <button className='detailButtons'>Sigue Comprando</button>
        </Link>

       <Link to="/carrito"> 
        <button onClick = {() => handleAddToCart(myProducts)} className="detailButtons">Agrega a Carrito</button>
      </Link> 
      </div>
    </div>
  )
}
