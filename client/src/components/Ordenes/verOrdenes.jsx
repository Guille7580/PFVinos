import React, { useState, useReducer } from 'react'
import { getPedidosByUser } from '../../actions/pedidos'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMaxListeners } from 'process'
import pedidosReducer from '../../reducer/pedidos'

export default function VerOrdenes () {
  const [data, setData] = useState({})
const [ state, dispatch ] = useReducer(pedidosReducer, userPedidos )
  //const dispatch = useDispatch()

  useEffect(() => {
    let email = 'luis@gmail.com' || "rodrigo.lopez@gmail.com"
    dispatch(getPedidosByUser(email))
  }, [dispatch])
  const clientPedidos = useSelector(state => state.pedidosReducer.userPedidos)
console.log(JSON.stringify(clientPedidos) + "LLEgaste")
  useEffect(() => {
    setData(clientPedidos)
  }, [clientPedidos])

   console.log(data + ' hhhhhhhhhhhhhhhhhh')
  console.log(JSON.stringify(clientPedidos) + 'hollllissssssssssss')
  return <div>{clientPedidos}</div>
}
