import { z } from "zod";
import { questionsListSchema } from "./shared";

// Main Schema
export const FaqsPageSchema = z.object({
  id: z.number(),
  locale: z.string(),
  faqsList: questionsListSchema,
  meta: z.object({}).catchall(z.unknown()),
});
