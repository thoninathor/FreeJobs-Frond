import React, {useEffect, useState} from 'react';
import  {getUserResnasApi} from '../../../api/resena';
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Close } from "../../../utils/Icons";
import { getUserApi } from "../../../api/user";
import ListResna from '../../ListResena/ListResna';

import "./ResenaListModal.scss";

export default function ResenaListModal(props) {
    const { show, setShow, params } = props;
    const [user, setUser] = useState(null);
    const [loadingResenas, setLoadingResenas] = useState(false);
    const [resenas, setResenas] = useState(null);
    const [page, setPage] = useState(1);
    console.log(params);

    useEffect(() => {
        getUserApi(params.id)
          .then((response) => {
            if (!response) toast.error("El usuario que has visitado no existe");
            setUser(response);
          })
          .catch(() => {
            toast.error("El usuario que has visitado no existe");
          });
      }, [params]);

    useEffect(() => {   
        getUserResnasApi(params.id, 1)
          .then((response) => {
            setResenas(response);
          })
          .catch(() => {
            setResenas([]);
          });
      }, [params]);

    const moreData = () => {
        const pageTemp = page + 1;
        setLoadingResenas(true);
    
        getUserResnasApi(params.id, pageTemp).then((response) => {
          if (!response) {
            setLoadingResenas(0);
          } else {
            setResenas([...resenas, ...response]);
            setPage(pageTemp);
            setLoadingResenas(false);
          }
        });
      };

      console.log(resenas);

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
      {resenas && <ListResna resenas={resenas} params={params}/>}
      </Modal.Body>

    </Modal>
    
  )
}
