import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import classNames from "classnames";
import { toast } from "react-toastify";
import { Close } from "../../../utils/Icons";
import {  addResenaApi } from "../../../api/resena";

import "./ResenaModal.scss";

export default function ResenaModal(props) {
  const { show, setShow, user } = props;
  const [message, setMessage] = useState("");
  const [calificacion, setCalificacion] = useState("10");
  const maxLength = 280;

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.length > 0 && message.length <= maxLength) {
      console.log(message, calificacion, user);
      addResenaApi(message, calificacion, user)
        .then((response) => {
          console.log(response);
          if (response?.code >= 200 && response?.code < 300) {
            toast.success(response.message);
            setShow(false);
            window.location.reload();
          }
        })
        .catch(() => {
          toast.warning("Error al enviar el tweet, inténtelo más tarde.");
        });
    }
  };

  return (
    <Modal
      className="post-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="¿Qué está pensando?"
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className={classNames("count", {
              error: message.length > maxLength,
            })}
          >
            {message.length}
          </span>
          <input type="number" onChange={(e) => setCalificacion(e.target.value)}  />
          <Button
            type="submit"
            disabled={message.length > maxLength || message.length < 1}
          >
            Subir reseña
          </Button>
          
        </Form>
      </Modal.Body>
    </Modal>
  );
}
