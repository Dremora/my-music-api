import { ApolloServer, UserInputError } from "apollo-server";
import { ZodError } from "zod";

import { createContext } from "./context";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: createContext,
  introspection: true,
  formatError: (error) => {
    if (error.originalError instanceof ZodError) {
      return new UserInputError("Invalid data", {
        issues: error.originalError.issues.map(({ message, path }) => ({
          message,
          path,
        })),
      });
    } else {
      // eslint-disable-next-line no-console
      console.log(error.originalError);
    }
    return error;
  },
});

void server.listen().then(({ url }) => {
  console.info(`🚀 Server ready at ${url}`);
});
