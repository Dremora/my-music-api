import { VercelRequest, VercelResponse } from "@vercel/node";
import { ApolloServer } from "apollo-server-micro";

import { createContext } from "../src/context";
import { schema } from "../src/schema";

const server = new ApolloServer({
  schema,
  context: createContext,
  introspection: true,
});

const startServer = server.start();

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  await startServer;
  await server.createHandler({
    path: "/graphql",
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
