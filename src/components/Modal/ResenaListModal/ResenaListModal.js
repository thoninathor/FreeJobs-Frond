import React from 'react';
import { Modal, Button } from "react-bootstrap";
import ListResna from '../../ListResena/ListResna';

export default function ResenaListModal(props) {
    const { show, setShow } = props;
  return (
    <Modal
      className="post-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
        <div>ResenaListModal</div>
    </Modal>
    
  )
}
