import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function addResenaApi(mensaje) {
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