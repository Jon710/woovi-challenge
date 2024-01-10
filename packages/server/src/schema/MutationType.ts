import { GraphQLObjectType } from 'graphql';
import { PatientMutations } from '../modules/patient/PatientMutations';
import { DoctorMutations } from '../modules/doctor/DoctorMutations';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...PatientMutations,
    ...DoctorMutations,
  }),
});
