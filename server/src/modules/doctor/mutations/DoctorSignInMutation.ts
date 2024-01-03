import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { DoctorType } from "../DoctorType";
import { DoctorModel } from "../DoctorModel";
import { DoctorLoader } from "../DoctorLoader";
import { setAuthCookie } from "../../../auth";

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
  mutateAndGetPayload: async (args: DoctorSignInMutationArgs, { ctx }) => {
    const { email, password } = args;

    const user = await DoctorModel.findOne({ email });

    if (!user) throw new Error("Doctor not found!");

    const isPasswordCorrect = user.authenticate(password);

    if (!isPasswordCorrect) throw new Error("Wrong password! Try again.");

    setAuthCookie(ctx, user);

    return { id: user._id, success: "User is signed in!" };
  },
  outputFields: {
    me: {
      type: DoctorType,
      resolve: ({ id }, _, context) => DoctorLoader.load(context, id),
    },
  },
});

export { DoctorSignInMutation };
