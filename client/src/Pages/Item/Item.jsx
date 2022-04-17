import React, { useState } from 'react'
import {
  addItem,
  deleteItem,
  restItem,
  deleteProductCart
} from '../../actions/carrito'
import { Link } from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";
import './Item.css'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export default function Item ({ id, title, price, image, stock, quantity }) {
  const [input, setInput] = useState(parseInt(quantity))
  const cartDB = useSelector(state => state.productsReducer.carts)
  let priceTotal = price * quantity
  const dispatch = useDispatch()

  console.log(input)

  const handleChange = e => {
    // console.log(e);
    setInput(parseInt(e.target.value))
  }

  const handleButtonMas = () => {
    if (input < stock) {
      setInput(prev => prev + 1)
      dispatch(addItem(id))
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Se supero el limite de stock!',
        footer: 'cantidad disponible ' + stock
      })
    }
  }

  const handleButtonMenos = e => {
    // e.preventDefault();
    if (input > 1) {
      setInput(prev => prev - 1)
      dispatch(restItem(id))
    }
  }
  const handleDelete = () => {
    // e.preventDefault();
    dispatch(deleteItem(id))
  }

  const fixedPrice = Math.round((priceTotal + Number.EPSILON) * 100) / 100
  const fixTitle = title.length > 50 ? title.slice(0, 50) + ' ...' : title
  return (
    <div className="itemContainer">
      <Button
        className="itemButton"
        aria-label='Close'
        onClick={handleDelete}
      >
        X
      </Button>
      <img className='itemImg' src={image} alt={`imagen de ${title}`} />

      <div className='itemName'>
        <Link className='itemText' to={`/home/${id}`}>
          <p>{fixTitle}</p>
        </Link>
      </div>
      <div className='itemCantidad'>
        <h3>Cantidad</h3>
        <Button className='itemBtnMenos' onClick={handleButtonMenos}>
          -
        </Button>
        <input
          type='number'
          value={input}
          min={1}
          max={stock}
          // defaultValue={input}
          onChange={handleChange}
          disabled
        />
        <Button className='itemBtnMas' onClick={handleButtonMas}>
          +
        </Button>
      </div>
      <div className='itemPrecio'>
        <h3>Precio</h3>
        <h4>$ {fixedPrice}</h4>
      </div>
    </div>
  )
}
