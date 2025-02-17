import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { tripsResponseSchema } from "../validations/trips-schema";

export async function getSpeicalOffersData(locale: Locale) {
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
        "pagination[pageSize]": 5,
        filters: {
          offer: {
            $ne: null,
          },
        },
        sort: "offer:desc",
        locale,
      },
    });

    const result = tripsResponseSchema.safeParse(data);
    if (!result.success) {
      // const errorMessage = JSON.stringify(
      //   result.error.flatten().fieldErrors,
      //   null,
      //   2
      // );
      throw new Error(
        `SpecialOffers Section data validation failed please Call service`
      );
    }

    return result.data;
  } catch (error) {
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
