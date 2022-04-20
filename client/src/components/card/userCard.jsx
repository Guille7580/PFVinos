import React from 'react'
import { TableCell, TableRow } from "@material-ui/core"
import {Edit, Delete} from '@material-ui/icons'

export default function Card ( props )
{
    return (
        <TableRow >
            <TableCell>{props.id}</TableCell>
            <TableCell>{props.usuario}</TableCell>
           {/* <td>{props.avatar}</td>*/}
            <TableCell>{props.nombre}</TableCell>
            <TableCell>{props.direccion}</TableCell>
            <TableCell>{props.pais}</TableCell>
            <TableCell>{props.provincia}</TableCell>
            <TableCell>{props.rol}</TableCell>
            <TableCell>{props.email}</TableCell>
            <TableCell>{props.telefono}</TableCell>
            <TableCell>
                <Edit /> &nbsp;&nbsp;&nbsp;
                <Delete />
            </TableCell>
        </TableRow>
  )
}