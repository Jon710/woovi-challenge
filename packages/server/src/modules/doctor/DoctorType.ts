import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
// import {
//   connectionArgs,
//   connectionDefinitions,
//   withFilter,
// } from "@entria/graphql-mongo-helpers";

import { registerTypeLoader, nodeInterface } from '../node/typeRegister';
import { DoctorLoader } from './DoctorLoader';
import { DoctorDocument } from './DoctorModel';

const DoctorType = new GraphQLObjectType<DoctorDocument>({
  name: 'Doctor',
  description: 'Doctors who use the application to attend appointments',
  fields: () => ({
    id: globalIdField('Doctor'),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: doctor => doctor.username,
    },
    email: {
      type: GraphQLString,
      resolve: doctor => doctor.email,
    },
  }),
  interfaces: () => [nodeInterface],
});

const DoctorConnection = connectionDefinitions({
  name: 'Doctor',
  nodeType: DoctorType,
});

registerTypeLoader(DoctorType, DoctorLoader.load);

export { DoctorType, DoctorConnection };
