import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";


export async function uploadAndGetPosts(mensaje, postFile, idUser, page) {
  // Primero subimos el objeto al servidor utilizando una llamada POST
  const urlPubPost = `${API_HOST}/post`;
  const urlListPost = `${API_HOST}/leoPosts?id=${idUser}&pagina=${page}`;
  const urlSubirImg = `${API_HOST}/subirPostImg`;
  const data = {
    mensaje,
  };
  const formData = new FormData();
  formData.append("postimg", postFile);
  
  const response = await fetch(urlPubPost, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  }).catch((err) => {
    return err;
  });

  // Luego obtenemos la lista de objetos utilizando una llamada GET
  const objectList = await fetch(urlListPost,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  }).then(res => res.json()).catch((err) => {
    return err;
  });
  console.log(objectList)
  const firstObject = objectList[0];

  // Finalmente utilizamos el ID del objeto seleccionado para hacer otra llamada GET
  const singleObjectResponse = await fetch(urlSubirImg,{
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
      postID : firstObject._id,
    },
    body: formData
  }).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return { code: response.status, message: "Post enviado." };
    }
    return { code: 500, message: "Error del servidor." };
  }).catch((err) => {
    return err;
  });
  return singleObjectResponse;
}

export function addPostApi(mensaje) {
  const url = `${API_HOST}/post`;
  const data = {
    mensaje,
  };
  console.log(mensaje);
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Post enviado." };
      }
      return { code: 500, message: "Error del servidor." };
    })
    .catch((err) => {
      return err;
    });
}

export function getUserPostsApi(idUser, page) {
  const url = `${API_HOST}/leoPosts?id=${idUser}&pagina=${page}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}

export function uploadPostApi(file) {
  const url = `${API_HOST}/subirPostImg`;
  console.log(file);
  const formData = new FormData();
  formData.append("postimg", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: formData
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}



export function getPostsFollowersApi(page = 1) {
  const url = `${API_HOST}/leoPostsSeguidores?pagina=${page}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
