import { list, objectType } from "nexus";
import { Album } from "nexus-prisma";

export const album = objectType({
  name: "Album",
  definition(t) {
    t.field(Album.id);
    t.field(Album.title);
    t.field(Album.artist);
    t.field(Album.comments);
    t.field(Album.year);

    t.field("sources", {
      type: list("Source"),
      resolve(parent, _, ctx) {
        return ctx.prisma.source.findMany({
          where: {
            albums: {
              id: parent.id,
            },
          },
          orderBy: {
            id: "asc",
          },
        });
      },
    });
  },
});
