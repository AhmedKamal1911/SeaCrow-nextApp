import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { whyChooseUsDataSchema } from "../validations/why-us-schema";

export async function getWhyChooseUsData(locale: Locale) {
  try {
    const data = await customFetch({
      pathname: "why-us-section",
      query: {
        populate: {
          images: "*", // Populate all fields inside imgs
          services: "*",
        },
        fields: ["id", "locale"],
        locale,
      },
      tags: ["WhyUs"],
    });

    const result = whyChooseUsDataSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error.flatten(), null, 2);
      throw new Error(`whyChooseUs data validation failed: ${errorMessage}`);
    }

    return result.data;
  } catch (error) {
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
