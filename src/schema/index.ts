import { join } from "path";

import { fieldAuthorizePlugin, makeSchema } from "nexus";

import * as types from "./types";

export const schema = makeSchema({
  types,
  contextType: {
    module: join(__dirname, "..", "context.ts"),
    export: "Context",
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
  plugins: [fieldAuthorizePlugin()],
});
