import React, { useState, useEffect } from "react";
import { updateInfoApi } from "../../api/user";
import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
import ListPosts from "../../components/ListPosts";
import { withRouter } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getUserApi } from "../../api/user";
import { getPostsFollowersApi } from "../../api/post";
import { toast } from "react-toastify";
import { getTokenApi } from "../../api/auth";
import { API_HOST } from "../../utils/constant";

import "./Home.scss";


 export default function Home(props) {
  
  const { setRefreshCheckLogin } = props;
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const getLocation = async ()  => {
     await navigator.geolocation.getCurrentPosition(
      position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationString = `${latitude}, ${longitude}`;
          console.log("locacion")
          console.log(locationString)
          const url = `${API_HOST}/modificarPerfil`;
          const data={
            coordenadasActual:locationString,
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

  useEffect(() => {
    getLocation();
    getPostsFollowersApi(page)
      .then((response) => {
        if (!posts && response) {
          setPosts(formatModel(response));
        } else {
          if (!response) {
            setLoadingPosts(0);
          } else {
            const data = formatModel(response);
            setPosts([...posts, ...data]);
            setLoadingPosts(false);
          }
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);



  const moreData = () => {
    
    setLoadingPosts(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>
      {posts && <ListPosts posts={posts} />}
      <Button onClick={moreData} className="load-more" >
        {!loadingPosts ? (
          loadingPosts !== 0 ? (
            "Obtener más Posts"
          ) : (
            "No hay más posts"
          )
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}

function formatModel(posts) {
  const postsTemp = [];
  posts.forEach((post) => {
    postsTemp.push({
      _id: post._id,
      userId: post.userRelationId,
      mensaje: post.Post.mensaje,
      fecha: post.Post.fecha,
      postimg: post.Post.postimg,
    });
  });
  
  return postsTemp;
}

