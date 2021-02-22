import { queryField, stringArg } from "nexus";

export const albumQuery = queryField("album", {
  type: "Album",
  args: {
    id: stringArg(),
  },
  resolve(_, { id }, ctx) {
    return ctx.prisma.album.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });
  },
});
