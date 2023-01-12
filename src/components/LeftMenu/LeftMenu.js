import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
  fawhatsapp,
} from "@fortawesome/free-solid-svg-icons";
import PostModal from "../Modal/PostModal";
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [currentUuser, setCurrentUser] = useState(null);
  const user = useAuth();

  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };

  useEffect(() => {
    getUserApi(user._id)
      .then((response) => {
        setCurrentUser(response);
      })
      .catch(() => {
        toast.error("Error buscando el usuario");
      });
  }, []);

  return (
    <div className="left-menu">
      <img className="logo" src={LogoWhite} alt="FreeJobs" />

      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
      </Link>

      {currentUuser.isOfer(<Button onClick={() => setShowModal(true)}>Postea tu trabajo</Button>)}

      <PostModal show={showModal} setShow={setShowModal} userId = {user._id}/>


    </div>
  );
}
