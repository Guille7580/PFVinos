import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Modal, Tab, Tabs } from '@material-ui/core'
import { getAllUser } from '../../../actions/user.jsx'
import { useEffect } from 'react'
import UserCards from '../../../components/cards/userCards.jsx'
import Modall from '../../../components/Modal/modal.jsx'
import Productos from '../../../components/Modal/productos.jsx'
import Categories from '../../../components/Modal/categorias.js'
import Ordenes from '../../../components/Modal/ordenes.jsx'

export default function Admin () {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = React.useState(0)

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  const allUsers = useSelector(state => state.users.allUser)

  const hundleChangue = (e, newvalue) => {
    setSelectedTab(newvalue)
    console.log('Desde Evento Tab', e, newvalue)
  }

  return (
    <>
      <AppBar  position='static'>
        <Tabs value={selectedTab} onChange={hundleChangue}>
          <Tab label='Usuarios' />
          <Tab label='Productos' />
          <Tab label='Ordenes' />
          <Tab label='Categorias' />
        </Tabs>
      </AppBar>

      {selectedTab === 0 && <Modall />}
      {selectedTab === 1 && <Productos />}
      {selectedTab === 2 && <Ordenes />}
      {selectedTab === 3 && <Categories />}
    </>
  )
}
