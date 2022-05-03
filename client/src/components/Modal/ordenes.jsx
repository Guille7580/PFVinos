import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ordenes.css'
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
  console.log(pedidos)
  useEffect(() => {
    setData(pedidos)
  }, [pedidos])

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
      field: 'date',
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
            backgroundColor: '#FFA500'
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
                <body class='body'>
                  <div class='container'>
                    <table class='table'>
                      <thead>
                        <tr>
                          <th>Id Producto</th>
                          <th>Producto</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rowData.products.map(el => (
                          <tr>
                            <td>{JSON.parse(el).productoId}</td>
                            <td>{JSON.parse(el).title}</td>
                            <td>{JSON.parse(el).amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </body>
              )
            }
          }
        ]}
      />
    </div>
  )
}
export default Ordenes
