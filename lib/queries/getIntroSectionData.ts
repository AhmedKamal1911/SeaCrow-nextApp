import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { introSectionSchemaData } from "../validations/intro-section-schema";

export async function getIntroSectionData(locale: Locale) {
  try {
    const response = await customFetch({
      pathname: "intro-section",
      query: {
        populate: {
          featuresBox: {
            populate: {
              icon: true,
              travelImg: true,
            },
          },
        },
        locale,
      },
      tags: ["Intro"],
    });

    const result = introSectionSchemaData.safeParse(response);
    if (!result.success) {
      // const errorMessage = JSON.stringify(
      //   result.error.flatten().fieldErrors,
      //   null,
      //   2
      // );
      throw new Error(
        `IntroSection data validation failed please call service`
      );
    }

    return result.data;
  } catch (error) {
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
