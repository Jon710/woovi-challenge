import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, Form as FormikForm, useFormik, Field } from 'formik';
import { useMutation } from 'react-relay';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/useAuth';
import { PatientSignInMutation } from '@/modules/patient/__generated__/PatientSignInMutation.graphql';
import { PatientSignIn } from '@/modules/patient/PatientSignInMutation';
// import { DoctorSignInMutation } from '@/modules/doctor/__generated__/DoctorSignInMutation.graphql';
// import { DoctorSignIn } from '@/modules/doctor/DoctorSignInMutation';

// SignIn -> Appointments list table
// TODO: doctor or patient signin
export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [handleSignIn] = useMutation<PatientSignInMutation>(PatientSignIn);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => {
      handleSignIn({
        variables: values,
        onCompleted: ({ PatientSignInMutation }, error) => {
          console.log(PatientSignInMutation);

          if (error && error.length) {
            console.log('e', error);
            toast.error(error[0].message);
          }

          signIn(PatientSignInMutation?.token, () => {
            navigate('/appointments', { replace: true });
          });
        },
      });
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="row justify-content-md-center p-5">
        <div className="col-lg-auto">
          <Card>
            <Card.Body>
              <FormikForm>
                <div className="p-3">
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
              </FormikForm>
            </Card.Body>
          </Card>
        </div>
      </div>
    </FormikProvider>
  );
}
