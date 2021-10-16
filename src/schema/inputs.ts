import { inputObjectType } from "nexus";

export const AlbumFilterInput = inputObjectType({
  name: "AlbumFilterInput",
  definition(t) {
    t.nullable.string("query");
    t.nullable.int("year");
  },
});

export const NewSourceInput = inputObjectType({
  name: "NewSourceInput",
  definition(t) {
    t.nullable.string("accurateRip");
    t.nullable.string("comments");
    t.nullable.string("cueIssues");
    t.nullable.int("discs");
    t.nullable.string("download");
    t.nullable.string("edition");
    t.nullable.field("format", { type: "Format" });
    t.field("location", { type: "Location" });
    t.nullable.uuid("mbid");
    t.nullable.string("tagIssues");
  },
});
