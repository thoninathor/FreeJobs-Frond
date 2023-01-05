import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import classNames from "classnames";
import { toast } from "react-toastify";
import { Close } from "../../../utils/Icons";
import { addPostApi } from "../../../api/post";

import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const maxLength = 280;

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.length > 0 && message.length <= maxLength) {
      addPostApi(message)
        .then((response) => {
          console.log(response);
          if (response?.code >= 200 && response?.code < 300) {
            toast.success(response.message);
            setShow(false);
            window.location.reload();
          }
        })
        .catch(() => {
          toast.warning("Erorr al enviar el post, inténtelo más tarde.");
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
          <Button
            type="submit"
            disabled={message.length > maxLength || message.length < 1}
          >
            Postear
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
