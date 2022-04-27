import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './modal.css';
import { alpha } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import { deleteProduct, getAllProducts, postProduct } from '../../actions/productos';
import { getShowActivity } from '../../actions/categorias';


function Productos() {

    const dispatch = useDispatch();

    const [data, setData] = useState([])
    const [status, setStatus] = useState({})

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getShowActivity());
    }, [dispatch]);

    const allProduct = useSelector(state => state.productosReducer.allProducts)
    const empStatus = useSelector(state => state.catReducer.allCategory)

    useEffect(() => {
        setData(allProduct)
      }, [allProduct]);

    console.log(allProduct)
    console.log(empStatus)
     
    useEffect(() => {
        const status = {}
        empStatus.map((row) => status[row.id] = row.nombre)
        setStatus(status)
    }, [empStatus])

    console.log(status)

    const postProducts = (newData) => {
        dispatch(postProduct(newData))
    }

    const updateProduct = () => {

    }

    const deleteProducts = (id) => {
        dispatch(deleteProduct(id))
    }
    
    

    const columns = [
        {
            title: '', field: 'image', render: item => <img src={item.image} alt="" border="3" height="100" width="100" />,
            headerStyle: {
                backgroundColor: '#039be5',
                whiteSpace: 'nowrap',
            },
            cellStyle: {

                
                fontSize: 15
            }
        },
        {
            title: "Name", field: "title",
            headerStyle: {
                backgroundColor: '#039be5',
                whiteSpace: 'nowrap',
            },
            cellStyle: {

                minWidth: 180,
                maxWidth: 180,
                fontSize: 15
            }
        },
        {
            title: "Categoria", field: "Categorium.id", lookup: status,
           
            headerStyle: {
                backgroundColor: '#039be5',
                whiteSpace: 'nowrap',
            }
        },
        {
            title: "Año", field: "age",
            
            headerStyle: {
                backgroundColor: '#039be5',
                minWidth: 1,
                textAlign: "center",
                maxWidth: 1
            },
            cellStyle: {


                fontSize: 15
            }
        },
        {
            title: "Bodega", field: "bodega",

            headerStyle: {
                backgroundColor: '#039be5',
                whiteSpace: 'nowrap',
            },
            cellStyle: {


                fontSize: 15
            }

        },
        {
            title: "Varietal", field: "cepa",

            headerStyle: {
                backgroundColor: '#039be5',
                whiteSpace: 'nowrap',
            },
             cellStyle: {


                fontSize: 15
            }
        },
        {
            title: "Descripcion", field: "descriptions",
            
            headerStyle: {
                backgroundColor: '#039be5',
                minWidth: 350,
                maxWidth: 350,
                fontSize: 15
            },
            cellStyle: {
               
                minWidth: 350,
                maxWidth: 350,
                fontSize: 15
            }
        },
        {
            title: "Precio", field: "price",

            headerStyle: {
                backgroundColor: '#039be5',
                whiteSpace: 'nowrap',
            },
            cellStyle: {
                fontSize: 15
            }

        },
        {
            title: "Rate", field: "rate",

            headerStyle: {
                backgroundColor: '#039be5',
                whiteSpace: 'nowrap',
            },
            cellStyle: {


                fontSize: 15
            }
        },
        {
            title: "Stock", field: "stock",

            headerStyle: {
                backgroundColor: '#039be5',
                whiteSpace: 'nowrap',
            },
            cellStyle: {


                fontSize: 15
            }
        },
    ]

    console.log(data)

    return (
        <div className="App">
            <h1 align="center">PANEL ADMINISTRACION DE PRODUCTOS</h1>

            <MaterialTable

                title="Productos"
                columns={columns}
                data={data}
                options={{
                    headerStyle: {
                        backgroundColor: '#039be5',
                    },
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    exportButton: true,
                    gruoping: true,
                    rowStyle: {
                        backgroundColor: rowData => rowData.id % 2 === 0 ? '#917351' : '#FFA500',
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
                    tableLayout: 'auto',
                    
                }}
                
                editable={{
                    onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                    onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);
                                /*postProducts(newData);*/
                                let datas = {title:newData.title,price:newData.price,category:newData.Categorium.id,descriptions:newData.descriptions,stock:newData.stock,bodega:newData.bodega,cepa:newData.cepa,age:newData.age}
                                postProducts(datas)
                                resolve();
                            }, 1000);
                        }),

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log('HOLAAAAAAAAA', oldData.email)
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                
                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                deleteProducts(oldData.id)
                                resolve()
                            }, 1000)
                        }),
                }}
            />
        </div>
    );
}

export default Productos;