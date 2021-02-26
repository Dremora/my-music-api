import { objectType } from "nexus";

export const source = objectType({
  name: "Source",
  definition(t) {
    t.id("id", {
      resolve: (parent) => parent.id.toString(),
    });
    t.model.accurateRip();
    t.model.comments();
    t.model.cueIssues();
    t.model.discs();
    t.model.download();
    t.model.edition();
    t.model.format();
    t.model.location();
    t.model.mbid();
    t.model.tagIssues();
  },
});
