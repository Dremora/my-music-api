import { getUnixTime } from "date-fns";
import { list, objectType } from "nexus";
import { Album } from "nexus-prisma";

export const album = objectType({
  name: "Album",
  sourceType: {
    module: "@prisma/client",
    export: "Album",
  },
  definition(t) {
    t.field(Album.id);
    t.field(Album.title);
    t.field(Album.artist);
    t.field(Album.comments);
    t.field(Album.year);
    t.nullable.field({
      name: "firstPlayed",
      type: "FirstPlayed",
      resolve(parent) {
        if (parent.firstPlayedTimestamp) {
          return {
            timestamp: getUnixTime(parent.firstPlayedTimestamp),
          };
        } else if (
          parent.firstPlayedDate &&
          parent.firstPlayedDate.length > 0
        ) {
          return {
            year: parent.firstPlayedDate[0],
            month: parent.firstPlayedDate[1],
            day: parent.firstPlayedDate[2],
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
