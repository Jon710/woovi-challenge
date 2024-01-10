import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { PatientType } from '../PatientType';
import { PatientModel } from '../PatientModel';
import { generateToken } from '../../../auth';

const PatientSignUpMutation = mutationWithClientMutationId({
  name: 'PatientSignUpMutation',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ username, email, password }) => {
    // TODO: validate fields with Zod or Yup
    const patientExists = await PatientModel.exists({ email });

    if (patientExists) throw new Error('Patient already exists');

    const patient = await new PatientModel({
      username,
      email,
      password,
    }).save();

    const token = generateToken(patient._id);

    return {
      token,
      id: patient._id,
      success: 'Patient has been created!',
    };
  },
  outputFields: {
    me: {
      type: PatientType,
      resolve: async ({ id }) => await PatientModel.findById(id),
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
  },
});

export { PatientSignUpMutation };
