import { ApolloServer } from "apollo-server-micro";

import { context } from "./context";
import { schema } from "./schema";

const server = new ApolloServer({ schema, context });

export default server.createHandler({ path: "/" });
