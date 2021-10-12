import { getUnixTime } from "date-fns";
import { list, objectType } from "nexus";
import { Album as PrismaAlbum } from "nexus-prisma";

export const Album = objectType({
  name: "Album",
  sourceType: {
    module: "@prisma/client",
    export: "Album",
  },
  definition(t) {
    t.field(PrismaAlbum.id);
    t.field(PrismaAlbum.title);
    t.field(PrismaAlbum.artist);
    t.field(PrismaAlbum.comments);
    t.field(PrismaAlbum.year);
    t.nullable.field({
      name: "firstPlayed",
      type: "FirstPlayed",
      resolve(parent) {
        if (parent.firstPlayedTimestamp) {
          return {
            timestamp: getUnixTime(parent.firstPlayedTimestamp),
          };
        } else if (parent.firstPlayedDate && parent.firstPlayedDate[0]) {
          return {
            year: parent.firstPlayedDate[0],
            month: parent.firstPlayedDate[1] ?? null,
            day: parent.firstPlayedDate[2] ?? null,
          };
        } else {
          return null;
        }
      },
    });

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
