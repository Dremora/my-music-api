import { inputObjectType } from "nexus";

export const AlbumFilterInput = inputObjectType({
  name: "AlbumFilterInput",
  definition(t) {
    t.nullable.string("query");
    t.nullable.int("year");
  },
});
