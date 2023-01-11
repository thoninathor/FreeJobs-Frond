import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";
import LogoFreeJobs from "../../assets/png/logo.png";
import LogoWhiteFreeJobs from "../../assets/png/logo-white.png";

import "./SignInSingUp.scss";

export default function SignInSingUp(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = content => {
    setShowModal(true);
    setContentModal(content);
  };

  return (
    <>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowModal={setShowModal}
            setRefreshCheckLogin={setRefreshCheckLogin}
          />
        </Row>
      </Container>

      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={LogoFreeJobs} alt="FreeJobs" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Busca profesionistas.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Entérate de la opinion de la gente.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Contacta y resuelve.
        </h2>
      </div>
    </Col>
  );
}

function RightComponent(props) {
  const { openModal, setShowModal, setRefreshCheckLogin } = props;

  return (
    <Col className="signin-signup__right" xs={6}>
      <div>
        <img src={LogoWhiteFreeJobs} alt="FreeJobs" />
        <h2>Encuentra al profesionista que necesitas</h2>
        <h3>Únete a FreeJobs hoy mimso.</h3>
        <Button
          variant="primary"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
        >
          Regístrate
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            openModal(
              <SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />
            )
          }
        >
          Iniciar sesión
        </Button>
      </div>
    </Col>
  );
}
