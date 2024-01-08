import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { DoctorType } from "../DoctorType";
import { DoctorModel } from "../DoctorModel";
import { generateToken } from "../../../auth";

interface DoctorSignInMutationArgs {
  email: string;
  password: string;
}

const DoctorSignInMutation = mutationWithClientMutationId({
  name: "DoctorSignInMutation",
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (args: DoctorSignInMutationArgs) => {
    const { email, password } = args;

    const user = await DoctorModel.findOne({ email });

    if (!user) throw new Error("Doctor not found!");

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
      type: DoctorType,
      resolve: ({ user }) => user,
    },
  },
});

export { DoctorSignInMutation };
