import { ApolloServer, UserInputError } from "apollo-server";
import { ZodError } from "zod";

import { createContext } from "./context";
import { schema } from "./schema";

const expectedErrorCodes = [
  "GRAPHQL_PARSE_FAILED",
  "GRAPHQL_VALIDATION_FAILED",
  "BAD_USER_INPUT",
  "UNAUTHENTICATED",
  "FORBIDDEN",
];

const server = new ApolloServer({
  schema,
  context: createContext,
  introspection: true,
  formatError: (error) => {
    const errorCode =
      typeof error.extensions?.["code"] === "string"
        ? error.extensions?.["code"]
        : undefined;
    if (error.originalError instanceof ZodError) {
      return new UserInputError("Invalid data", {
        issues: error.originalError.issues.map(({ message, path }) => ({
          message,
          path,
        })),
      });
    } else if (!errorCode || !expectedErrorCodes.includes(errorCode)) {
      // eslint-disable-next-line no-console
      console.log(
        error.originalError?.name,
        error.originalError?.message,
        error.extensions?.["exception"]
      );
    }

    return error;
  },
});

void server.listen().then(({ url }) => {
  console.info(`🚀 Server ready at ${url}`);
});
