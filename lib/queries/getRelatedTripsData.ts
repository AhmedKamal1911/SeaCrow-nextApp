import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { tripsResponseSchema } from "../validations/trips-schema";

export default async function getRelatedTripsData({
  typeName,
  slug,
  locale,
}: {
  typeName: string;
  slug: string;
  locale: Locale;
}) {
  try {
    const data = await customFetch({
      pathname: "trips",
      query: {
        locale,
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
      // const errorMessage = JSON.stringify(
      //   result.error.flatten().fieldErrors,
      //   null,
      //   2
      // );
      throw new Error(
        `relatedTrips Section data validation failed please call service`
      );
    }

    return result.data.data;
  } catch (error) {
    throw error;
  }
}
