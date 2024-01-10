import { PatientConnection } from './PatientType';
import { PatientLoader } from './PatientLoader';
import { connectionArgs } from 'graphql-relay';

export const patientsConnectionField = (key: string) => ({
  [key]: {
    type: PatientConnection.connectionType,
    args: { ...connectionArgs },
    resolve: async (_, args, context) => {
      return await PatientLoader.loadAll(context, args);
    },
  },
});
