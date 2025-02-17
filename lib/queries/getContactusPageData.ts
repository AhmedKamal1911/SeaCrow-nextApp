import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";

import { contactUsPageSchema } from "../validations/contact-us-page-schema";

export default async function getContactusPageData({
  locale,
}: {
  locale: Locale;
}) {
  try {
    const data = await customFetch({
      pathname: "contact-us-page",
      query: {
        locale,
        populate: {
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
      cache: "force-cache",
      tags: ["contact"],
    });

    const result = contactUsPageSchema.safeParse(data);
    if (!result.success) {
      // const errorMessage = JSON.stringify(result.error, null, 2);
      throw new Error(`Faq page data validation failed please call service`);
    }
    return result.data;
  } catch (error) {
    throw error;
  }
}
