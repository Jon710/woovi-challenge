import { GraphQLObjectType } from "graphql";

import { messageConnectionField } from "../modules/message/messageFields";
import { patientsConnectionField } from "../modules/patient/patientFields";
import { doctorsConnectionField } from "../modules/doctor/doctorFields";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Queries",
  fields: () => ({
    // me: {
    //   type: UserType,
    //   resolve: (_, __, ctx: GraphQLContext) => {
    //     return UserLoader.load(ctx, ctx.user?.id);
    //   },
    // },
    ...messageConnectionField("messages"),
    ...patientsConnectionField("patients"),
    ...doctorsConnectionField("doctors"),
  }),
});
