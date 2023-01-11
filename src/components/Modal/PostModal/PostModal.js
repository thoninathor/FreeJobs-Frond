import React, { useCallback, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Close } from "../../../utils/Icons";
import { addPostApi } from "../../../api/post";
import { API_HOST } from "../../../utils/constant";
import {uploadPostApi} from "../../../api/post";
import {Camera} from "../../../utils/Icons";

import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow, user } = props;
  const [message, setMessage] = useState("");
  const [postURl, setPostURl] = useState(null);
  const maxLength = 280;

  const [postFile, setPostFlie] = useState(null);

  const  onDropPost = useCallback(acceptedFile => {
    const file = acceptedFile[0];
    console.log(URL.createObjectURL(file));
    setPostURl(URL.createObjectURL(file));
    setPostFlie(file);
    console.log(acceptedFile);
  });
  const {getRootProps: getRootPostProps, getInputProps: getInputPostProps} = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard:true,
    multiple:  false,
    onDrop: onDropPost
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (postFile) {
      await uploadPostApi(postFile).catch(() => {
        toast.error("Error al subir el nuevo banner");
      });
    }
    if (message.length > 0 && message.length <= maxLength) {
      addPostApi(message, postFile)
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
        <div className="banner" style={{ backgroundImage: `url('${postURl}')` }} {...getRootPostProps()} >
            <input {...getInputPostProps()}/>
            <Camera/>
        </div>

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
