import { customFetch } from "../helpers/custom-fetch";
import { navbarDataSchema } from "../validations/header-schema";

export async function getHeaderData() {
  try {
    const data = await customFetch({
      pathname: "global",
      query: {
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
    console.error("Header data error:", error);

    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
