import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField, connectionDefinitions } from "graphql-relay";
// import {
//   connectionArgs,
//   connectionDefinitions,
//   withFilter,
// } from "@entria/graphql-mongo-helpers";

// import * as GuildLoader from "../guild/GuildLoader";
// import { GuildConnection } from "../guild/GuildType";
// import { GraphQLContext } from "../../graphql/context";
import { registerTypeLoader, nodeInterface } from "../node/typeRegister";
import { PatientLoader } from "./PatientLoader";
import { PatientDocument } from "./PatientModel";

const PatientType = new GraphQLObjectType<PatientDocument>({
  name: "Patient",
  description: "Patients who use the application",
  fields: () => ({
    id: globalIdField("Patient"),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (patient) => patient.username,
    },
    email: {
      type: GraphQLString,
      resolve: (patient) => patient.email,
    },
    // guilds: {
    //   type: new GraphQLNonNull(GuildConnection.connectionType),
    //   description: "The guilds the user belongs to",
    //   args: { ...connectionArgs },
    //   resolve: async (user, args, context) => {
    //     return GuildLoader.loadAll(
    //       context,
    //       withFilter(args, { members: user._id })
    //     );
    //   },
    // },
  }),
  interfaces: () => [nodeInterface],
});

const PatientConnection = connectionDefinitions({
  name: "Patient",
  nodeType: PatientType,
});

registerTypeLoader(PatientType, PatientLoader.load);

export { PatientType, PatientConnection };
