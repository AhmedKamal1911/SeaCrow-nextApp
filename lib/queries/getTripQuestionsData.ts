import { customFetch } from "../helpers/custom-fetch";

import { tripQuestionsSchema } from "../validations/trip-questions-schema";

export default async function getTripQuestionsData() {
  try {
    const data = await customFetch({
      pathname: "trip-question",
      query: {
        fields: ["id", "locale"],
        populate: {
          clientQuestionsList: {
            fields: ["id", "question", "answer"],
          },
        },
      },
      tags: ["Questions"],
    });

    const result = tripQuestionsSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error, null, 2);
      throw new Error(`trip questions data validation failed: ${errorMessage}`);
    }
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
