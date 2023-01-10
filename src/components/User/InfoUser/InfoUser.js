import React from "react";
import moment from "moment";
import localization from "moment/locale/es";
import { Location, Link, DateBirth, Ubicacion,Whatsapp } from "../../../utils/Icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user } = props;

  return (
    <div className="info-user">
      <h2 className="name">
        {user?.nombre} {user?.apellidos}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.biografia && <div className="description">{user.biografia}</div>}

      <div className="more-info">
        {user?.phone && (
          <a
            href={`https://api.whatsapp.com/send?phone=${user.phone}`}
            alt={user.phone}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Whatsapp/> {user.phone}
          </a>
        )}
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
