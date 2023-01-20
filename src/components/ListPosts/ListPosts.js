import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constant";
import { getUserApi } from "../../api/user";
import {uploadPostApi} from "../../api/post";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import { Close } from "../../utils/Icons";
import { toast } from "react-toastify";
import axios from 'axios';

import "./ListPosts.scss";

export default function ListPosts(props) {
  const { posts } = props;
  return (
    <div className="list-posts">
      {map(posts, (post, index, postimg) => (
        <Post key={index} post={post} postimg={postimg[index]} />
      ))}
    </div>
  );
}

const deletePost = (postId) => {
  deletePostApi(postId)
    .then((response) => {
      // Actualizar el estado de los posts para reflejar la eliminación del post
      if (response?.code >= 200 && response?.code < 300){
        toast.success("Post borrado");
        window.location.reload();
      }
    })
    .catch(() => {
      // Mostrar un mensaje de error utilizando una librería como Toastify
      toast.error("Error al borrar");
    });
}

const deletePostApi = async (postId) => {
  try {
      const response = await axios.delete(`${postId}`);
      return response;
  } catch (error) {
      console.log(error);
  }
}

function Post(props) {
  console.log(props);
  const { post, show } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [postImgUrl, setPostImgUrl] = useState(null);

  useEffect(() => {
    getUserApi(post.userId).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_HOST}/obtenerAvatar?id=${response.id}`
          : AvatarNoFound
      );
    setPostImgUrl(`${API_HOST}/obtenerPostImg?postImg=${post.postimg}`);
    });



  }, [post]);
  return (
    <div className="post" show={show} >
      <Close onClick={() => deletePost(post.id)}/>
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
        <Image className="postImg" src={postImgUrl} />
      </div>
    </div>
  );
}
