import cors from "kcors";
import Router from "koa-router";
import logger from "koa-logger";
import { GraphQLError } from "graphql";
import bodyParser from "koa-bodyparser";
import { graphqlHTTP, OptionsData } from "koa-graphql";
import koaPlayground from "graphql-playground-middleware-koa";
import Koa, { ParameterizedContext } from "koa";

import { getUser } from "./auth";
import { schema } from "./schema/schema";
import { getContext } from "./getContext";
import { config } from "./config";

const router = new Router();
const app = new Koa();

app.use(bodyParser());

app.on("error", (err) => console.log("app error: ", err));

app.use(logger());
app.use(cors({ credentials: true }));

const graphqlSettingsPerReq = async (_, __, ctx: ParameterizedContext) => {
  const { user } = await getUser(ctx);
  return {
    graphiql: config.NODE_ENV !== "production",
    schema,
    context: await getContext({ ctx, user }),
    customFormatErrorFn: (error: GraphQLError) => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  } as OptionsData;
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

router.all("/graphql", graphqlServer);
router.all(
  "/graphiql",
  koaPlayground({
    endpoint: "/graphql",
    subscriptionEndpoint: "/subscriptions",
  })
);

app.use(router.routes()).use(router.allowedMethods());

export { app };
