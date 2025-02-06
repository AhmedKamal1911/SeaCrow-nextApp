import { z } from "zod";
import { questionsListSchema } from "./shared";

export const tripQuestionsSchema = z.object({
  clientQuestionsList: questionsListSchema,
  id: z.number(),
  locale: z.string(),
  meta: z.object({}).catchall(z.unknown()),
});

export type TripQuestionsSchema = z.infer<typeof tripQuestionsSchema>;
