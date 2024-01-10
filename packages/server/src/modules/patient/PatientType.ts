import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  fromGlobalId,
} from 'graphql-relay';
// import {
//   connectionArgs,
//   connectionDefinitions,
//   withFilter,
// } from "@entria/graphql-mongo-helpers";

import { registerTypeLoader, nodeInterface } from '../node/typeRegister';
import { PatientLoader } from './PatientLoader';
import { PatientDocument, PatientModel } from './PatientModel';
import { AppointmentModel } from '../appointment/AppointmentModel';
import { AppointmentType } from '../appointment/AppointmentType';

const PatientType = new GraphQLObjectType<PatientDocument>({
  name: 'Patient',
  description: 'Patients who use the application',
  fields: () => ({
    id: globalIdField('Patient'),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: patient => patient.username,
    },
    email: {
      type: GraphQLString,
      resolve: patient => patient.email,
    },
    patient: {
      type: PatientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args) => {
        const { id } = fromGlobalId(args.id);
        const patient = await PatientModel.findById(id);
        return patient;
      },
    },
    appointments: {
      type: new GraphQLList(AppointmentType),
      resolve: async patient => {
        const appointments = await AppointmentModel.find({
          _id: { $in: patient.appointments },
        });

        console.log(appointments);
        return appointments;
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

const PatientConnection = connectionDefinitions({
  name: 'Patient',
  nodeType: PatientType,
});

registerTypeLoader(PatientType, PatientLoader.load);

export { PatientType, PatientConnection };
