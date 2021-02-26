import { arg, list, queryField } from "nexus";

export const albumsQuery = queryField("albums", {
  type: list("Album"),
  args: {
    filter: arg({
      type: "AlbumFilterInput",
    }),
  },
  resolve(_, { filter: { query, year } }, ctx) {
    if (year) {
      return ctx.prisma.album.findMany({
        where: {
          year,
        },
      });
    } else if (query) {
      throw new Error("Not implemented");
    } else {
      return [];
    }
  },
});
