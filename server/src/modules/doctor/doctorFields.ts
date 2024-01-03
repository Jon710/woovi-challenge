import { DoctorConnection } from "./DoctorType";
import { DoctorLoader } from "./DoctorLoader";
import { connectionArgs } from "graphql-relay";

export const doctorsConnectionField = (key: string) => ({
  [key]: {
    type: DoctorConnection.connectionType,
    args: { ...connectionArgs },
    resolve: async (_, args, context) => {
      return await DoctorLoader.loadAll(context, args);
    },
  },
});
