import { GraphQLObjectType } from "graphql";
import { messageMutations } from "../modules/message/mutations/messageMutations";
import { PatientMutations } from "../modules/patient/PatientMutations";
import { DoctorMutations } from "../modules/doctor/DoctorMutations";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...messageMutations,
    ...PatientMutations,
    ...DoctorMutations,
  }),
});
