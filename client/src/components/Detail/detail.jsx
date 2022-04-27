import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getDetail } from '../../actions/productos'
import './detail.css'
import Rate from '../Reviews/Ratings'
import { getCommentByProductId } from "../../actions/comments";
import WineLoader from '../wineLoader/wineLoader'
import { Card, ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from "./DetailProduct.module.css"

export default function Detail ({ handleAddToCart, handleAddToCartButton, cartItems, setCartItems }) {
  const dispatch = useDispatch()
  const { id } = useParams()
  const comments = useSelector((state) => state.commentReducer.comentariosProducto);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch])

  const myProducts = useSelector(state => state.productosReducer.detalles)
  console.log(myProducts)
  console.log(cartItems)
  const ReviewPopUp = (props) => {
    return (
      <Modal
        {...props}
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ¿ Desea dejarnos su opinión sobre el producto ?
          </Modal.Title>
        </Modal.Header>

        {/* <Modal.Body>
        { isAuth && (<Rate title={title} rate={rate} productId={id} userId={user.id} />) }
        </Modal.Body> */}
        <Modal.Footer>
          <Button onClick={handleClosePopUpReview} className={styles.pop} >
            En otro momento
          </Button>
          {/* <Button onClick={handleSendReview}>Enviar</Button> */}
        </Modal.Footer>
      </Modal>
    );
  };

  const [showPopUpReview, setShowPopUpReview] = useState(false);
  const userPedidos = useSelector((state) => state.pedidosReducer.userPedidos)

  const handleOpenPopUpReview = (e) => {
    e.preventDefault();
    let prodComprados = userPedidos.map(p => p.productos)
    let aux1ProdComprados = prodComprados.map(p => p.map(el => el.productoId))
    let aux2ProdComprados = []
    aux1ProdComprados.map(elem => elem.map(c => aux2ProdComprados.push(c)))
    if (aux2ProdComprados.find(el => el == id)) {
    setShowPopUpReview(true);
  }else {
    Swal.fire({
      position: "center",
      icon: "error",
      title:
        "Necesitas haber comprado antes este producto para darnos tu opinión",
      showConfirmButton: false,
      timer: 3000,
    });
  } 
};


const handleClosePopUpReview = (e) => {
    e.preventDefault();
    setShowPopUpReview(false);
  };

  const handleLoginReview = () => {
    if (!isAuth)
    Swal.fire({
      position: "top-center",
      icon: "error",
      title:
        "Necesitas estar logueado para darnos tu opinión sobre un producto",
      showConfirmButton: true,
      timer: 3000,
    });
  };

  //Para dejar comentario y rating //////////////

  return loading ? (
    <WineLoader/>
  ) : error ? (
    <span>No se ha podido obtener la información del producto solicitado </span>
  ) : (
    <div  className="contenedor"
    style={{ 
      backgroundColor: "white",
      height: "50%",
      width: "50%",
      //  display: "flex",
      border: "5px solid black",
      boxShadow: "2px 2px 4px #000",
      borderRadius:"10px",
      media: "screen and (max-width: 768px)",
      marginLeft:"auto",
      marginRight:"auto",
      marginTop:"20px",
      
    }}
    ></div> )
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
            <h3>Rate: {myProducts.rate}</h3>
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

        {/* <Link to="/carrito">  */}
        <button
          onClick={() => handleAddToCartButton(myProducts)}
          className='detailButtons'
        >
          Agrega a Carrito
        </button>
        {/* </Link>  */}
        
      </div>
    </div>
  )
}
