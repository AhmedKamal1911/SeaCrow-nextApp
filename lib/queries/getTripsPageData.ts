import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { TripsPageSchema } from "../validations/trips-page.schema";

export default async function getTripsPageData({ locale }: { locale: Locale }) {
  try {
    const data = await customFetch({
      pathname: "trips-page",
      query: {
        locale,
        populate: {
          SEO: "*",
        },
        fields: ["id", "locale"],
      },
    });

    const result = TripsPageSchema.safeParse(data);
    if (!result.success) {
      // const errorMessage = JSON.stringify(result.error, null, 2);
      throw new Error(`trips page data validation failed please call service`);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
