import { VercelRequest, VercelResponse } from "@vercel/node";
import { ApolloServer } from "apollo-server-micro";

import { apolloConfig } from "../src/apolloConfig";

const server = new ApolloServer(apolloConfig);

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
