import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'react-relay';
import { FormikProvider, Form as FormikForm, useFormik, Field } from 'formik';

import { PatientSignUp } from '../../modules/patient/PatientSignUpMutation';
import { PatientSignUpMutation } from '../../modules/patient/__generated__/PatientSignUpMutation.graphql';

export default function SignUp() {
  const navigate = useNavigate();
  const [signUp, isLoading] = useMutation<PatientSignUpMutation>(PatientSignUp);

  const formikValue = useFormik({
    initialValues: { username: '', email: '', password: '' },
    onSubmit: values => {
      signUp({
        variables: values,
        onCompleted: ({ PatientSignUpMutation }, error) => {
          console.log(PatientSignUpMutation);

          if (error && error.length) {
            console.log('e', error);
            toast.error(error[0].message);
          }

          //   signin(userRegisterMutation?.token, () => {
          //     navigate('/feed', { replace: true });
          //   });
        },
      });
    },
  });

  const { isSubmitting } = formikValue;

  return (
    <FormikProvider value={formikValue}>
      <FormikForm>
        <div className="row justify-content-md-center p-5">
          <div className="col-lg-auto">
            <Card>
              <Card.Body>
                <div className="p-3">
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Field
                      name="username"
                      as={Form.Control}
                      required
                      type="text"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Field
                      name="email"
                      as={Form.Control}
                      required
                      type="text"
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Field
                      name="password"
                      as={Form.Control}
                      required
                      type="password"
                    />
                  </Form.Group>
                  {/* <br />
                <Form.Check
                  inline
                  label="Doctor"
                  type="checkbox"
                  id="doctor-checkbox"
                />
                <Form.Check
                  inline
                  label="Patient"
                  type="checkbox"
                  id="patient-checkbox"
                /> */}
                  <div className="text-center p-1">
                    <br />
                    <div>
                      <Button variant="success" type="submit">
                        Sign up
                      </Button>
                    </div>
                    <div>
                      <Button href="/" variant="link" type="submit">
                        Already have an account? Sign in
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </FormikForm>
    </FormikProvider>
  );
}
