import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { FaqsPageSchema } from "../validations/faq-page-schema";

export default async function getFaqPageData({ locale }: { locale: Locale }) {
  try {
    const data = await customFetch({
      pathname: "faq-page",
      query: {
        locale,
        fields: ["id", "locale"],
        populate: {
          faqsList: {
            fields: ["id", "question", "answer"],
          },
        },
      },
      tags: ["FAQ"],
    });

    const result = FaqsPageSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error, null, 2);
      throw new Error(`Faq page data validation failed: ${errorMessage}`);
    }
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
