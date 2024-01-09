import { graphql } from 'react-relay';

export const DoctorSignIn = graphql`
  mutation DoctorSignInMutation($email: String!, $password: String!) {
    DoctorSignInMutation(input: { email: $email, password: $password }) {
      token
      me {
        id
        username
      }
    }
  }
`;
