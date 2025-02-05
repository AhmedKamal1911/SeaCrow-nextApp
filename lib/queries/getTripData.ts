import { customFetch } from "../helpers/custom-fetch";

import { tripsResponseSchema } from "../validations/shared";

export default async function getTripData(slug: string, populateAll = true) {
  try {
    const data = await customFetch({
      pathname: "trips",
      query: {
        ...(populateAll ? { populate: "*" } : {}),
        filters: {
          slug: {
            $eq: slug,
          },
        },
      },
    });
    const result = tripsResponseSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(
        result.error.flatten().fieldErrors,
        null,
        2
      );
      console.log(result.error);
      throw new Error(`Trip data validation failed: ${errorMessage}`);
    }

    return result.data.data[0];
  } catch (error) {
    throw error;
  }
}
