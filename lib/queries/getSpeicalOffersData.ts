import { customFetch } from "../helpers/custom-fetch";

import { tripsResponseSchema } from "../validations/shared";

export async function getSpeicalOffersData() {
  try {
    const data = await customFetch("trips", {
      populate: "*",
      filters: {
        offer: {
          $ne: null,
        },
      },
    });
    console.log(data);
    const result = tripsResponseSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(
        result.error.flatten().fieldErrors,
        null,
        2
      );
      console.log(result.error);
      throw new Error(
        `SpecialOffers Section data validation failed: ${errorMessage}`
      );
    }
    console.log({ data });
    return result.data;
  } catch (error) {
    console.error("HeroSection data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
