import { GraphQLObjectType } from "graphql";

import { messageConnectionField } from "../modules/message/messageFields";
import { patientsConnectionField } from "../modules/patient/patientFields";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Queries",
  fields: () => ({
    ...messageConnectionField("messages"),
    ...patientsConnectionField("patients"),
  }),
});
