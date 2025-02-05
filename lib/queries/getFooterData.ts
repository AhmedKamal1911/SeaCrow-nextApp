import { customFetch } from "../helpers/custom-fetch";
import { footerDataSchema } from "../validations/footerDataValidation";

export async function getFooterData() {
  try {
    // Fetch data from API
    const data = await customFetch({
      pathname: "global",
      query: {
        populate: "navLinks,contactLinks",
      },
    });

    const validationResult = footerDataSchema.safeParse(data);

    if (!validationResult.success) {
      const errorMessage = JSON.stringify(
        validationResult.error.flatten(),
        null,
        2
      );
      throw new Error(`Footer data validation failed: ${errorMessage}`);
    }

    return validationResult.data;
  } catch (error) {
    console.error("Footer data error:", error);

    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
