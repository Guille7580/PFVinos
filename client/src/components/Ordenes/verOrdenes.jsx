// import React, { useState } from 'react'
// import { getPedidosByUser } from '../../actions/pedidos'
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// export default function VerOrdenes(){
//     const dispatch = useDispatch()
//     const user = useSelector((state) => state.loginReducer.userDetail)
//     const perdidos = useSelector((state)=> state.pedidosReducer.userPedidos)

//     useEffect(() => {
//         dispatch(getPedidosByUser(user.email));
//     }, [user]);

//     const allOrders = perdidos.data?.map(el => el.products?.map(e => JSON.parse(e))).flat().map(ell => ell.title)
//     console.log(allOrders)
//     return (
//         <div>
//             {<div>{allOrders?.map(el=><div>{el}</div>)}</div>}

//         </div>
//     )
// }

import React, { useState } from 'react'
import { getPedidosByUser } from '../../actions/pedidos'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




export default function VerOrdenes(){

    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginReducer.userDetail);
    const pedidos = useSelector((state) => state.pedidosReducer.userPedidos)
    
    console.log(pedidos)
    
    useEffect(() => {
      dispatch(getPedidosByUser(user.email))
      }, [user])

    const pepe = pedidos.data?.map(el => el.products.map(ell => JSON.parse(ell))).flat().map(elll => elll.title)
    console.log(pepe)
    return (
        <div>
            {<div>{pepe?.map(el => <div>{el}</div>)}</div>}
        </div>
    )
}