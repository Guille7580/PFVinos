import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getDetail } from '../../actions/productos'
import './detail.css'
import {getProductReview} from '../../actions/productos'
import Review from "./Review";

export default function Detail ({ handleAddToCart, handleAddToCartButton, cartItems, setCartItems }) {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { productId } = useParams()
const [cart , setCart ] = useState()
const [promedioReview, setPromedioReview] = useState(0);

const myProducts = useSelector(state => state.productosReducer.detalles)
const productReview = useSelector(state => state.productosReducer.productReview)

  
useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getProductReview(productId))
  }, [dispatch, productId])

  

  useEffect(() =>{
    
    if (productReview.length){
        let sumatotal = 0;
        let cantidad = 0;
        productReview?.map((item) => {
            sumatotal = sumatotal + item.rate;
            cantidad = cantidad + 1;
            return <> </>;
        });

        setPromedioReview(sumatotal / cantidad);
        let redondeo = Math.ceil(sumatotal / cantidad);
        for (let i = 1; i <= redondeo; i++) {
            const star = document.getElementById(`promedio${i}`);
            star.style.color = "#3483fa";
        }
    
        for (let i = 1; i <= redondeo; i++) {
        const star = document.getElementById(`${myProducts.name}${i}`);
        star.style.color = "orange";
        }
    }
},[productReview])

  function handleReviewShow(name) {
    if (name === "Todas") {
        document.getElementById("Todas").className =
            "button-active-product-detail";
        document.getElementById("Positivas").className =
            "button-product-detail";
        document.getElementById("Negativas").className =
            "button-product-detail";
    } else if (name === "Positivas") {
        document.getElementById("Todas").className =
            "button-product-detail";
        document.getElementById("Positivas").className =
            "button-active-product-detail";
        document.getElementById("Negativas").className =
            "button-product-detail";
    } else if (name === "Negativas") {
        document.getElementById("Todas").className =
            "button-product-detail";
        document.getElementById("Positivas").className =
            "button-product-detail";
        document.getElementById("Negativas").className =
            "button-active-product-detail";
    }
}
  function changeNumber(e){
    const item = e.target.value;
    console.log(item)
    setCart([...cart, item])
  }

  
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
          <button className='detailButtons' >Sigue Comprando</button>
        </Link>

        <Link to="/carrito"> 
        {productReview.length ? (
                            <div className="rating-product-detail">
                                <label id={`${myProducts.title}${1}`}>
                                    ★
                                </label>
                                <label id={`${myProducts.title}${2}`}>
                                    ★
                                </label>
                                <label id={`${myProducts.title}${3}`}>
                                    ★
                                </label>
                                <label id={`${myProducts.title}${4}`}>
                                    ★
                                </label>
                                <label id={`${myProducts.title}${5}`}>
                                    ★
                                </label>
                            </div>
                            ):null}
                             <div className="review-product-detail">
                    {productReview.length ? (<>
                        <div className="container-review-product-detail">
                            <h1>Opiniones sobre {myProducts.title}</h1>
                            <p style={{fontSize:"60px",marginBottom:"0"}}> {promedioReview.toFixed(1)} </p>
                            <div
                                className="rating-product-detail"
                                style={{ fontSize: "48px", marginLeft: "0",marginTop:"-2rem" }}
                            >
                                <label id={`promedio${1}`}>★</label>
                                <label id={`promedio${2}`}>★</label>
                                <label id={`promedio${3}`}>★</label>
                                <label id={`promedio${4}`}>★</label>
                                <label id={`promedio${5}`}>★</label>
                            </div>
                            { productReview.length>1 ?
                            <h6>Promedio entre {productReview.length} opiniones</h6>:
                            <h6>Hay una sola opinion</h6>
                            }
                        </div>

                        <div className="div-buttons-container">
                            <button
                                className="button-active-product-detail"
                                id="Todas"
                                onClick={(e) => handleReviewShow("Todas")}
                            >
                                Opiniones
                            </button>
                           <button
                                className="button-product-detail"
                                id="Positivas"
                                onClick={(e) => handleReviewShow("Positivas")}
                            >
                                Positivas
                            </button>
                            <button
                                className="button-product-detail"
                                id="Negativas"
                                onClick={(e) => handleReviewShow("Negativas")}
                            >
                                Negativas
                            </button> 
                        </div>
                        <div>
                            {productReview?.map((elem, i) => {
                                return (
                                    <Review
                                        key={elem.description}
                                        review={elem}
                                    />
                                );
                            })}
                        </div>
                        </> ):<h1>No hay opiniones del producto</h1>}
                    </div> 
        <button
          onClick={() => handleAddToCartButton(myProducts) }
          className='detailButtons'
        >
          Agrega a Carrito
        </button>
        </Link>  
      </div>
    </div>
  )
}
