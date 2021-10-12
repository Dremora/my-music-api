import { VercelRequest, VercelResponse } from "@vercel/node";
import { ApolloServer } from "apollo-server-micro";

import { context } from "../src/context";
import { schema } from "../src/schema";

const server = new ApolloServer({ schema, context, introspection: true });

const startServer = server.start();

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  await startServer;
  await server.createHandler({
    path: "/api",
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
