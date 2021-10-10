import { objectType } from "nexus";
import { Source } from "nexus-prisma";

export const source = objectType({
  name: "Source",
  sourceType: {
    module: "@prisma/client",
    export: "Source",
  },
  definition(t) {
    t.field({
      ...Source.id,
      type: "ID",
      resolve: (parent) => parent.id.toString(),
    });
    t.field(Source.accurateRip);
    t.field(Source.comments);
    t.field(Source.cueIssues);
    t.field(Source.discs);
    t.field(Source.download);
    t.field(Source.edition);
    t.field(Source.format);
    t.field(Source.location);
    t.field(Source.mbid);
    t.field(Source.tagIssues);
  },
});
