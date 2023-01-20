import { getUserApi } from "../../api/user";
import React, { useState, useEffect } from "react";
import { getTokenApi } from "../../api/auth";
import { API_HOST } from "../../utils/constant";
import { updateInfoApi } from "../../api/user";
import { toast } from "react-toastify";
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
  const user = useAuth();

  console.log(user);
  const [formData, setFormData] = useState(user);
  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };
  const getLocation = async ()  => {
    navigator.geolocation.getCurrentPosition(
     position => {
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;
         const locationString = `${latitude}, ${longitude}`;
         console.log("locacion")
         console.log(locationString)
         const url = `${API_HOST}/modificarPerfil`;
         const data={
           coordenadasActual:locationString
         }
         console.log(data)
         const params = {
           method: "PUT",
           headers: {
             Authorization: `Bearer ${getTokenApi()}`
           },
           body: JSON.stringify(data)
           
         };
         console.log("body")
         console.log(params.body);
         return fetch(url, params)
           .then(response => {
             return response;
           })
           .catch(err => {
             return err;
           });
     },
     error => {
         console.log(error);
     }
   );

 };
  return (
    <div className="left-menu">
      <img className="logo" src={LogoWhite} alt="FreeJobs" />

      <Link to="/">
        <FontAwesomeIcon icon={faHome} onClick={getLocation}/> Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} onClick={getLocation}/> Usuarios
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} onClick={getLocation}/> Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
      </Link>

      {user.is_ofer ? (<Button onClick={() => setShowModal(true)}>Postea tu trabajo</Button>):('')}

      <PostModal show={showModal} setShow={setShowModal} userId = {user._id}/>


    </div>
  );
}
