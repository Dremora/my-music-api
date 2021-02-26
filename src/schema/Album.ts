import { list, objectType } from "nexus";

export const album = objectType({
  name: "Album",
  definition(t) {
    t.id("id");
    t.model.title();
    t.model.artist();
    t.model.comments();
    t.model.year();

    t.field("sources", {
      type: list("Source"),
      resolve(parent, _, ctx) {
        return ctx.prisma.source.findMany({
          where: {
            albumId: parent.id,
          },
          orderBy: {
            id: "asc",
          },
        });
      },
    });
  },
});
