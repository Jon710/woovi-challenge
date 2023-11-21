import { GraphQLObjectType, GraphQLString } from "graphql";
import { messageConnectionField } from "../modules/message/messageFields";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Queries",
  fields: () => ({
    ...messageConnectionField("messages"),
    hello: {
      type: GraphQLString,
      resolve: () => "hello, joão!",
    },
  }),
});
