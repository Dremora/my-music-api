import type { Album } from "@prisma/client";
import { getAlbumsByQuery } from "@prisma/client/sql";
import { arg, list, queryField } from "nexus";

export const albumsQuery = queryField("albums", {
  type: list("Album"),
  args: {
    filter: arg({
      type: "AlbumFilterInput",
    }),
  },
  async resolve(_, { filter: { query, year } }, ctx) {
    if (year) {
      return ctx.prisma.album.findMany({
        where: {
          year,
        },
      });
    } else if (query) {
      const albums = await ctx.prisma.$queryRawTyped(getAlbumsByQuery(query));

      return albums.map(
        ({
          first_played_timestamp,
          first_played_date,
          inserted_at,
          updated_at,
          ...album
        }): Album => ({
          firstPlayedDate: first_played_date ?? [],
          firstPlayedTimestamp: first_played_timestamp,
          createdAt: inserted_at,
          updatedAt: updated_at,
          artist: album.artist,
          comments: album.comments,
          title: album.title,
          year: album.year,
          id: album.id,
        })
      );
    } else {
      return [];
    }
  },
});
