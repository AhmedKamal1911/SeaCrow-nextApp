import { z } from "zod";
import { metaObject, questionsListSchema, SEOSchema } from "./shared";

// Main Schema
export const faqsPageSchema = z.object({
  id: z.number(),
  locale: z.string(),
  faqsList: questionsListSchema,
  SEO: SEOSchema,
  meta: metaObject,
});
