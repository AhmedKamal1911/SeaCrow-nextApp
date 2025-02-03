import { customFetch } from "../helpers/custom-fetch";

import { tripsResponseSchema } from "../validations/shared";

export async function getTripsSectionData(typeName: string) {
  try {
    const data = await customFetch("trips", {
      populate: "*",
      ...(typeName !== "all"
        ? {
            filters: {
              type: {
                $eq: typeName,
              },
            },
          }
        : {}),
    });
    console.log("trips section", data);
    const result = tripsResponseSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(
        result.error.flatten().fieldErrors,
        null,
        2
      );
      console.log(result.error);
      throw new Error(`trips Section data validation failed: ${errorMessage}`);
    }

    return result.data;
  } catch (error) {
    console.error("trips Section data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
