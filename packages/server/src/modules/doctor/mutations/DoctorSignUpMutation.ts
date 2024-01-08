import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { DoctorType } from "../DoctorType";
import { DoctorModel } from "../DoctorModel";
import { generateToken } from "../../../auth";

const DoctorSignUpMutation = mutationWithClientMutationId({
  name: "DoctorSignUpMutation",
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ username, email, password }) => {
    // TODO: validate fields with Zod or Yup
    const doctorExists = await DoctorModel.exists({ email });

    if (doctorExists) throw new Error("Doctor already exists");

    const doctor = await new DoctorModel({
      username,
      email,
      password,
    }).save();

    const token = generateToken(doctor._id);

    return {
      token,
      id: doctor._id,
      success: "Doctor has been created!",
    };
  },
  outputFields: {
    me: {
      type: DoctorType,
      resolve: async ({ id }) => await DoctorModel.findById(id),
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
  },
});

export { DoctorSignUpMutation };
