import { ApolloServer } from "apollo-server";

import { context } from "./context";
import { schema } from "./schema";

const server = new ApolloServer({ schema, context, introspection: true });

void server.listen().then(({ url }) => {
  console.info(`🚀 Server ready at ${url}`);
});
