import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'react-relay';
import { FormikProvider, Form as FormikForm, useFormik, Field } from 'formik';

import { PatientSignUp } from '../../modules/patient/PatientSignUpMutation';
import { PatientSignUpMutation } from '../../modules/patient/__generated__/PatientSignUpMutation.graphql';
import { DoctorSignUp } from '../../modules/doctor/DoctorSignUpMutation';
import { DoctorSignUpMutation } from '../../modules/doctor/__generated__/DoctorSignUpMutation.graphql';

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpPatient] = useMutation<PatientSignUpMutation>(PatientSignUp);
  const [signUpDoctor] = useMutation<DoctorSignUpMutation>(DoctorSignUp);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      isPatient: null,
    },
    onSubmit: values => {
      if (formik.values.isPatient === null) {
        toast.warn('You must select either Doctor or Patient');
        return;
      }

      if (formik.values.isPatient) {
        signUpPatient({
          variables: values,
          onCompleted: ({ PatientSignUpMutation }, error) => {
            if (error && error.length) {
              toast.error(error[0].message);
              return;
            }
          },
        });
      } else {
        signUpDoctor({
          variables: values,
          onCompleted: ({ DoctorSignUpMutation }, error) => {
            if (error && error.length) {
              toast.error(error[0].message);
              return;
            }
          },
        });
      }

      navigate('/', { replace: true });
    },
  });

  return (
    <FormikProvider value={formik}>
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
                  <br />
                  <Form.Check
                    inline
                    label="Doctor"
                    type="checkbox"
                    id="doctor-checkbox"
                    checked={formik.values.isPatient === false}
                    onChange={() => formik.setFieldValue('isPatient', false)}
                  />
                  <Form.Check
                    inline
                    label="Patient"
                    type="checkbox"
                    id="patient-checkbox"
                    checked={formik.values.isPatient === true}
                    onChange={() => formik.setFieldValue('isPatient', true)}
                  />
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
