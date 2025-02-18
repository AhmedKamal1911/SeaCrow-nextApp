import { z } from "zod";
import { imageTypeSchema, metaObject } from "./shared";
import { pathnames } from "../data";

const featuresBoxSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.enum(pathnames),
  icon: imageTypeSchema, // Replace with specific icon schema if available
  travelImg: imageTypeSchema,
});

export const introSectionSchemaData = z.object({
  heading: z.string(),
  desc: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string(),
  featuresBox: z.array(featuresBoxSchema),
  meta: metaObject,
});

export type FeaturesBoxType = z.infer<typeof featuresBoxSchema>;
export type IntroSectionDataSchemaType = z.infer<typeof introSectionSchemaData>;
