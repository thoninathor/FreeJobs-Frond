import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner, Dropdown } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";
import { faHandsHelping } from "@fortawesome/free-solid-svg-icons";

export default function SignUpForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue(user));
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    

    let validCount = 0;
    values(formData).some(value => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Email invalido");
      } else if (formData.password !== formData.repeatPassword) {
        toast.warning("Las contraseñas tienen que ser iguales");
      } else if (size(formData.password) < 6) {
        toast.warning("La contraseña tiene que tener al menos 6 caracteres");
      } else {
        setSignUpLoading(true);
        signUpApi(formData)
          .then(response => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              toast.success("El registro ha sido correcto");
              setShowModal(false);
              setFormData(initialFormValue());
            }
          })
          .catch(() => {
            toast.error("Error del servidor, inténtelo más tarde!");
          })
          .finally(() => {
            setSignUpLoading(false);
          });
      }
    }
  };

  function toggleBoolean(){
    setFormData({...formData, isOfer: !formData.isOfer,
    });
    console.log(formData);
  }

  const onChange = e => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                defaultValue={formData.nombre}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellido"
                defaultValue={formData.apellido}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Correo electronico"
            name="email"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                defaultValue={formData.password}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repetir contraseña"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
        <Row>
            <Col>
              <Form.Control
                type="phone"
                placeholder="Telefono"
                name="phone"
                defaultValue={formData.phone}
              />
            </Col>
            <Col>
            <Button variant="primary" type="submit" className="boton2" onClick = {toggleBoolean}>
                ?
            </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <DatePicker
            placeholder="Fecha de nacimiento"
            locale={es}
            selected={formData?.fechaNacimiento ? new Date(formData.fechaNacimiento) : new Date()}
            onChange={(value) =>
              setFormData({ ...formData, fechaNacimiento: value })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="boton1">
          {!signUpLoading ? "Registrase" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
        email:"",
        password: "",
        nombre:"",
        apellido:"",
        repeatPassword: "",
        isOfer: false,
        fechaNacimiento:"",
        phone :"", 
  };
}
