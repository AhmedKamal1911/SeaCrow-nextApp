import { z } from "zod";
import { metaObject, SEOSchema } from "./shared";

// Main Schema
export const homePageSchema = z.object({
  id: z.number(),
  locale: z.string(),
  SEO: SEOSchema,
  meta: metaObject,
});
