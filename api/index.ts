import { ApolloServer } from "apollo-server-micro";

import { context } from "../src/context";
import { schema } from "../src/schema";

const server = new ApolloServer({ schema, context });

const startServer = server.start();

export default async function handler(req, res) {
  await startServer;
  await server.createHandler({
    path: "/api",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
