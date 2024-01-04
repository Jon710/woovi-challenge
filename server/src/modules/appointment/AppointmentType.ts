import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField, connectionDefinitions } from "graphql-relay";

import { registerTypeLoader, nodeInterface } from "../node/typeRegister";
import { AppointmentLoader } from "./AppointmentLoader";
import { Appointment } from "./AppointmentModel";

const AppointmentType = new GraphQLObjectType<Appointment>({
  name: "Appointment",
  description: "Appointments scheduled by patient with chosen doctor",
  fields: () => ({
    id: globalIdField("Appointment"),
    doctorId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (appointment) => appointment.doctorId,
    },
    patientId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (appointment) => appointment.patientId,
    },
  }),
  interfaces: () => [nodeInterface],
});

const AppointmentConnection = connectionDefinitions({
  name: "Appointment",
  nodeType: AppointmentType,
});

registerTypeLoader(AppointmentType, AppointmentLoader.load);

export { AppointmentType, AppointmentConnection };
