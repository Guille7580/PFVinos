import React, { useState } from 'react'
import { getPedidosByUser } from '../../actions/pedidos'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/user';



export default function VerOrdenes(){

    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginReducer.userDetail);
    const pedidos = useSelector((state) => state.pedidosReducer.userPedidos)

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


        </div>
    )
}