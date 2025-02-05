import { z } from "zod";
import { imageTypeSchema } from "./shared";

// Schema for services
const serviceSchema = z.object({
  id: z.number(),
  desc: z.string(),
  icon: z.string(), // Assuming icon is a string (e.g., "FaBookOpen")
  name: z.string(),
});

// Schema for localizations
const localizationSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string().nullable(),
});

// Main schema for the entire object
export const whyChooseUsDataSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string(),
  services: z.array(serviceSchema),
  images: z.object({
    data: z.array(imageTypeSchema),
  }),
  localizations: z.object({
    data: z.array(localizationSchema),
  }),
  meta: z.object({}).catchall(z.unknown()),
});

// Optional inferred type
export type whyChooseUsDataSchemaType = z.infer<typeof whyChooseUsDataSchema>;
