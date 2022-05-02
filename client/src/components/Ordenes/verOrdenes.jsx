import React, { useState } from 'react'
import { getPedidosByUser } from '../../actions/pedidos'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function VerOrdenes(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPedidosByUser());
    }, [dispatch]);

    const allOrders = useSelector(state => state.userPedidos)
console.log(allOrders + "hollllissssssssssss")
    return (
        <div>


        </div>
    )
}