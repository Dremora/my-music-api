import { ApolloServer } from "apollo-server-micro";

import { context } from "../src/context";
import { schema } from "../src/schema";

const server = new ApolloServer({ schema, context });

export default server.createHandler({ path: "/" });
