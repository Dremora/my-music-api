import { fromUnixTime } from "date-fns";
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

const firstPlayedTimestampSchema = z
  .object({
    timestamp: z.number().int().min(1),
    day: z.null().optional(),
    month: z.null().optional(),
    year: z.null().optional(),
  })
  .transform(({ timestamp }) => ({
    firstPlayedTimestamp: fromUnixTime(timestamp),
    firstPlayedDate: [],
  }));

const firstPlayedDateSchema = z
  .object({
    timestamp: z.null().optional(),
    day: z.number().int().min(1).max(31),
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(1).max(2100),
  })
  .transform(({ day, month, year }) => ({
    firstPlayedTimestamp: null,
    firstPlayedDate: [year, month, day],
  }));

const firstPlayedMissing = z
  .null()
  .optional()
  .transform(() => ({
    firstPlayedTimestamp: null,
    firstPlayedDate: [],
  }));

const firstPlayedSchema = z.union([
  firstPlayedTimestampSchema,
  firstPlayedDateSchema,
  firstPlayedMissing,
]);

const newAlbumSchema = z.object({
  artist: z.string().min(1).max(255).transform(trim),
  title: z.string().min(1).max(255).transform(trim),
  comments: z.nullable(z.optional(z.string().max(255).transform(trim))),
  year: z.nullable(z.optional(z.number().int().min(1900).max(2100))),
  sources: z.array(newSourceSchema),
  firstPlayed: firstPlayedSchema,
});

export const createAlbum = async (
  album: NexusGenArgTypes["Mutation"]["createAlbum"],
  prisma: PrismaClient
) => {
  const { sources, firstPlayed, ...parsedAlbum } = newAlbumSchema.parse(album);

  return prisma.album.create({
    data: { ...parsedAlbum, ...firstPlayed, sources: { create: sources } },
  });
};
