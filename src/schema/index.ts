import { join } from "path";

import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

import * as types from "./types";

export const schema = makeSchema({
  types,
  contextType: {
    module: join(__dirname, "..", "context.ts"),
    export: "Context",
  },
  plugins: [nexusPrisma()],
  nonNullDefaults: {
    input: true,
    output: true,
  },
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});
