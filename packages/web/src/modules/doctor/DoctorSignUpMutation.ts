import { graphql } from "react-relay";

export const DoctorSignUp = graphql`
  mutation DoctorSignUpMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    DoctorSignUpMutation(
      input: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`;
