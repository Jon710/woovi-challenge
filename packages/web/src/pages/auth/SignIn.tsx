import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
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
    <div className="row justify-content-md-center p-5">
      <div className="col-lg-auto">
        <Card>
          <Card.Body>
            <Form>
              <div className="p-3">
                <Form.Group controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control required type="text" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" />
                </Form.Group>
                <br />
                <div className="text-center p-1">
                  <div>
                    <Button variant="success" type="submit">
                      Sign in
                    </Button>
                  </div>
                  <div>
                    <Button href="/signup" variant="link" type="submit">
                      Sign up
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
