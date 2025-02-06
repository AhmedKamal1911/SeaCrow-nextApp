import { z } from "zod";
import { imageTypeSchema, metaObject } from "./shared";

// Schema for services
const serviceSchema = z.object({
  id: z.number(),
  desc: z.string(),
  icon: z.string(), // Assuming icon is a string (e.g., "FaBookOpen")
  name: z.string(),
});

// Main schema for the entire object
export const whyChooseUsDataSchema = z.object({
  id: z.number(),
  locale: z.string(),
  services: z.array(serviceSchema),
  images: z.object({
    data: z.array(imageTypeSchema),
  }),
  meta: metaObject,
});

// Optional inferred type
export type WhyChooseUsDataSchemaType = z.infer<typeof whyChooseUsDataSchema>;
