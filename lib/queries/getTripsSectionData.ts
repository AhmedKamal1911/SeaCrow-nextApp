import { customFetch } from "../helpers/custom-fetch";

import { tripsResponseSchema } from "../validations/shared";

export async function getTripsSectionData({
  typeName,
  pageParam = 1,
  pageLimit = 8,
}: {
  typeName: string;
  pageParam?: number;
  pageLimit?: number;
}) {
  try {
    const data = await customFetch({
      pathname: "trips",
      query: {
        populate: "*",
        sort: "offer:desc",
        "pagination[withCount]": true,
        "pagination[pageSize]": pageLimit,
        "pagination[page]": pageParam,
        ...(typeName !== "all"
          ? {
              filters: {
                type: {
                  $eq: typeName,
                },
              },
            }
          : {}),
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
      throw new Error(`trips Section data validation failed: ${errorMessage}`);
    }
    console.log({ data, resultFromSchena: result.data.meta });
    return result.data;
  } catch (error) {
    console.error("trips Section data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
