import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './modal.css';
import { alpha } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import { deleteUser, getAllUser, postUser, changCategory } from '../../actions/user';

function Modall() {

    const dispatch = useDispatch();

    const [data, setData] = useState([])

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    const allUsers = useSelector(state => state.users.allUser)

    useEffect(() => {
        setData(allUsers)
    }, [allUsers]);

    const delUser = (email) => {
        dispatch(deleteUser(email))
    }

    const changCategories = (email) => {
        dispatch(changCategory(email))
    }

    const deleteUseres = (id) => {
        dispatch(deleteUser(id))
    }

    const columns = [
        {
            title: "Name", field: "nombre",
            editable: 'never',
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Usuario", field: "usuario",
            editable: 'never',
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Rol", field: "rol",
            lookup: { 1: 'Usuario', 2: 'Administrador' },
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Email", field: "email",
            editable: 'never',
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Pais", field: "pais",
            editable: 'never',
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Provincia", field: 'provincia',
            editable: 'never',
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Direccion", field: "direccion",
            editable: 'never',
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Telefono", field: "telefono",
            editable: 'never',
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
    ]
    return (
        <div className="App">
            <h1 align="center">PANEL ADMINISTRACION DE USUARIOS</h1>
            
            <MaterialTable
                
                title="Usuarios"
                columns={columns}
                data={data}
                options={{
                    headerStyle: {
                        backgroundColor: '#039be5',
                    },
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    exportButton: true, gruoping: true,
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
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log('HOLAAAAAAAAA', oldData.email)
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                changCategories(oldData.email)
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
                                deleteUseres(oldData.email)
                                resolve()
                                
                            }, 1000)
                        }),
                }}
                actions={[
                    {
                        icon: 'outgoing_mail',
                        tooltip: 'Reset Password',
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                    }
                ]}
            />
        </div>
    );
}

export default Modall;