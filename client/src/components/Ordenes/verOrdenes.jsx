import React, { useState } from 'react'
import vino from './vino.jpeg'
import './verOrdenes.css'
import { getPedidosByUser } from '../../actions/pedidos'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function VerOrdenes() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginReducer.userDetail);
    const pedidos = useSelector((state) => state.pedidosReducer.userPedidos)

    console.log(pedidos)

    useEffect(() => {
        dispatch(getPedidosByUser(user.email))
    }, [user])
    console.log(user)

    const array = pedidos.map(el => el.products.map(ell => JSON.parse(ell))).flat().map(elll => elll.title)
      
    //pedidos.data?.map(el => el.products.map(ell => JSON.parse(ell))).flat().map(elll => elll.title) 🌿
    const data = new Set(array)
    const pepe = [...data]
    console.log(pepe)
    return (
        <div className='containerOrden'>
            <span className='encabezado'>Los Productos Que Has Comprado</span>
            <img className='imagenimgOrden' src={vino} alt='vino'/>
            <div>
                {<div className='infoverorden'>{pepe?.map(el => <div classname = 'contenido'>{el}</div>)}</div>}
            </div>
        </div>

    )
}




