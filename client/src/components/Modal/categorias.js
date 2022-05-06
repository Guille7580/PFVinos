import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './categorias.css'
import MaterialTable from 'material-table'
import { CreateCategory, DeleteCategory, getShowActivity, UpdateCategory } from '../../actions/categorias';

function Categories() {
    const dispatch = useDispatch();
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(getShowActivity());
    }, [dispatch]);

    const empStatus = useSelector(state => state.catReducer.allCategory)

    console.log(empStatus)
    
    useEffect(() => {
        const status = {}
        empStatus.map((row) => status[row.id] = row.nombre)
        setData(empStatus)
    }, [empStatus]);

    console.log(data)


    const createCategories = (newData) => {
        dispatch(CreateCategory(newData))
    }

    const updateCategories = (newData) => {
        dispatch(UpdateCategory(newData))
    }

    const deleteCategories = (id) => {
        dispatch(DeleteCategory(id))
    }

    const columns = [
        
        //{
        //    title: "Categoria", field: "id", editable: 'never',
        //    headerStyle: {
        //        backgroundColor: '#5f3252',
        //        whiteSpace: 'nowrap',
        //        color: '#ffffff',
                
        //    }
        //},
        {
            title: "Nombre", field: "nombre",
            headerStyle: {
                backgroundColor: '#5f3252',
                whiteSpace: 'nowrap',
                color: '#ffffff'
            }
        },
    ]

    return (
        <div>
            <h1 align="center">PANEL ADMINISTRACION DE CATEGORIAS</h1>
            <div className="Tabla">
            <MaterialTable
               
                data={data}
                title=""
                columns={columns}
                localization={{
                    header: {
                        actions: 'Acciones',
                    },
                    body: { editRow: { deleteText: 'Confirmar Borrar' } }


                }}

                options={
                 
                    {
                
                    headerStyle: {
                        backgroundColor: '#5f3252',
                        color: '#ffffff'
                    },
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    exportButton: true,
                   

                    rowStyle: {
                        backgroundColor: rowData => rowData.id % 2 === 0 ? '#917351' : '#FFA500',
                    },
                    searchFieldStyle: {
                        backgroundColor: '#5f3252',
                        color: "#FFF"
                        },
                        paging: false,
                    
                    searchAutoFocus: true,
                    search: true,
                    exportAllData: true,
                    columnsButton: true,
                    
                    
                    tableLayout: 'auto',
                }}
                editable={{
                    onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                    onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData])
                                console.log(newData.nombre)
                                createCategories(newData.nombre)
                                resolve();
                            }, 1000);
                        }),

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                updateCategories(newData)
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
                                deleteCategories(oldData.id)
                                resolve()
                            }, 1000)
                        }),
                }}
                />
            </div>

        </div>
    );
}
export default Categories;