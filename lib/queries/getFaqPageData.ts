import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { faqsPageSchema } from "../validations/faq-page-schema";

export default async function getFaqPageData({ locale }: { locale: Locale }) {
  try {
    const data = await customFetch({
      pathname: "faq-page",
      query: {
        locale,
        populate: {
          faqsList: "*",
          SEO: {
            populate: {
              openGraph: {
                populate: ["images"], // Ensure images inside openGraph are populated
              },
            },
          },
        },
        fields: ["id", "locale"],
      },
      tags: ["FAQ"],
    });
    const result = faqsPageSchema.safeParse(data);
    if (!result.success) {
      // const errorMessage = JSON.stringify(result.error, null, 2);
      throw new Error(`Faq page data validation failed please call service`);
    }
    return result.data;
  } catch (error) {
    throw error;
  }
}
