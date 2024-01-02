import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { PatientType } from "../PatientType";
import { PatientModel } from "../PatientModel";
import { PatientLoader } from "../PatientLoader";
import { setAuthCookie } from "../../../auth";

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
  mutateAndGetPayload: async (args: PatientSignInMutationArgs, { ctx }) => {
    const { email, password } = args;

    const user = await PatientModel.findOne({ email });

    if (!user) throw new Error("Patient not found!");

    const isPasswordCorrect = user.authenticate(password);

    if (!isPasswordCorrect) throw new Error("Wrong password! Try again.");

    setAuthCookie(ctx, user);

    return { id: user._id, success: "User is signed in!" };
  },
  outputFields: {
    me: {
      type: PatientType,
      resolve: ({ id }, _, context) => PatientLoader.load(context, id),
    },
  },
});

export { PatientSignInMutation };
