import { graphql } from "react-relay";

export const PatientSignUp = graphql`
  mutation PatientSignUpMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    PatientSignUpMutation(
      input: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`;
