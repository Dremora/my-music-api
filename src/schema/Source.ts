import { objectType } from "nexus";
import { Source as PrismaSource } from "nexus-prisma";

export const Source = objectType({
  name: "Source",
  sourceType: {
    module: "@prisma/client",
    export: "Source",
  },
  definition(t) {
    t.field({
      ...PrismaSource.id,
      type: "ID",
      resolve: (parent) => parent.id.toString(),
    });
    t.field(PrismaSource.accurateRip);
    t.field(PrismaSource.comments);
    t.field(PrismaSource.cueIssues);
    t.field(PrismaSource.discs);
    t.field(PrismaSource.download);
    t.field(PrismaSource.edition);
    t.field(PrismaSource.format);
    t.field(PrismaSource.location);
    t.field(PrismaSource.mbid);
    t.field(PrismaSource.tagIssues);
  },
});
