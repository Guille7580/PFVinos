import React, { useState } from 'react'
import { getPedidosByUser } from '../../actions/pedidos'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function VerOrdenes(){
    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginReducer.userDetail)
    const perdidos = useSelector((state)=> state.pedidosReducer.userPedidos)

    useEffect(() => {
        dispatch(getPedidosByUser(user.email));
    }, [user]);

    const allOrders = perdidos.data?.map(el => el.products.map(e => JSON.parse(e))).flat()
    console.log(allOrders)
    return (
        <div>
            {<div>allOrders</div>}

        </div>
    )
}