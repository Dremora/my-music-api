import { intArg, list, mutationField, nullable, stringArg } from "nexus";

// createAlbum(
//   firstPlayed: FirstPlayedInput
// ): Album!

import { createAlbum } from "../../domain/album";

export const createAlbumMutation = mutationField("createAlbum", {
  type: "Album",
  args: {
    artist: stringArg(),
    title: stringArg(),
    comments: nullable(stringArg()),
    year: nullable(intArg()),
    sources: list("NewSourceInput"),
  },
  authorize: (_root, _args, ctx) => ctx.loggedIn,
  async resolve(_, { artist, title, comments, year, sources }, ctx) {
    return createAlbum({ artist, title, comments, year, sources }, ctx.prisma);
  },
});
