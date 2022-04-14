import React from "react";
import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions/productos";
import "./detail.css"

export default function Detail() {
     const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getDetail(id));
      }, [dispatch]);  

    const myProducts= useSelector((state) => state.productosReducer.detalles);
      console.log(myProducts)
return (    
           
        <div className="hola">
    
           {Object.keys(myProducts).length > 0 ? (
              <div>
                  <h1>{myProducts.title}</h1>
                  <img src={myProducts.image} alt="img not found" />
                  <h3>{myProducts.descriptions}</h3>
                  <h5>{myProducts.price}</h5>
            </div>
         
          ) : console.log("error")
          
          }   
        </div>
          
    )
        }
