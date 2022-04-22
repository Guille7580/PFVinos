import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
//import styles from "./Profile.module.css";
import { Loader } from "../../components/Loader/Loader";
// import avatar from './utils/foto1.jpeg'
const Profile = () => {
  const user = useSelector((state) => state.loginReducer.userDetail);
  const {
    nombre,
    // avatar,
    usuario,
    email,
    pais,
    provincia,
    direccion,
    telefono,
  } = user || {};

  return user ? (
    <section >
      <div >
        <div >
          <div >
            <div >
              <div ></div>
            </div>
            <NavLink  to="/profile/edit">
              Editar
            </NavLink>
            <NavLink  to="/profile/orders" style={{textAlign:"center"}}>
              Ver mis compras
            </NavLink>
          </div>

          <div >
            <h2>Mi Perfil</h2>
          </div>

          <div >
            <div >
              <h5>Nombre</h5>
              <h5>Email</h5>
              <h5>Teléfono</h5>
              <h5>Usuario</h5>
              <h5>País</h5>
              <h5>Provincia</h5>
              <h5>Dirección</h5>
            </div>

            <div >
              <h5>{nombre}</h5>
              <span />
              <h5 >{email}</h5>
              <span  />
              <h5>{telefono}</h5>
              <span />
              <h5>{usuario}</h5>
              <span  />
              <h5>{pais}</h5>
              <span  />
              <h5>{provincia}</h5>
              <span />
              <h5>{direccion}</h5>
              <span  />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loader />
  );
};

export default Profile;