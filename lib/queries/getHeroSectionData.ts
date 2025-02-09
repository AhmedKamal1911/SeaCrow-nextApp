import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { heroSectionDataSchema } from "../validations/hero-section-schema";

export async function getHeroSectionData(locale: Locale) {
  try {
    const data = await customFetch({
      pathname: "hero-section",
      query: {
        populate: "*",
        locale,
      },
      tags: ["Hero"],
    });
    const result = heroSectionDataSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error.flatten(), null, 2);
      throw new Error(`Hero data validation failed: ${errorMessage}`);
    }

    return result.data;
  } catch (error) {
    console.error("HeroSection data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
