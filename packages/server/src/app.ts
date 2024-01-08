import cors from "kcors";
import Router from "koa-router";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import { graphqlHTTP, OptionsData } from "koa-graphql";
import koaPlayground from "graphql-playground-middleware-koa";
import Koa, { Request } from "koa";

import { getUser } from "./auth";
import { schema } from "./schema/schema";
import { getContext } from "./getContext";
import { config } from "./config";

const router = new Router();
const app = new Koa();

app.use(bodyParser());
app.use(logger());
app.use(cors({ credentials: true }));

const graphQLSettingsPerReq = async (req: Request): Promise<OptionsData> => {
  const user = await getUser(req.header.authorization);

  return {
    graphiql:
      config.NODE_ENV !== "production"
        ? { headerEditorEnabled: true, shouldPersistHeaders: true }
        : false,
    schema,
    pretty: true,
    context: getContext({ user }),
    customFormatErrorFn: ({ message, locations, stack }) => {
      console.log(message);
      console.log(locations);
      console.log(stack);

      return { message, locations, stack };
    },
  };
};

const graphqlServer = graphqlHTTP(graphQLSettingsPerReq);

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
