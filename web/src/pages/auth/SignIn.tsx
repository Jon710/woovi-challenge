import React from "react";
import { Form, Button, Card, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import logo from "../../assets/moraes.jpeg";
// import api from "../../services/api";

export default function Auth() {
  const navigate = useNavigate();

  // async function handleSubmit(e) {
  //   try {
  //     e.preventDefault();
  //     const cpfusuario = e.currentTarget.elements.formUsername.value;
  //     const senha = e.currentTarget.elements.formBasicSenha.value;
  //     const { data } = await api.post("/sessionMed", { cpfusuario, senha });
  //     Cookies.set("token", data.token, { expires: 1 });
  //     api.defaults.headers.Authorization = `Bearer ${data.token}`;
  //     navigate("/agenda");
  //   } catch (error) {
  //     toast.error(error.response.data.error);
  //   }
  // }

  return (
    <Container>
      <div className="row justify-content-md-center p-5">
        <div className="col-lg-auto">
          <Card className="m-2">
            <Card.Body>
              {/* <div className="d-flex justify-content-center">
                <Image src={logo} rounded width={100} height={100} />
              </div> */}
              <Form>
                <div className="p-3">
                  <Form.Group controlId="formUsername">
                    <Form.Label>CPF do usuário</Form.Label>
                    <Form.Control required type="text" />
                    <Form.Control.Feedback type="invalid">
                      Digite seu CPF.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicSenha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Sua senha secreta"
                    />
                    <Form.Control.Feedback type="invalid">
                      Digite sua senha.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br />
                  <div className="text-center p-1">
                    <Button variant="success" type="submit">
                      Acessar
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}
