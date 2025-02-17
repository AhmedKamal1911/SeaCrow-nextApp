import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";

import { AboutusPageSchema } from "../validations/about-us-page-schema";

export default async function getAboutusPageData({
  locale,
}: {
  locale: Locale;
}) {
  try {
    const data = await customFetch({
      pathname: "about-us-page",
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
      tags: ["about"],
    });
    const result = AboutusPageSchema.safeParse(data);
    if (!result.success) {
      // const errorMessage = JSON.stringify(result.error, null, 2);
      console.log({ d: result.data, e: result.error });
      throw new Error(
        `about us page data validation failed please call service`
      );
    }
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
