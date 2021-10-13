import { ApolloServer } from "apollo-server";

import { createContext } from "./context";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: createContext,
  introspection: true,
});

void server.listen().then(({ url }) => {
  console.info(`🚀 Server ready at ${url}`);
});
