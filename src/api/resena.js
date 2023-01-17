import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function addResenaApi(mensaje, calif, user) {
  const url = `${API_HOST}/resena`;
  const calificacion = Number(calif);
  const data = {
    mensaje,
    calificacion,
    userresenaid: user.id,
  };
  console.log(mensaje);
  console.log(data);
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
        return { code: response.status, message: "Reseña enviada." };
      }
      return { code: 500, message: "Error del servidor." };
    })
    .catch((err) => {
      return err;
    });
}

export function getUserResnasApi(idUser, page) {
    const url = `${API_HOST}/leoResenas?id=${idUser}&pagina=${page}`;
  
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
