import { GraphQLNonNull, GraphQLString } from "graphql";
import { successField } from "@entria/graphql-mongo-helpers";
import { mutationWithClientMutationId } from "graphql-relay";
import { PatientType } from "../PatientType";
import { PatientModel } from "../PatientModel";
import * as PatientLoader from "../PatientLoader";
import { fieldError } from "../../../utils/fieldError";
import { GraphQLContext } from "../../../graphql/context";
import { generateToken, setAuthCookie } from "../../../auth";
import { FieldErrorField } from "../../field-error/FieldErrorField";
import {
  NewUserArgs,
  validateAndSanitizeNewUser,
} from "../../../utils/validateUser";

type PatientSignUpMutationArgs = NewUserArgs;

const PatientSignUpMutation = mutationWithClientMutationId({
  name: "PatientSignUpMutation",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (
    args: PatientSignUpMutationArgs,
    { ctx }: GraphQLContext
  ) => {
    const { username, email, password, error } =
      validateAndSanitizeNewUser(args);

    if (error) return error;

    const emailExists = await PatientModel.exists({ email });

    if (emailExists) return fieldError("email", "Email Already Exists");

    const user = await new PatientModel({
      username,
      email,
      password,
    }).save();

    const token = generateToken(user);

    setAuthCookie(ctx, user);

    return {
      token,
      id: user._id,
      success: "User created",
    };
  },
  outputFields: {
    me: {
      type: PatientType,
      resolve: async ({ id }, _, context) => PatientLoader.load(context, id),
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    ...FieldErrorField,
    ...successField,
  },
});

export { PatientSignUpMutation };
