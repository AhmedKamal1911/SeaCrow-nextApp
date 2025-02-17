import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { navbarDataSchema } from "../validations/header-schema";

export async function getHeaderData({ locale }: { locale: Locale }) {
  try {
    const data = await customFetch({
      pathname: "global",
      query: {
        locale,
        populate: "logoText,navLinks",
      },
    });

    const result = navbarDataSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error.flatten(), null, 2);
      throw new Error(`Header data validation failed: ${errorMessage}`);
    }

    return result.data;
  } catch (error) {
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
