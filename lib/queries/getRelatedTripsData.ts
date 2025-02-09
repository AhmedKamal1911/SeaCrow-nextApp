import { customFetch } from "../helpers/custom-fetch";
import { tripsResponseSchema } from "../validations/trips-schema";

export default async function getRelatedTripsData(
  typeName: string,
  slug: string
) {
  try {
    const data = await customFetch({
      pathname: "trips",
      query: {
        populate: {
          imgs: "*", // Populate all fields inside imgs
        },
        fields: [
          "id",
          "offer",
          "adultPrice",
          "locale",
          "name",
          "time",
          "slug",
          "type",
        ],
        "pagination[pageSize]": 3,
        filters: {
          type: {
            $eq: typeName,
          },
          slug: {
            $ne: slug,
          },
        },
      },
      tags: ["Trip"],
    });

    const result = tripsResponseSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(
        result.error.flatten().fieldErrors,
        null,
        2
      );
      console.log(result.error);
      throw new Error(
        `relatedTrips Section data validation failed: ${errorMessage}`
      );
    }

    return result.data.data;
  } catch (error) {
    throw error;
  }
}
