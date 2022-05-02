import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './modal.css'
import MaterialTable from 'material-table'
import { editStatusPedido, getAllPedidos } from '../../actions/pedidos'
import { Link } from 'react-router-dom'
import { Visibility } from '@material-ui/icons'

function Ordenes () {
  const [data, setData] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPedidos())
  }, [dispatch])

  const pedidos = useSelector(state => state.pedidosReducer.pedidos)

  useEffect(() => {
    setData(pedidos)
  }, [pedidos])

  const editStatusPedidos = (id, newstatus) => {
    console.log(id, newstatus)
    dispatch(editStatusPedido(id, newstatus))
  }

  console.log(pedidos)

  const columns = [
    {
      title: 'Fecha',
      field: 'fechaCreacion',
      headerStyle: {
        backgroundColor: '#5f3252',
        whiteSpace: 'nowrap',
        color: '#ffffff'
      },
      cellStyle: {
        fontSize: 15
      }
    },

    {
      title: 'Estado',
      field: 'status',
      lookup: {
        PENDIENTE: 'PENDIENTE',
        COMPLETADO: 'COMPLETADO',
        PAGADO: 'PAGADO'
      },
      headerStyle: {
        backgroundColor: '#5f3252',
        whiteSpace: 'nowrap',
        color: '#ffffff'
      },
      cellStyle: {
        fontSize: 15
      }
    },
    {
      title: 'Total',
      field: 'total',
      headerStyle: {
        backgroundColor: '#5f3252',
        whiteSpace: 'nowrap',
        color: '#ffffff'
      },
      cellStyle: {
        fontSize: 15
      }
    }
  ]

  return (
    <div className='App'>
      <h1 align='center'>PANEL ADMINISTRACION DE ORDENES</h1>

      <MaterialTable
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        title='Ordenes'
        columns={columns}
        data={data}
        localization={{
          header: {
            actions: 'Acciones'
          },
          body: { editRow: { deleteText: 'Confirmar Borrar' } }
        }}
        options={{
          headerStyle: {
            backgroundColor: '#5f3252',
            color: '#ffffff'
          },
          actionsColumnIndex: -1,
          addRowPosition: 'first',
          exportButton: true,
          gruoping: true,

          rowStyle: {
            backgroundColor: rowData =>
              rowData.id % 2 === 0 ? '#917351' : '#FFA500'
          },
          searchFieldStyle: {
            backgroundColor: '#5f3252',
            color: '#FFF'
          },
          draggable: true,
          searchAutoFocus: true,
          search: true,
          exportAllData: true,
          columnsButton: true,
          filtering: true,
          grouping: true,
          doubleHorizontalScroll: true,
          tableLayout: 'auto'
        }}
        editable={{
          onRowAddCancelled: rowData => console.log('Row adding cancelled'),
          onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data]
                const index = oldData.tableData.id
                dataUpdate[index] = newData
                setData([...dataUpdate])
                editStatusPedidos(newData.id, newData.status)
                resolve()
              }, 1000)
            })
        }}
        detailPanel={[
          {
            tooltip: 'Show Name',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 40,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#43A047'
                  }}
                >
                  {rowData.products.map(el => (
                    <div>
                      <h5>Nombre: {JSON.parse(el).title}</h5>
                      <h5>Cantidad: {JSON.parse(el).amount}</h5>
                    </div>
                  ))}
                </div>
              )
            }
          }
        ]}
      />
    </div>
  )
}
export default Ordenes
