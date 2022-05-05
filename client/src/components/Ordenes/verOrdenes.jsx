import React, { useState } from 'react'
import vino from './vino.jpeg'
import './verOrdenes.css'
import { getPedidosByUser } from '../../actions/pedidos'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function VerOrdenes(){
    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginReducer.userDetail);
    const pedidos = useSelector((state) => state.pedidosReducer.userPedidos)
    
    console.log(pedidos)
    
    useEffect(() => {
        dispatch(getUser())
        return () => {
            dispatch(getPedidosByUser(user.email))
        }
    }, [dispatch])

    console.log(user)
    console.log(pedidos)

    //useEffect(() => {
    //    dispatch(getPedidosByUser(user.email));
    //}, [user])

    return (
        <div>
            <div className='containerOrden'>
                <img className='imagenimgOrden ' src={vino} alt='vino' height='720px' />
                {<div className='infoverorden'>{pepe?.map((el) =>
                    <div key={el.index}>{el}</div>)}</div>}
            </div>

        </div>
    )
}