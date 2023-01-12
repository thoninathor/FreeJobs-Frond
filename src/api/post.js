import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export async function uploadAndGetObjects(mesaje, postFile) {
  // Primero subimos el objeto al servidor utilizando una llamada POST
  
  const objectToUpload = { /* ... */ };
  const response = await fetch('/api/objects', {
    method: 'POST',
    body: JSON.stringify(objectToUpload),
    headers: { 'Content-Type': 'application/json' },
  });
  const uploadedObject = await response.json();

  // Luego obtenemos la lista de objetos utilizando una llamada GET
  const listResponse = await fetch('/api/objects');
  const objectList = await listResponse.json();

  // Finalmente utilizamos el ID del objeto seleccionado para hacer otra llamada GET
  const singleObjectResponse = await fetch(`/api/objects/${selectedId}`);
  const singleObject = await singleObjectResponse.json();

  // Aquí podrías hacer algo con el objeto obtenido
  console.log(singleObject);
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
