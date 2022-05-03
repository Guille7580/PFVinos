import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePedido,
  getDetailPedido,
  getPedidosByUser,
} from "../../actions/pedidos";
import styles from "./PedidosUsuarios.module.css";
import { RiShoppingBasket2Line } from "react-icons/ri";

// Ejemplo de lo que me trae del back
// {
//   "fechaCreacion": "2022-02-21T00:00:00.000Z",
//   "usuarioId": 1,
//   "status": "PENDIENTE",
//   "pagado": false,
//   "pedidoId": 2,
//   "totalPedido": 5749.93,
//   "productos": [
//     {
//       "pedidoId": 3,
//       "productoId": 1,
//       "cantidad": 4,
//       "total": 603.96,
//       "producto": "Samsung FHD Smart TV 40",
//       "precioUnitario": 150.99
//     }
//   ]
// }

const PedidosUsuario = () => {
  const orders = useSelector((state) => state.pedidosReducer.userPedidos);
  const user = useSelector((state) => state.loginReducer.userDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickDetail = (pedido) => {
    dispatch(getDetailPedido(pedido));
    navigate(`/pedido/detail/ ${pedido.pedidoId}`);
  };

  const handleClickEliminar = (id) => {
    dispatch(deletePedido(id));
  };

  useEffect(() => {
    if (user) {
      dispatch(getPedidosByUser(user.id));
    } else {
      navigate("/home");
    }
  }, [dispatch, navigate, user]);

  return (
    <div className="container-center">
      <div className="container-fluid">
        <div className={styles.miscompras}>
          <h2>
            Mis compras <RiShoppingBasket2Line></RiShoppingBasket2Line>
          </h2>
        </div>
        {orders.length ? (
          <div>
            <table className="table align-middle table-bordered table-striped">
              <thead>
                <tr>
                  <td className="h4">Fecha</td>
                  <td className="h4">Productos</td>
                  <td className="h4">Total</td>
                  <td className="h4">Estado</td>
                  <td className="h4">Pagado</td>
                  <td className="h4">Acciones</td>
                </tr>
              </thead>
              <tbody>
                {orders.length ? (
                  orders.map((order) => (
                    <tr key={order.pedidoId}>
                      <td>{order.fechaCreacion.split("T")[0]}</td>
                      <td>
                        {order.productos.reduce(
                          (prev, current) => prev + current.cantidad,
                          0
                        )}{" "}
                        productos
                      </td>
                      <td>US${order.totalPedido}</td>
                      <td>{order.status}</td>
                      <td>{order.pagado ? "Pagado" : "No pagado"}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-info me-2"
                          onClick={() => handleClickDetail(order)}
                        >
                          Ver detalle
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleClickEliminar(order.pedidoId)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={"5"}>Aún no ha realizado ningún pedido</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PedidosUsuario;
