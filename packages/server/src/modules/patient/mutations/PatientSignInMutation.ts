import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { PatientType } from "../PatientType";
import { PatientModel } from "../PatientModel";
import { generateToken } from "../../../auth";

interface PatientSignInMutationArgs {
  email: string;
  password: string;
}

const PatientSignInMutation = mutationWithClientMutationId({
  name: "PatientSignInMutation",
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (args: PatientSignInMutationArgs) => {
    const { email, password } = args;

    const user = await PatientModel.findOne({ email });

    if (!user) throw new Error("Patient not found!");

    const isPasswordCorrect = user.authenticate(password);

    if (!isPasswordCorrect) throw new Error("Wrong password! Try again.");

    const token = generateToken(user._id);

    return { token, user };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: PatientType,
      resolve: ({ user }) => user,
    },
  },
});

export { PatientSignInMutation };
