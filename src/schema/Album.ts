import { objectType } from "nexus";

export const album = objectType({
  name: "Album",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.artist();
  },
});
