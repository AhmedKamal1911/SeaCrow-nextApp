import { z } from "zod";
import { metaObject, questionsListSchema } from "./shared";

// Main Schema
export const FaqsPageSchema = z.object({
  id: z.number(),
  locale: z.string(),
  faqsList: questionsListSchema,
  meta: metaObject,
});
