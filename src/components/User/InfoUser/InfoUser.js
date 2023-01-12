import React, { useState, useEffect } from "react";
import {
  checkFollowApi
} from "../../../api/follow";
import moment from "moment";
import localization from "moment/locale/es";
import { Location, Link, DateBirth, Ubicacion,Whatsapp } from "../../../utils/Icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user, loggedUser} = props;

  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);

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
  
  console.log(following)

  return (
    <div className="info-user">
      <h2 className="name">
        {user?.nombre} {user?.apellidos}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.biografia && <div className="description">{user.biografia}</div>}

      <div className="more-info">
        {user?.phone && (          
            (loggedUser._id === user.id || following ? (<a
              href={`https://api.whatsapp.com/send?phone=${user.phone}`}
              alt={user.phone}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Whatsapp/> {user.phone}
            </a>) : ('')))}
        {user?.fechaNacimiento && (
          <p>
            <DateBirth />
            {moment(user.fechaNacimiento)
              .locale("es", localization)
              .format("LL")}
          </p>
        )}
        {user?.fechaNacimiento && (
          <p>
            <Ubicacion />
            {user.ubicacion}
          </p>
        )}
      </div>
    </div>
  );
}
