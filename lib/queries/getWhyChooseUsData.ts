import { customFetch } from "../helpers/custom-fetch";
import { whyChooseUsDataSchema } from "../validations/whyChooseUsDataValidation";

export async function getWhyChooseUsData() {
  try {
    const data = await customFetch({
      pathname: "why-us-section",
      query: {
        populate: "*",
      },
    });
    const result = whyChooseUsDataSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error.flatten(), null, 2);
      throw new Error(`whyChooseUs data validation failed: ${errorMessage}`);
    }
    console.log({ whyUs: data });
    return result.data;
  } catch (error) {
    console.error("Header data error:", error);

    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
