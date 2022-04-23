import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './modal.css';
import MaterialTable from 'material-table'
import { deleteUser, getAllUser, postUser } from '../../actions/user';

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

    const getStudents = () => {
        setData(allUsers)
        
    }

    const addUser = (nuevoUsuario) => {
        console.log('nuevoUsuario', nuevoUsuario)
        dispatch(postUser(nuevoUsuario))
        
    }

    const delUser = (email) => {
        dispatch(deleteUser(email))
        getStudents()
    }

    function valideMail(rowData) {
        let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        return (!re.exec(rowData.email) || rowData.email === undefined || rowData.email === "") 
    }

    function validateNumber(rowData) {
        let re = /^([0-9])*$/
        return (!re.exec(rowData.telefono) || rowData.telefono === undefined || rowData.telefono === "")

    }

   console.log(data)

    const columns = [
        {
            title: "Name", field: "nombre", validate: rowData => rowData.nombre === undefined || rowData.nombre === "" ? "Required" : true,
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Usuario", field: "usuario",
            validate: rowData => rowData.usuario === undefined || rowData.usuario === "" ? "Required" : true,
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },

        {
            title: "Rol", field: "rol",
            validate: rowData => rowData.rol === undefined || rowData.rol === "" ? "Required" : true,
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        
        {
            title: "Email", field: "email",
            validate: rowData => valideMail(rowData) ? "Required" : true,
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },

        

        {
            title: "Contrasena", field: "contrasena",
            validate: rowData => rowData.contrasena === undefined || rowData.contrasena === "" ? "Required" : true,
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },

        {
            title: "Pais", field: "pais",
            validate: rowData => rowData.pais === undefined || rowData.pais === "" ? "Required" : true,
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Provincia", field: 'provincia',
            validate: rowData => rowData.provincia === undefined || rowData.provincia === "" ? "Required" : true,
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Direccion", field: "direccion",
            validate: rowData => rowData.direccion === undefined || rowData.direccion === "" ? "Required" : true,
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: "Telefono", field: "telefono",
            validate: rowData => validateNumber(rowData) ? "Required" : true,
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
                options={{ actionsColumnIndex: -1, addRowPosition: "first", exportButton: true, gruoping: true }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                addUser(newData)
                                getStudents()
                                console.log(newData)
                               resolve();
                            }, 1000);
                        }),
                    
                }}
            />
        </div>
    );
}

export default Modall;