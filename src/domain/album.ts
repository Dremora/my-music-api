import { Format, Location } from "nexus-prisma";
import { z } from "zod";

import { NexusGenArgTypes } from "src/nexus-typegen";

import { PrismaClient } from ".prisma/client";

const trim = (str: string) => str.trim();

const newSourceSchema = z.object({
  accurateRip: z.nullable(z.optional(z.string().max(255).transform(trim))),
  comments: z.nullable(z.optional(z.string().max(255).transform(trim))),
  cueIssues: z.nullable(z.optional(z.string().max(255).transform(trim))),
  discs: z.nullable(z.optional(z.number().int().min(1).max(100))),
  download: z.nullable(z.optional(z.string().max(255).transform(trim))),
  edition: z.nullable(z.optional(z.string().max(255).transform(trim))),
  format: z.nullable(z.optional(z.enum(Format.members))),
  location: z.enum(Location.members),
  mbid: z.nullable(z.optional(z.string().length(36))), // TODO regex)?
  tagIssues: z.nullable(z.optional(z.string().max(255).transform(trim))),
});

const newAlbumSchema = z.object({
  artist: z.string().min(1).max(255).transform(trim),
  title: z.string().min(1).max(255).transform(trim),
  comments: z.nullable(z.optional(z.string().max(255).transform(trim))),
  year: z.nullable(z.optional(z.number().int().min(1900).max(2100))),
  sources: z.array(newSourceSchema),
});

export const createAlbum = async (
  album: NexusGenArgTypes["Mutation"]["createAlbum"],
  prisma: PrismaClient
) => {
  const { sources, ...parsedAlbum } = newAlbumSchema.parse(album);

  return prisma.album.create({
    data: { ...parsedAlbum, sources: { create: sources } },
  });
};
