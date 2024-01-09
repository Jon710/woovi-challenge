import { graphql } from 'react-relay';

export const PatientSignIn = graphql`
  mutation PatientSignInMutation($email: String!, $password: String!) {
    PatientSignInMutation(input: { email: $email, password: $password }) {
      token
      me {
        id
        username
      }
    }
  }
`;
