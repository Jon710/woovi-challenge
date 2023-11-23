import { globalIdField } from "graphql-relay";
import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from "@entria/graphql-mongo-helpers";
import * as GuildLoader from "../guild/GuildLoader";
import { GuildConnection } from "../guild/GuildType";
import { GraphQLContext } from "../../graphql/context";
import { registerTypeLoader } from "../node/typeRegister";
import { FriendshipModel } from "../friendship/FriendshipModel";
import { load } from "./PatientLoader";
import { PatientDocument } from "./PatientModel";

const PatientType = new GraphQLObjectType<PatientDocument, GraphQLContext>({
  name: "Patient",
  description: "Patient who uses the app",
  fields: () => ({
    id: globalIdField("User"),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.username,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    guilds: {
      type: new GraphQLNonNull(GuildConnection.connectionType),
      description: "The guilds the user belongs to",
      args: { ...connectionArgs },
      resolve: async (user, args, context) => {
        return GuildLoader.loadAll(
          context,
          withFilter(args, { members: user._id })
        );
      },
    },
    isFriend: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: async (user, __, ctx) => {
        if (!ctx.user) {
          return false;
        }
        if (user._id.toString() === ctx.user?.id) {
          return true;
        }
        const friendship = await FriendshipModel.findOne({
          sender: ctx.user.id,
          receiver: user.id,
          status: 1,
        });
        return !!friendship;
      },
    },
    ...objectIdResolver,
    ...timestampResolver,
  }),
});

const PatientConnection = connectionDefinitions({
  name: "Patient",
  nodeType: PatientType,
});

registerTypeLoader(PatientType, load);

export { PatientType, PatientConnection };
