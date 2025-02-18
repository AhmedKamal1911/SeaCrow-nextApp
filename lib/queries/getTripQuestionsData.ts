import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";

import { tripQuestionsSchema } from "../validations/trip-questions-schema";

export default async function getTripQuestionsData({
  locale,
}: {
  locale: Locale;
}) {
  try {
    const data = await customFetch({
      pathname: "trip-question",
      query: {
        locale,
        fields: ["id", "locale"],
        populate: {
          clientQuestionsList: {
            fields: ["id", "question", "answer"],
          },
        },
      },
      tags: ["Questions"],
      cache: "force-cache",
    });

    const result = tripQuestionsSchema.safeParse(data);
    if (!result.success) {
      // const errorMessage = JSON.stringify(result.error, null, 2);
      throw new Error(
        `trip questions data validation failed please call service`
      );
    }
    return result.data;
  } catch (error) {
    throw error;
  }
}
