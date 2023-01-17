import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../../User/EditUserForm";
import ResenaModal from "../../../components/Modal/ResenaModal";
import ResenaListModal from "../../../components/Modal/ResenaListModal";
import AvatarNoFound from "../../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../../utils/constant";
import {
  checkFollowApi,
  followUserApi,
  unfollowUserApi
} from "../../../api/follow";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser, params } = props;
  const [showModal, setShowModal] = useState(false);
  const [showResenaModal, setShowResenaModal] = useState(false);
  const [showVerResenaModal, setShowVerResenaModal] = useState(false);

  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);
  const bannerUrl = user?.banner
    ? `${API_HOST}/obtenerBanner?id=${user.id}`
    : null;
  const avatarUrl = user?.avatar
    ? `${API_HOST}/obtenerAvatar?id=${user.id}`
    : AvatarNoFound;

      console.log(showModal, setShowModal);
  useEffect(() => {
    if (user) {
      checkFollowApi(user?.id).then(response => {
        if (response?.status) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  const onUnfollow = () => {
    unfollowUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

console.log(params);

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          <div>
            {loggedUser._id === user.id && (
            <Button onClick={() => setShowModal(true)}>Editar perfil</Button>
          )} 
          </div>
          {loggedUser._id !== user.id &&
            following !== null &&
            (following ? (
              <Button onClick={onUnfollow} className="unfollow">
                <span>Siguiendo</span>
              </Button>
            ) : (
              <Button  onClick={onFollow}>Seguir</Button>
            ))}
            
            {loggedUser._id !== user.id && following ?
              (<Button onClick={() => setShowResenaModal(true)}>Escribe una reseña</Button>) : ('')}
            <ResenaModal show={showResenaModal} setShow={setShowResenaModal} user = {user}/>


            <Button onClick={() => setShowVerResenaModal(true)}>Ver reseñas </Button>
            <ResenaListModal show={showVerResenaModal} setShow={setShowVerResenaModal} userResena = {user} params={params}/>
        </div>
      )}
      
      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="Editar perfil"
      >
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>

      
    </div>
  );
}
