import { z } from "zod";
import { metaObject, questionsListSchema } from "./shared";

export const tripQuestionsSchema = z.object({
  clientQuestionsList: questionsListSchema,
  id: z.number(),
  locale: z.string(),
  meta: metaObject,
});

export type TripQuestionsSchema = z.infer<typeof tripQuestionsSchema>;
