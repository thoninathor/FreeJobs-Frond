import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constant";
import { getUserApi } from "../../api/user";
import {uploadPostApi} from "../../api/post";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

import "./ListPosts.scss";

export default function ListPosts(props) {
  const { posts } = props;
  

  return (
    <div className="list-posts">
      {map(posts, (post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

function Post(props) {
  const { post } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const postImgUrl =  post?.postimg ? `${API_HOST}/obtenerBanner?id=${post.userId}`
  : null;

  useEffect(() => {
    getUserApi(post.userId).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_HOST}/obtenerAvatar?id=${response.id}`
          : AvatarNoFound
      );
    });
  }, [post]);
  

  return (
    <div className="post">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
        {userInfo?.nombre} {userInfo?.apellidos}
          <span>{moment(post.fecha).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(post.mensaje),

          }}
        />
        <div className="puntuacion">
              5 estrellas
        </div>
        <div className="postImg" style={{ backgroundImage: `url('${postImgUrl}')` }} >
        </div>
      </div>
    </div>
  );
}
