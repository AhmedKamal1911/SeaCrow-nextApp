import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { homePageSchema } from "../validations/home-page-schema";

export default async function getHomePageData({ locale }: { locale: Locale }) {
  try {
    const data = await customFetch({
      pathname: "home-page",
      query: {
        locale,
        populate: {
          SEO: "*",
        },
        fields: ["id", "locale"],
      },
    });

    const result = homePageSchema.safeParse(data);
    if (!result.success) {
      // const errorMessage = JSON.stringify(result.error, null, 2);
      throw new Error(`home page data validation failed please call service`);
    }
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
