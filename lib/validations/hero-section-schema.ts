import { z } from "zod";
import { imageTypeSchema } from "./shared";
import { pathnames } from "../data";

const heroButtonSchema = z.object({
  id: z.number(),
  text: z.string(),
  url: z.enum(pathnames),
  isExternal: z.boolean(),
});

export const heroSectionDataSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  heading: z.string(),
  locale: z.string(),
  heroButton: heroButtonSchema,
  heroImages: z.object({
    data: z.array(imageTypeSchema),
  }),
});

export type HeroSectionDataSchemaType = z.infer<typeof heroSectionDataSchema>;
