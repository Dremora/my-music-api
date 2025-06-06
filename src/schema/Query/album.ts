import { queryField } from "nexus";

export const albumQuery = queryField("album", {
  type: "Album",
  args: {
    id: "UUID",
  },
  resolve(_, { id }, ctx) {
    return ctx.prisma.album.findUniqueOrThrow({
      where: {
        id,
      },
    });
  },
});
