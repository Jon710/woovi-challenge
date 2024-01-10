import { GraphQLObjectType } from 'graphql';

import { patientsConnectionField } from '../modules/patient/patientFields';
import { doctorsConnectionField } from '../modules/doctor/doctorFields';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Queries',
  fields: () => ({
    // me: {
    //   type: UserType,
    //   resolve: (_, __, ctx: GraphQLContext) => {
    //     return UserLoader.load(ctx, ctx.user?.id);
    //   },
    // },
    ...patientsConnectionField('patients'),
    ...doctorsConnectionField('doctors'),
  }),
});
