import React, {  useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Close } from "../../../utils/Icons";
import { API_HOST } from "../../../utils/constant";
import {Camera} from "../../../utils/Icons";
import axios from "axios";

import "./PasModal.scss";

export default function PasModal(props) {
    console.log(props)
    const { show, setShow} = props;
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShow(false);
        try {
            const response = await axios.post(`${API_HOST}/enviarEnlace`, { email: email });
            console.log(response);
        } catch (error) {
            console.log(error);
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
 
          <div>
            <Form onSubmit={handleSubmit}>
                <label>
                Email:
                <input type="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <Button type="submit">Enviar enlace</Button>
            </Form>
            </div>
        </Modal.Body>
      </Modal>
    );
}
