import React from 'react'
import Usercard from '../card/userCard'
import style from './cards.module.css'
import { Table, TableContainer, TableHead, TableCell, TableBody, ModalHeader, TableRow } from "@material-ui/core"
import Modall from '../Modal/modal'

export default function userCards({ users }) {
    console.log(users)
    return (
        <div>
            <Modall/>
            <TableContainer style={{ color: 'white' }}>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Ususario</TableCell>

                            <TableCell>Nombre</TableCell>
                            <TableCell>Direccion</TableCell>
                            <TableCell>Pais</TableCell>
                            <TableCell>Provincia</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefono</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>


                {
                    users?.map(el => (
                        <tbody key={el.id}>

                            <Usercard
                                id={el.id}
                                usuario={el.usuario}

                                nombre={el.nombre}
                                direccion={el.direccion}
                                pais={el.pais}
                                provincia={el.provincia}
                                rol={el.rol}
                                email={el.email}
                                telefono={el.telefono}
                            />
                        </tbody>
                    ))
                }
                </Table>
            </TableContainer>
        </div>

    )
}